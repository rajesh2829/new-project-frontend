import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { DropdownItem } from "reactstrap";
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeleteModal from "../../components/DeleteModal";
import ProductCard from "../product/components/productCard";
import { Link } from "react-router-dom";
import StatusText from "../../components/StatusText";
import ObjectName from "../../helpers/ObjectName";
import { StockEntryProduct } from "../../helpers/StockEntryProduct";
import { TagTypeName } from "../../helpers/Tag";
import ArrayList from "../../lib/ArrayList";
import DateTime from "../../lib/DateTime";
import Url from "../../lib/Url";
import StatusService from "../../services/StatusService";
import StockEntryProductService from "../../services/StockProductEntryService";

const StockEntryDetailPage = (props) => {
  const [storeProductList, setStoreProductList] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [scannedProductCode, setScannedProductCode] = useState("");
  const [scannedProduct, setScannedProduct] = useState("");
  const [statusList, setStatusList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getStoreProducts();
  }, []);

  useEffect(() => {
    getProductDetail();
  }, [scannedProductCode]);

  useEffect(() => {
    removeScannedCode();
  }, [scannedProduct]);

  const removeScannedCode = () => {
    setScannedProductCode(null);
  };

  const getProductDetail = () => {
    if (
      storeProductList &&
      ArrayList.isNotEmpty(storeProductList) &&
      scannedProductCode
    ) {
      let scannedProduct = storeProductList.find(
        (data) => data.barcode == scannedProductCode
      );
      setScannedProduct(scannedProduct);
    }
  };

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "product_name:ASC",
      label: "Name",
    },
  ];

  //Sort By Option Values
  const stockProductTypeOption = [
    {

      label: StockEntryProduct.TYPE_ALL,
      value: StockEntryProduct.TYPE_ALL_VALUE,
    },
    {
      label: StockEntryProduct.TYPE_MATCHED,
      value: StockEntryProduct.TYPE_MATCHED_VALUE,
    },
    {
      label: StockEntryProduct.TYPE_NOT_MATCHED,
      value: StockEntryProduct.TYPE_NOT_MATCHED_VALUE
    },
    {
      label: StockEntryProduct.TYPE_NOT_MATCHED_POSTIVE,
      value: StockEntryProduct.TYPE_NOT_MATCHED_POSITIVE_VALUE
    },
    {
      label: StockEntryProduct.TYPE_NOT_MATCHED_NEGATIVE,
      value: StockEntryProduct.TYPE_NOT_MATCHED_NEGATIVE_VALUE
    },
  ];

  const getStoreProducts = async () => {
    try {
      //get store product list
      let storeProductList = new Array();

      let storeId = props.match.params.storeId;

      //validate store Id exist or not
      if (storeId) {
        //get store products
        let response = await apiClient.get(
          `${endpoints().storeProductAPI}/search?store_id=${storeId}`
        );

        //validate response exist or not
        if (response && response.data && response.data.data) {
          //get store products
          let storeProducts = response.data.data;
          //validate store products
          if (storeProducts && ArrayList.isNotEmpty(storeProducts)) {
            //loop the store rpdocuts
            for (let i = 0; i < storeProducts.length; i++) {
              //push the store prroducts
              storeProductList.push({
                label: storeProducts[i].productName,
                value: storeProducts[i].product_id,
                barcode: storeProducts[i].barcode,
                salePrice: storeProducts[i].sale_price
              });
            }
          }
          //set value in state
          setStoreProductList(storeProductList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   Get Status List
  const getStatusList = async (currentStatusId) => {
    if (currentStatusId) {
      const data = await StatusService.nextStatusSearch(
        ObjectName.STOCK_ENTRY_PRODUCT,
        currentStatusId,
      );

      if (data && data.length > 0) {
        setStatusList(data);
      }
    }
  };

  const DeleteStockProductEntry = () => {
    try {
      //validate selected prodect exist or not
      if (selectedProduct) {
        let storeId = selectedProduct.location_id;

        let stockEntryId = selectedProduct.stockEntryId;

        //cretae parms
        let params = { storeId: storeId, stockEntryId: stockEntryId, pagination: true };

        dispatch(
          StockEntryProductService.delete(selectedProduct.id, params, closeDeleteModal)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeDeleteModal = () => {
    //close modal
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleStatusChange = (selectedStatus, statusId) => {
    if (selectedStatus && selectedStatus.length > 0) {
      let body = { selectedIds: selectedStatus, status: statusId }
      dispatch(StockEntryProductService.updateStatus(body,
        {
          sort: "id",
          sortDir: "DESC",
          search: Url.GetParam("search") || "",
          page: Url.GetParam("page") || "",
          pageSize: Url.GetParam("pageSize") || "",
          brand: Url.GetParam("brand"),
          category: Url.GetParam("category"),
          stockEntryProductType: Url.GetParam("stockEntryProductType"),
          location: Url.GetParam("location"),
          productTag: Url.GetParam("productTag"),
          startDate: Url.GetParam("startDate"),
          endDate: Url.GetParam("endDate"),
          status: Url.GetParam("status"),
        }, () => { }));
    }
  }

  return (
    <div>
      <DeleteModal
        isOpen={openDeleteModal}
        label={selectedProduct.product_name}
        toggle={closeDeleteModal}
        title="Delete Stock Product Entry"
        deleteFunction={DeleteStockProductEntry}
      />
      {/* Stock Product Entry List */}
      <div className="mt-4">
        <ReduxTable
          id="stockProductEntry"
          showHeader
          bulkSelect
          onBulkSelect={props.BulkSelect}
          searchPlaceholder="Search"
          selectedCheckBox={props.selectedCheckBox}
          paramsToUrl={true}
          history={props.history}
          apiURL={`${endpoints().stockProductEntry}/search`}
          newTableHeading
          showBrandFilter
          showCategoryFilter
          showDateFilter
          showTagFilter
          tagFilterType={{ type: TagTypeName.PRODUCT }}
          showStatusFilter
          isLoading={props.isLoading}
          showStoreFilter
          showStockEntryProductTypeFilter
          stockProductTypeOption={stockProductTypeOption}
          sortByOptions={sortByOption}
          params={{
            storeId: props?.match?.params?.storeId || "",
            stockEntryId: props?.match?.params?.stockEntryId || "",
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir"),
            objectName: ObjectName.STOCK_ENTRY_PRODUCT,
            productId: props?.product_id ? props?.product_id : ""

          }}
        >
          <ReduxColumn
            className="text-center"
            field="stock_entry_number"
            sortBy="id"
            isClickable="true"
            type="link"
            width="110px"
            maxWidth="110px"
            minWidth="110px"
            renderField={(row) =>

            (
              <Link to={`/stockEntry/${row.stockEntryId}`}>
                {row.stock_entry_number}
              </Link>
            )}
          >
            Stock Entry#
          </ReduxColumn>
          <ReduxColumn
            sortBy="createdAt"
            className="text-center"
            renderField={(row) => <span>{DateTime.getDateTimeByUserProfileTimezone(row.date)}</span>}
          >
            Date
          </ReduxColumn>
          <ReduxColumn
            field="location_name"
            className="text-center"
          >
            Location
          </ReduxColumn>
          <ReduxColumn
            field="product_name"
            sortBy="product_name"
            type="link"
            width="400px"
            isClickable="true"
            className="ellipsis text-wrap"
            renderField={(row) => (
              <>
                <ProductCard
                  productImageIcon
                  square
                  productName={row.product_name}
                  url={row?.image}
                  brandName={row.brand_name}
                  size={row.size}
                  unit={row.unit}
                  salePrice={row.sale_price}
                  mrp={row.mrp}
                  id={row.product_id}
                  brand_id={row.brand_id}
                  packSize={row.pack_size}
                />
              </>
            )}
          >
            Product
          </ReduxColumn>

          <ReduxColumn className="text-center" sortBy="quantity" field="quantity">
            Quantity
          </ReduxColumn>
          <ReduxColumn className="text-center" field="rack_number">
            Rack Number
          </ReduxColumn>
          <ReduxColumn
            field="systemQuantity"
            className="text-center"
            sortBy="system_quantity"
            width="180px"
          >
            System Quantity
          </ReduxColumn>
          <ReduxColumn
            field="currentSystemQuantity"
            className="text-center"
            disableOnClick
            width="180px"
            renderField={(row) =>
            (
              <>
                <div>{row?.currentSystemQuantity}</div>
                <div>{row?.lastStockEntryDate && DateTime.getDate(row?.lastStockEntryDate)}</div>
              </>
            )}
          >
            Current System Quantity
          </ReduxColumn>
          <ReduxColumn
            field="status"
            width="110px"
            maxWidth="110px"
            minWidth="110px"
            sortBy="status"
            renderField={(row) => (
              <StatusText backgroundColor={row.statusColor} status={row.status} />
            )}>
            Status
          </ReduxColumn>
          <ReduxColumn
            field="status"
            disableOnClick
            width="70px"
            renderField={(row) => (
              <>
                <div className="d-flex justify-content-center align-items-center row">
                  <div className="text-dark landing-group-dropdown">
                    <MoreDropdown
                      onClick={() => {
                        setStatusList([]);
                        getStatusList(row.statusId);
                      }}>
                      {statusList &&
                        statusList.length > 0 &&
                        statusList.map((data) => {
                          return (
                            <DropdownItem
                              onClick={() => {
                                handleStatusChange([row.id], data.value);
                              }}>
                              {data.label}
                            </DropdownItem>
                          );
                        })}
                      <DropdownItem
                        className=" text-danger cursor-pointer"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setSelectedProduct(row);
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </MoreDropdown>
                  </div>
                </div>
              </>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </div>
  );
};

export default StockEntryDetailPage;
