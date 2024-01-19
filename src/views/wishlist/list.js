import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, DropdownItem } from "reactstrap";
import AddModal from "../../components/Modal";
import { bindActionCreators } from "redux";

// Components
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Select from "../../components/Select";
import { connect } from "react-redux";
import { fetchList } from "../../actions/table";

//Config
import { endpoints } from "../../api/endPoints";

// Action
import ProductCard from "../product/components/productCard";
import DateSelector from "../../components/Date";
import DateTime from "../../lib/DateTime";
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeleteModal from "../../components/DeleteModal";
import Url from "../../lib/Url";
import StoreService from "../../services/StoreService";
import ProductService from "../../services/ProductService";
import SelectStore from "../../components/SelectStore";
import WishList from "../../services/WishListSevice";

const wishlist = "wishlist";
const Wishlist = (props) => {
  const { pageSize, currentPage } = props;
  const [storeList, setStoreList] = useState([]);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [product, setProduct] = useState("");
  const [location, setStore] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getStoreList();
    getProductList();
  }, []);

  const deleteWishlists = async (id) => {
    dispatch(
      await WishList.deleteWishlist(
        id,
        {
          pagination: true,
          sort: params.sort,
          sortDir: params.sortDir,
        },
        props.currentPage,
        props.pageSize
      )
    );

    setIsDeleteModel(false);
  };

  const getProductDetails = (
    productName,
    productImage,
    brandName,
    size,
    unit,
    salePrice,
    mrp
  ) => {
    return (
      <ProductCard
        productImageIcon
        square
        productName={productName}
        brandName={brandName}
        url={productImage}
        size={size != "null" ? size : ""}
        unit={unit != "null" ? unit : ""}
        salePrice={salePrice != "null" ? salePrice : ""}
        mrp={mrp != "null" ? mrp : ""}
      />
    );
  };

  const StoreSelectModal = () => {
    setProduct("");
    setStore("");
    setSelectedDate("");
    setStoreModalOpen(!storeModalOpen);
  };

  const handleProductChange = (values) => {
    setProduct(values);
  };

  const handleStoreChange = (values) => {
    setStore(values);
  };

  const getStoreList = async () => {
    try {
      //create new array for location list
      StoreService.search((storeList) => {
        setStoreList(storeList);
        if (storeList && storeList.length > 0) return storeList;
      });
    } catch (err) { }
  };

  const handleDate = (endDate) => {
    setSelectedDate(endDate);
  };

  const createWishlist = async (data) => {
    const dataa = new FormData();
    dataa.append("storeId", data?.location?.value);
    dataa.append("date", data.Date);
    dataa.append("productId", data?.product?.value);
    dispatch(
      await WishList.addWishlist(dataa, params, currentPage, pageSize, { pagination: true })
    );

    StoreSelectModal();
  };

  const getProductList = async () => {
    try {
      //create new array for location list
      let response = await ProductService.search();

      let lists = [];
      let products = response.data;
      if (products && products.length > 0) {
        products.forEach((productList) => {
          lists.push({
            label: getProductDetails(
              productList.name,
              productList.image,
              productList.brand,
              productList.size,
              productList.unit,
              productList.sale_price,
              productList.mrp
            ),
            value: productList.id,
          });
        });
      }
      setProductList(lists);
    } catch (err) { }
  };

  const addOutofStockForm = (
    <div>
      <SelectStore
        name="location"
        label="Location"
        placeholder="Select Location"
        handleStoreChange={handleStoreChange}
        required
      />
      <Select
        name={"product"}
        label="Product"
        placeholder="Select Product"
        options={productList}
        handleChange={handleProductChange}
        required
      />

      <DateSelector
        name="Date"
        placeholder="Date"
        label="Select Date"
        onChange={handleDate}
      />
    </div>
  );

  const addOutofStockFooter = (
    <Button type="submit" className="h6-5-important">
      Add
    </Button>
  );

  // Sort By Option values
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "date:ASC",
      label: "Date",
    },
  ];

  const params = {
    sort: Url.GetParam("sort"),
    sortDir: Url.GetParam("sortDir"),
    pagination: true,
    location: Url.GetParam("location"),
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
  };

  return (
    <>
      <AddModal
        modalTitle="Add Wishlist"
        modalBody={addOutofStockForm}
        modalFooter={addOutofStockFooter}
        isOpen={storeModalOpen}
        toggle={StoreSelectModal}
        toggleModalClose={StoreSelectModal}
        initialValues={{
          location: location,
          product: product,
          Date: selectedDate ? DateTime.getTodayDateByUserTimeZone(selectedDate) : DateTime.getTodayDateByUserTimeZone(new Date()),
        }}
        onSubmit={(values) => {
          createWishlist(values);
        }}
        hideDefaultButtons
      />

      {/* /.page-heading */}
      <PageTitle
        label="Wishlist"
        buttonLabel="Add New"
        buttonHandler={(e) => {
          StoreSelectModal();
        }}
      />
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Delete wishlist"
        id={selectedStockId?.id}
        label={selectedStockId?.product_name}
        deleteFunction={() => deleteWishlists(selectedStockId?.id)}
      />

      <div className="mt-4">
        <ReduxTable
          id="wishlist"
          apiURL={`${endpoints().wishlistAPI}/search`}
          searchPlaceholder="Search"
          onRowClick
          showHeader
          newTableHeading
          history={props.history}
          paramsToUrl={true}
          sortByOptions={sortByOption}
          params={params}
          showStoreFilter
          showDateFilter
        >
          <ReduxColumn
            field="date"
            sortBy="date"
            renderField={(row) => <>{DateTime.getDate(row.date)}</>}
          >
            Date
          </ReduxColumn>
          <ReduxColumn field="location_name" sortBy="name">
            Location
          </ReduxColumn>

          <ReduxColumn
            field="product_name"
            sortBy="product_display_name"
            isClickable="true"
            renderField={(row) => (
              <>
                <div className="d-flex text-break">
                  <ProductCard
                    productImageIcon
                    square
                    productName={row.product_name}
                    brandName={row.brand_name}
                    url={row.image}
                    mrp={row.mrp}
                    salePrice={row.sale_price}
                    brand_id={row.brand_id}
                    id={row.product_id}
                  />
                </div>
              </>
            )}
          >
            Name
          </ReduxColumn>
          <ReduxColumn
            width="70px"
            maxWidth="70px"
            minWidth="70px"
            field="Action"
            disableOnClick
            renderField={(row) => (
              <div className="col-4 text-center landing-group-dropdown">
                <MoreDropdown>
                  <DropdownItem
                    className="text-danger cursor-pointer"
                    onClick={() => {
                      setIsDeleteModel(true);
                      setSelectedStockId(row);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </MoreDropdown>
              </div>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

const mapStateToProps = (state) => {
  const reduxTable = state.table;

  const pageSize =
    reduxTable[wishlist] && reduxTable[wishlist].isFetching == false
      ? reduxTable[wishlist].pageSize
      : 25;

  const currentPage =
    reduxTable[wishlist] && reduxTable[wishlist].isFetching == false
      ? reduxTable[wishlist].currentPage
      : 1;

  return {
    pageSize,
    currentPage,
  };
};
export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(Wishlist);
