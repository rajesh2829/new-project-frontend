import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";

// Components
import { deletePurchaseProductEntry } from "../../../actions/purchase";
import CurrencyComponent from "../../../components/Currency.js";
import DeleteModal from "../../../components/DeleteModal";
import Percentages from "../../../components/Percentage";
import Quantity from "../../../components/Quantity";
import SaveButton from "../../../components/SaveButton";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ProductCard from "../../product/components/productCard";

// Api
import { endpoints } from "../../../api/endPoints";

// Lib
import Action from "../../../components/Action";
import Drawer from "../../../components/Drawer";
import StatusText from "../../../components/StatusText";
import ObjectName from "../../../helpers/ObjectName";
import formatCurrency, { Percentage } from "../../../lib/Currency";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import ProductService from "../../../services/ProductService";
import PurchaseProductService from "../../../services/PurchaseProductService";
import StatusService from "../../../services/StatusService";
import { hasPermission } from "../../../services/UserRolePermissionService";
import Permission from "../../../helpers/Permission";
import * as Constants from "../../../helpers/Purchase.js";
import Number from "../../../lib/Number.js";
import { PurchaseProductStatus, purchaseProduct } from "../../../helpers/purchaseProduct.js";

const productForm = (props) => {
  const {
    history,
    arrays,
    storeId,
    purchaseId,
    onBulkSelect,
    vendorId,
    showActionButton
  } = props;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("");

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const [rowValues, setRowValue] = useState("");

  const [quantity, setQuantity] = useState("");

  const [productId, setProductId] = useState("");

  const [net_amount, setAmount] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [productDetail, setProductDetail] = useState("");
  const [mrp, setMrp] = useState("")
  const [purchaseProductId, setPurchaseProductId] = useState("")
  const [rowStatus, setRowStatus] = useState("")
  const [purchaseData, setPurchaseData] = useState({})
  const [taxableAmount, setTaxableAmount] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState("");

  useEffect(() => {
    getPurchaseData()
  }, [mrp, net_amount, quantity, taxableAmount, productDetail]);
  const buttonLabel = true;
  useEffect(() => {
    getStatus()
  }, []);
  let hasPurchaseEditPermission = hasPermission(Permission.PURCHASE_EDIT);

  //   Get Status List
  const getStatusList = async (currentStatusId) => {
    if (currentStatusId) {
      const data = await StatusService.nextStatusSearch(
        ObjectName.PURCHASE_PRODUCT,
        currentStatusId
      );
      if (data && data.length > 0) {
        setStatusList(data);
      }
    }
  };


  function getKeyByValue(object, value) {
    let isSelected = false;
    for (const key in object) {
      if (key == value) {
        isSelected = object[key] == true ? true : false;
      }
    }
    return isSelected;
  }


  const enable_discount_amount =
    arrays && getKeyByValue(arrays, Constants.FieldLabel.DISCOUNT_AMOUNT)
      ? true
      : false;

  const enable_unit_margin_amount =
    arrays && getKeyByValue(arrays, Constants.FieldLabel.UNIT_MARGIN_AMOUNT)
      ? true
      : false;
  const enable_manufacture_date =
    arrays && getKeyByValue(arrays, Constants.FieldLabel.MANUFACTURED_DATE)
      ? true
      : false;
  const enable_status =
    arrays && getKeyByValue(arrays, Constants.FieldLabel.STATUS)
      ? true
      : false;

  const enable_tax_amount = arrays && getKeyByValue(arrays, Constants.FieldLabel.TAX_AMOUNT)
  const enable_taxable_amount = arrays && getKeyByValue(arrays, Constants.FieldLabel.TAXABLE_AMOUNT)

  const getStatus = async () => {
    const getStatus = [];
    const status = await StatusService.search(ObjectName.PURCHASE_PRODUCT);
    for (let i = 0; i < status.length; i++) {
      getStatus.push({
        label: status[i].name,
        value: status[i].id,
        default_owner: status[i]?.default_owner,
      });
    }
    props.statusValue && props.statusValue(getStatus)
  };

  const DeletepurchaseProduct = () => {
    try {
      //validate selected prodect exist or not
      if (selectedProduct) {
        //cretae parms
        let params = {
          storeId: storeId,
          purchaseId: purchaseId,
          pagination: true,
        };

        dispatch(
          deletePurchaseProductEntry(
            selectedProduct.id,
            params,
            closeDeleteModal
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
    setRowValue("")
    setPurchaseData({})
  };

  const actionsMenuList = [
    {
      value: "Update Tax% From Product",
      label: "Update Tax% From Product",
    },
  ];

  const filteredStatus = PurchaseProductStatus.filter(
    (item) => item.value !== rowValues.marginStatus
  );

  actionsMenuList.push(...filteredStatus);

  let handleActionChange = async (value) => {


    if (value == "Update Tax% From Product") {
      let response = await ProductService.get(rowValues?.product_id);
      setProductDetail(response);
    }
    if (value > 0) {
      dispatch(await PurchaseProductService.updateMarginStatus(
        rowValues.id,
        value,
        {
          pagination: true,
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
          search: Url.GetParam("search") || "",
          page: Url.GetParam("page") || "",
          pageSize:
            Url.GetParam("pageSize") || "",
          storeId,
          purchaseId,
        }
      ))
    }

  };

  const handleQuantityChange = async (e) => {
    //qty
    let qtyValue = e?.values?.quantity?.value ? e?.values?.quantity?.value : 0;

    setQuantity(qtyValue);

    getPurchaseData()
  };

  const handleMrpChange = async (e) => {
    let marpValue = e && e.target.value ? e.target.value : 0;
    setMrp(marpValue);
    getPurchaseData()
  };

  const handleAmountChange = (e) => {
    let totalAmount = e.target.value ? e.target.value : null;
      if (e.target.value) {
        setAmount(totalAmount);
      setTaxableAmount("");
      getPurchaseData();

    }
  
  }

  const handleTaxableAmountChange = (e) => {
    let taxableAmount = e.target.value ? e.target.value : "";

    setTaxableAmount(taxableAmount);
    setAmount("")
    getPurchaseData()
  }


  const calculateAmountAndTax = (params) => {

    const { totalAmount, cgstPercentage, sgstPercentage, igstPercentage, cessPercentage, quantity, taxableAmount } = params
    //  combined GST percentage
    const combinedGstPercentage = Number.Float(cgstPercentage) + Number.Float(sgstPercentage) + Number.Float(igstPercentage) + Number.Float(cessPercentage);

    //  net_amount before tax
    const taxable_amount = taxableAmount ? taxableAmount : totalAmount ? Number.Float(totalAmount / (1 + combinedGstPercentage / 100)) : "";

    //  tax amounts
    const cgstAmount = taxable_amount * (cgstPercentage / 100);
    const sgstAmount = taxable_amount * (sgstPercentage / 100);
    const igstAmount = taxable_amount * (igstPercentage / 100);
    const cessAmount = taxable_amount * (cessPercentage / 100);

    // gst net_amount
    let cgstTotalAmount = Number.Float(cgstAmount ? cgstAmount : rowValues.cgst_amount);


    let igstTotalAmount = Number.Float(igstAmount ? igstAmount : rowValues.igst_amount);


    let sgstTotalAmount = Number.Float(sgstAmount ? sgstAmount : rowValues.sgst_amount);

    let cessTotalAmount = Number.Float(cessAmount ? cessAmount : rowValues.cess_amount);

    // totalTax
    let totalTaxAmount =

      (Number.Float(cgstTotalAmount) +
        Number.Float(igstTotalAmount) +
        Number.Float(sgstTotalAmount) +
        Number.Float(cessTotalAmount)) || null


    // final total Amount
    let finalTotalAmount = totalAmount ? totalAmount : taxable_amount && totalTaxAmount ? (Number.Float(taxable_amount) + Number.Float(totalTaxAmount)) : Number.Float(rowValues.net_amount)


    let finalTaxbleAmount = taxable_amount ? taxable_amount : (finalTotalAmount - totalTaxAmount)


    let qtyValue = quantity ? quantity : rowValues?.quantity



    return {
      taxableAmount: finalTaxbleAmount,
      cgstAmount: cgstTotalAmount,
      sgstAmount: sgstTotalAmount,
      igstAmount: igstTotalAmount,
      cessAmount: cessTotalAmount,
      totalTaxAmount: totalTaxAmount,
      totalAmount: finalTotalAmount

    };
  }

  let getPurchaseData = () => {

    // sum of tax percentage
    let totalTax =
      (Number.Float(productDetail?.cgst_percentage || rowValues.cgst_percentage) +
        Number.Float(productDetail?.sgst_percentage || rowValues.sgst_percentage) +
        Number.Float(productDetail?.tax_percentage || rowValues.cess_percentage) +
        Number.Float(productDetail?.igst_percentage || rowValues.igst_percentage));
    let cgst_percentage = productDetail?.cgst_percentage ? Number.Float(productDetail.cgst_percentage) : Number.Float(rowValues?.cgst_percentage);

    let sgst_percentage = productDetail?.sgst_percentage ? Number.Float(productDetail.sgst_percentage) : Number.Float(rowValues?.sgst_percentage);

    let cess_percentage = productDetail?.tax_percentage ? Number.Float(productDetail.tax_percentage) : Number.Float(rowValues?.cess_percentage);

    let igst_percentage = productDetail?.igst_percentage ? Number.Float(productDetail.igst_percentage) : Number.Float(rowValues?.igst_percentage);

    // quantity
    let quantityValue = quantity ? quantity : rowValues?.quantity;


    // mrp
    let mrpValue = mrp ? mrp : rowValues?.mrp;

    let param = {
      totalAmount: net_amount,
      cgstPercentage: cgst_percentage,
      sgstPercentage: sgst_percentage,
      igstPercentage: igst_percentage,
      cessPercentage: cess_percentage,
      quantity: quantityValue,
      taxableAmount: taxableAmount
    }

    // caluclated result
    const result = calculateAmountAndTax(param);

    // unitPrice
    let unit_price = (result.totalAmount / quantityValue)

    // marginamount
    let marginValue = (mrpValue) - unit_price;

    // margin percentage
    let unitMarginPercentage = (marginValue / mrpValue) * 100;

    // return data
    let data = {
      quantity: Number.Float(quantityValue),
      mrp: mrpValue,
      unit_price: Number.Float(unit_price),
      cgst_percentage: Number.Float(cgst_percentage),
      sgst_percentage: Number.Float(sgst_percentage),
      igst_percentage: Number.Float(igst_percentage),
      cess_percentage: Number.Float(cess_percentage),
      totalTaxAmount: result.totalTaxAmount,
      taxable_amount: result.taxableAmount,
      cgst_amount: Number.Float(result.cgstAmount),
      sgst_amount: Number.Float(result.sgstAmount),
      cess_amount: Number.Float(result.cessAmount),
      igst_amount: Number.Float(result.igstAmount),
      totalTax: Number.Float(totalTax),
      net_amount: result.totalAmount,
      unitMarginAmount: marginValue,
      marginAmount: marginValue,
      marginPercentage: unitMarginPercentage
    };

    // assign  data to state
    setPurchaseData(data)
  };

  // edit modal form
  const editProduct = (
    <>
      <div className="d-flex justify-content-between">
        <ProductCard
          productImageIcon
          square
          productName={rowValues.product_name ? rowValues.product_name : rowValues.name}
          brandName={rowValues.brand_name ? rowValues.brand_name : rowValues.brandName}
          packSize={rowValues?.pack_size}
          id={rowValues?.product_id ? rowValues?.product_id : rowValues?.id}
          url={rowValues?.image ? rowValues?.image : rowValues?.url}
          mrp={rowValues?.mrp}
          salePrice={rowValues?.sale_price}
          unit={rowValues?.unit}
          size={rowValues?.size}
        />
        {hasPurchaseEditPermission && <Action
          dropdownLinks={actionsMenuList}
          handleChange={handleActionChange}
        />}
      </div>
      <div className="col-12 p-0 m-0">
        <Quantity
          maxQuantity={100}
          label="Quantity"
          onChange={handleQuantityChange}
          required
        />
      </div>
      <div className="card card-body shadow">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <CurrencyComponent label="MRP" name="mrp" onChange={handleMrpChange} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <CurrencyComponent
              label="Net Amount"
              name="net_amount"
              required
              onChange={handleAmountChange}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <CurrencyComponent
              label="Taxable Amount"
              name="taxable_amount"
              onChange={handleTaxableAmountChange}
            />
          </div>
        </div>
      </div>
      <div className="card card-body mt-2 shadow">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 ">
            <CurrencyComponent
              label="Unit Price"
              name="unit_amount"
              disabled
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 ">
            <Percentages
              name="margin_percentage"
              label="Margin %"
              disabled
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 ">
            <CurrencyComponent
              label="Unit Margin Amount"
              name="unit_margin_amount"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="card card-body mt-2 border shadow">
        <div className="row">
          <div className="col-6">
            <Percentages
              name="cgst_percentage"
              label=" CGST%"
              disabled
            />
          </div>
          <div className="col-6">
            <CurrencyComponent
              label="CGST Amount"
              name="cgst_amount"
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Percentages
              name="sgst_percentage"
              label=" SGST%"
              disabled
            />
          </div>
          <div className="col-6">
            <CurrencyComponent
              label="SGST Amount"
              name="sgst_amount"
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Percentages
              name="igst_percentage"
              label="IGST%"
              disabled
            />
          </div>
          <div className="col-6">
            <CurrencyComponent
              label="IGST Amount"
              name="igst_amount"
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Percentages
              name="cess_percentage"
              label=" CESS%"
              disabled
            />
          </div>
          <div className="col-6">
            <CurrencyComponent
              label="CESS Amount"
              name="cess_amount"
              disabled
            />
          </div>
        </div>
        <div className="row border">
          <div className="col-6 ">
            <CurrencyComponent
              label="Tax Amount"
              name="tax_amount"
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );

  // edit modal footer
  const editFooter = (
    <div>
      <SaveButton type="submit" label="Save" />
    </div>
  );
  // edit modal toggle
  const _toggle = (Id) => {
    setIsOpen(!isOpen);
    setProductDetail("");
    setAmount("");
    setMrp("");
    setTaxableAmount("")

  };


  const _toggleClose = (Id) => {
    setIsOpen(!isOpen);
    setProductDetail("");
    setAmount("");
    setMrp("");
    setRowValue("")
    setQuantity("")
    setPurchaseData({})
    setTaxableAmount("")
  };



  // Edit modal initial values
  const initialValues = {
    cgst_percentage: purchaseData?.cgst_percentage ?? rowValues?.cgst_percentage ?? null,
    cgst_amount: purchaseData?.cgst_amount ?? rowValues?.cgst_amount ?? null,
    sgst_percentage: purchaseData?.sgst_percentage ?? rowValues?.sgst_percentage ?? null,
    sgst_amount: purchaseData?.sgst_amount ?? rowValues?.sgst_amount ?? null,
    cess_amount: purchaseData?.cess_amount ?? rowValues?.cess_amount ?? null,
    cess_percentage: purchaseData?.cess_percentage ?? rowValues?.cess_percentage ?? null,
    igst_percentage: purchaseData?.igst_percentage ?? rowValues?.igst_percentage ?? null,
    igst_amount: purchaseData?.igst_amount ?? rowValues?.igst_amount ?? null,
    mrp: purchaseData?.mrp ?? rowValues?.mrp ?? null,
    quantity: {
      label: purchaseData?.quantity ?? purchaseQuantity ?? rowValues?.quantity ?? null,
      value: purchaseData?.quantity ?? purchaseQuantity ?? rowValues?.quantity ?? null,
    },
    net_amount: purchaseData?.net_amount ? purchaseData?.net_amount : rowValues?.net_amount ?? null,
    unit_amount: purchaseData?.unit_price ?? rowValues?.unit_price ?? null,
    margin_percentage: purchaseData?.marginPercentage ? Number.getPositive(purchaseData?.marginPercentage) : Number.getPositive(rowValues?.margin_percentage),
    unit_margin_amount: purchaseData?.unitMarginAmount ? Number.getPositive(purchaseData?.unitMarginAmount) : Number.getPositive(rowValues?.unit_margin_amount),
    taxable_amount: purchaseData?.taxable_amount ? purchaseData?.taxable_amount : rowValues?.taxable_amount ?? null,
    tax_amount: purchaseData?.totalTaxAmount ?? rowValues?.tax_amount ?? null,
  };

  //Edit purchase Details
  const EditPurchaseProduct = async (values) => {

    // setIsLoading(true);
    try {
      //cretae parms
      const data = new FormData();
      data.append("purchase_id", purchaseId);
      data.append("product_id", productId);
      data.append("cgst_percentage", values && values.cgst_percentage);
      data.append("sgst_percentage", values && values.sgst_percentage);
      data.append("cess_percentage", values && values.cess_percentage);
      data.append("cess_amount", values && values.cess_amount);
      data.append("sgst_amount", values && values.sgst_amount);
      data.append("cgst_amount", values && values.cgst_amount);
      data.append("igst_amount", values && values.igst_amount);
      data.append("igst_percentage", values && values.igst_percentage);
      data.append("discount_percentage", values && values.discount_percentage);
      data.append("taxable_amount", values && values.taxable_amount);
      data.append("mrp", values && values.mrp);
      data.append(
        "discount_amount", values && Number.Float(values.discount_amount)
      );

      data.append(
        "tax_amount",
        values && Number.Get(values.tax_amount)
      );

      data.append("net_amount", values && values.net_amount);

      data.append(
        "pack_size",
        values && values.pack_size && values.pack_size.value
      );
      data.append("tax_percentage", values && Number.Float(values.tax));

      data.append(
        "quantity",
        values && values.quantity && values.quantity.value
      );

      data.append("unit_price", values && values.unit_amount);
      data.append("margin_percentage", values && Number.Float(values.margin_percentage));
      data.append("unit_margin_amount", values && values.unit_margin_amount)

      let params = {
        storeId,
        purchaseId,
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
        search: Url.GetParam("search"),
      };
      dispatch(
        PurchaseProductService.update(purchaseProductId, data, params, _toggleClose, {
          pagination: true,
          sort: Url.GetParam("sort"),
          search: Url.GetParam("search"),
          sortDir: Url.GetParam("sortDir"),
        })
      );
    } catch (err) {
      console.log(err);
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


  let params = {
    pagination: true,
    sort: "createdAt",
    sortDir: "DESC",
    search: Url.GetParam("search") || "",
    page: Url.GetParam("page") || "",
    pageSize:
      Url.GetParam("pageSize") || "",
    storeId,
    purchaseId,
  }
  return (
    <>
      <div>
        {/* Delete confirmation Modal */}
        <DeleteModal
          isOpen={openDeleteModal}
          label={selectedProduct.product_name}
          toggle={closeDeleteModal}
          title="Delete Stock Product Entry"
          deleteFunction={DeletepurchaseProduct}
        />
        {/* Edit Modal */}

        <Drawer
          modelTitle="Edit Purchase Product"
          DrawerBody={editProduct}
          DrawerFooter={editFooter}
          onSubmit={(values) => {
            dispatch(EditPurchaseProduct(values));
          }}
          initialValues={initialValues}
          handleOpenModal={_toggle}
          handleCloseModal={_toggleClose}
          handleDrawerClose={_toggleClose}
          isModalOpen={isOpen}
          buttonLabel={buttonLabel}
          enableReinitialize={true}
        />

        {/* Stock Product Entry List */}
        <ReduxTable
          id="purchaseProduct"
          showHeader
          paramsToUrl={true}
          showParamsInUrl={{
            page: true,
            tab: Url.GetParam("tab"),
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir"),
            search: Url.GetParam("search"),
            page : Url.GetParam("page") ,
             pageSize : Url.GetParam("pageSize") ,
          }}
          searchPlaceholder="Search"
          apiURL={`${endpoints().purchaseProductAPI}/list`}
          newTableHeading

          sortByOptions={sortByOption}
          defaultSortOption={[
            {
              value: "product_name:ASC",
              label: "Name",
            }

          ]}
          params={{
            purchaseId: purchaseId ? purchaseId : "",
            storeId: storeId ? storeId : "",
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir"),
            vendorId: vendorId ? vendorId : ""

          }}
          history={history}
          purchaseProducttotalAmount
          totalTaxAmount
          totalTaxableAmount
          bulkSelect
          customCheckBoxId="product_id"
          onBulkSelect={onBulkSelect}
        >
          <ReduxColumn
            field="product_name"
            sortBy="product_name"
            width="400px"
            minWidth="400px"
            maxWidth="400px"
            className="ellipsis text-wrap"
            type="link"
            isClickable="false"
            renderField={(row) => (
              <>
                <ProductCard
                  productImageIcon
                  square
                  param={row}
                  productName={row.product_name}
                  brandName={row.brand_name}
                  productLink={row.image}
                  url={row.image}
                  size={row.size}
                  packSize={row.pack_size}
                  unit={row.unit}
                  salePrice={row.sale_price}
                  mrp={row.mrp}
                  id={row.product_id}
                  showHSNCode
                  hsn_code={row.hsn_code}
                  brand_id={row.brand_id}
                />
              </>
            )}
          >
            {" "}
            Product
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-center"
            field="quantity"
            sortBy="quantity"
          >
            Quantity
          </ReduxColumn>
          <ReduxColumn
            className="text-center"
            field="mrp"
            sortBy="mrp"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.mrp)}</span>
            )}
          >
            MRP
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-right"
            field="unit_price"
            sortBy="unit_price"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.unit_price)}</span>
            )}
          >
            Unit Price
          </ReduxColumn>

          {enable_discount_amount && (
            <ReduxColumn
              className="ellipsis text-right"
              field="discount_amount"
              sortBy="discount_amount"
              renderField={(row) => (
                <span>{formatCurrency.Format(row.discount_amount)}</span>
              )}
            >
              Discount Amount
            </ReduxColumn>
          )}
          {enable_taxable_amount && <ReduxColumn
            className="ellipsis text-right"
            field="taxable_amount"
            sortBy="taxable_amount"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.taxable_amount)}</span>
            )}
          >
            Taxable Amount
          </ReduxColumn>}
          {enable_tax_amount && <ReduxColumn
            className="ellipsis text-right"
            field="tax_amount"
            sortBy="tax_amount"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.tax_amount)}</span>
            )}
          >
            Tax Amount
          </ReduxColumn>}
          <ReduxColumn
            className="ellipsis text-right"
            field="taxable_amount"
            sortBy="taxable_amount"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.taxable_amount)}</span>
            )}
          >
            Taxable Amount
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-right"
            field="tax_amount"
            sortBy="tax_amount"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.tax_amount)}</span>
            )}
          >
            Tax Amount
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-right"
            field="net_amount"
            sortBy="net_amount"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.net_amount)}</span>
            )}
          >
            Amount
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-right"
            field="margin_percentage"
            sortBy="margin_percentage"
            renderField={(row) => (
              <>
                <span>{Percentage(row.margin_percentage)}
                </span>
                <span>
                  {row.marginStatus !== purchaseProduct.MARGIN_STATUS_MATCHED ? (
                    <h6 className="font-weight-bold text-danger text-right mr-0 ml-0">
                      {row.marginStatusText}
                    </h6>
                  ) : (
                    <>
                      {row.marginStatus == purchaseProduct.MARGIN_STATUS_MATCHED &&
                        <h6 className="font-weight-bold text-success text-right mr-0 ml-0">
                          {row.marginStatusText}
                        </h6>
                      }
                    </>
                  )}</span>
              </>
            )}
          >
            Margin %
          </ReduxColumn>
          {enable_unit_margin_amount && (
            <ReduxColumn
              className="ellipsis text-right"
              field="unit_margin_amount"
              sortBy="unit_margin_amount"
              renderField={(row) => (
                <span>{formatCurrency.Format(row.unit_margin_amount)}</span>
              )}
            >
              Unit Margin Amount
            </ReduxColumn>
          )}
          {enable_manufacture_date && (
            <ReduxColumn
              className="text-center"
              width="100px"
              minWidth="180px"
              maxWidth="150px"
              sortBy="manufactured_date"
              renderField={(row) =>
                row.manufactured_date && (
                  <span>{DateTime.getDate(row.manufactured_date)}</span>
                )
              }
            >
              Manufactured Date
            </ReduxColumn>
          )}
          {enable_status && (
            <ReduxColumn
              field="status"
              width="110px"
              maxWidth="110px"
              minWidth="110px"
              renderField={(row) => (
                <StatusText
                  status={row.status}
                />
              )}
            >
              Status
            </ReduxColumn>
          )}
          {showActionButton && <ReduxColumn
            field="Action"
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
                      }}
                    >
                      <DropdownItem
                        onClick={() => {
                          setRowValue(row);
                          setProductId(row.product_id);
                          setPurchaseQuantity(row.quantity)
                          setPurchaseProductId(row?.id)
                          setRowStatus(row)
                          return _toggle(row.id);
                        }}
                      >
                        Quick View
                      </DropdownItem>
                      {statusList &&
                        statusList.length > 0 &&
                        statusList.map((data) => {
                          return (
                            <DropdownItem
                              onClick={() => {
                                dispatch(
                                  PurchaseProductService.updateStatus(
                                    row.id,
                                    data.value,
                                    row.product_id,
                                    {
                                      pagination: true,
                                      sort: Url.GetParam("sort"),
                                      sortDir: Url.GetParam("sortDir"),
                                      search: Url.GetParam("search") || "",
                                      page: Url.GetParam("page"),
                                      pageSize:
                                        Url.GetParam("pageSize"),
                                      storeId,
                                      purchaseId,
                                    }
                                  )
                                );
                              }}
                            >
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
                      <>
                      </>
                    </MoreDropdown>
                  </div>
                </div>
              </>
            )}
          >
            Action
          </ReduxColumn>}
        </ReduxTable>
      </div>
    </>
  );
};
export default productForm;
