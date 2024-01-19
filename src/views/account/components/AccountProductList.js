import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import DateTime from "../../../lib/DateTime";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import SaveButton from "../../../components/SaveButton";
import Currency from "../../../lib/Currency";
import ProductCard from "../../product/components/productCard";
import Url from "../../../lib/Url";
import PercentageComponent from "../../../components/Percentage";
import Drawer from "../../../components/Drawer";
import CurrencyComponent from "../../../components/Currency";
import { useDispatch } from "react-redux";
import AccountProductService from "../../../services/AccountProductService";
import Percentage from "../../../lib/Percentage";

const AccountProductList = (props) => {
  const { history, accountId } = props;
  const [rowValue, setRowValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);

  const dispatch = useDispatch();

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name"
    },
    {
      value: "id:DESC",
      label: "Most Recent"
    }
  ];

  const closeToggle = () => {
    setRowValue("");
    setIsOpen(!isOpen);
    setIsSubmit(true);
  };

  const _toggle = (id) => {
    setIsOpen(!isOpen);
    setIsSubmit(true);
  };

  const editModal = (
    <div className="mt-2 mb-3">
      <div>
        <PercentageComponent
          name="margin_percentage"
          label="Margin %"
          placeholder="Enter Margin %"
          error=""
          fontBolded
        />
      </div>
      <div>
        <CurrencyComponent
          name="cost_price"
          label="Cost Price"
          placeholder="Enter Cost Price"
          error=""
          fontBolded
        />
      </div>
    </div>
  );

  const footer = (
    <>
      <SaveButton type="submit" loading={isSubmit == false} label="Save" />
    </>
  );

  const handleUpdate = async (values) => {
    const data = new FormData();

    data.append(
      "cost_price",
      values && values.cost_price ? values.cost_price : ""
    );
    data.append(
      "margin_percentage",
      values && values.margin_percentage ? values.margin_percentage : ""
    );

    let params = {
      accountId: accountId,
      id: rowValue?.id,
      sort: Url.GetParam("sort"),
      sortDir: Url.GetParam("sortDir")
    };

    dispatch(
      await AccountProductService.update(params, data, (res) => {
        if (res) {
          closeToggle();
        }
      })
    );
  };

  const initialValues = {
    margin_percentage: rowValue?.margin_percentage
      ? rowValue?.margin_percentage
      : "",
    cost_price: rowValue?.cost_price ? rowValue?.cost_price : ""
  };

  return (
    <>
      <Drawer
        modelTitle="Edit Product"
        DrawerBody={editModal}
        DrawerFooter={footer}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
        initialValues={initialValues}
        enableReinitialize
        handleOpenModal={_toggle}
        handleCloseModal={closeToggle}
        handleDrawerClose={_toggle}
        isModalOpen={isOpen}
      />
      <ReduxTable
        id="vendorProduct"
        showHeader
        newTableHeading
        apiURL={`${endpoints().accountProductAPI}/search`}
        params={{
          accountId: accountId,
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir")
        }}
        searchPlaceholder="Search..."
        sortByOptions={sortByOption}
        paramsToUrl={true}
        history={history}
        showCategoryFilter
        showBrandFilter>
        <ReduxColumn
          field="name"
          type="link"
          sortBy="name"
          isClickable="true"
          renderField={(row) => (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row.name}
                packSize={row.pack_size}
                url={row.image}
                brandName={row.brand_name}
                salePrice={row.sale_price}
                mrp={row.mrp}
                id={row.product_id}
                brand_id={row.brand_id}
              />
            </>
          )}>
          Product
        </ReduxColumn>

        <ReduxColumn
          field="cost_price"
          sortBy="cost_price"
          className="text-right"
          renderField={(row) => <span>{Currency.Format(row.cost_price)}</span>}>
          cost Price
        </ReduxColumn>

        <ReduxColumn
          field="margin_percentage"
          sortBy="margin_percentage"
          renderField={(row) => (
            <span className="float-right">
              {Percentage.Get(row.margin_percentage)}
            </span>
          )}>
          Margin %
        </ReduxColumn>
        <ReduxColumn
          field="margin_amount"
          sortBy="margin_amount"
          renderField={(row) => (
            <span className="float-right">
              <span>{Currency.Format(row.margin_amount)}</span>
            </span>
          )}>
          Margin Amount
        </ReduxColumn>
        <ReduxColumn
          field="last_purchased_date"
          sortBy="last_purchased_date"
          className="text-center"
          renderField={(row) => (
            <span>{DateTime.getDate(row.last_purchased_date)}</span>
          )}>
          Last Purchased Date
        </ReduxColumn>
        <ReduxColumn
          width="70px"
          field="Action"
          disableOnClick
          renderField={(row) => (
            <div className="col-4 text-center landing-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  onClick={() => {
                    setRowValue(row);
                    _toggle();
                  }}>
                  Edit
                </DropdownItem>
              </MoreDropdown>
            </div>
          )}>
          Action
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default AccountProductList;