import React from "react";
import { connect } from "react-redux";
import { Nav, TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { addProductVendor } from "../../actions/vendorProduct";
import DeleteModal from "../../components/DeleteModal";

// Components
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import ActivityList from "../../components/ActivityList";
import AddButton from "../../components/AddButton";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import Tab from "../../components/Tab";
import toast from "../../components/Toast";
import { isBadRequest } from "../../lib/Http";
import ProductCard from "../product/components/productCard";
import ProductList from "./VendorProductList";
import General from "./components/GeneralTab";

// Services
import AccountService from "../../services/AccountService";

// lib
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../../actions/table";
import Number from "../../components/Number";
import ProductSelectModal from "../../components/ProductSelectModal";
import Text from "../../components/Text";
import MoreDropdown from "../../components/authentication/moreDropdown";
import CustomForm from "../../components/customFieldsList/CustomForm";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Customer from "../../helpers/Customer";
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import Currency, { Percentage } from "../../lib/Currency";
import String from "../../lib/String";
import Url from "../../lib/Url";
import AddressService from "../../services/AddressService";
import ContactService from "../../services/ContactService";
import { hasPermission } from "../../services/UserRolePermissionService";
import {
  VendorProductService,
  deleteVendorProduct,
  updateVendorProduct
} from "../../services/VendorProductService";
import AddContact from "../contact/components/AddContact";
import ContactList from "../contact/components/ContactList";
import AddressDetailTab from "../portalDetail/AddressTab";
import PurchaseOrdersList from "../../../src/views/purchaseOrder/components/PurchaseOrderList";
import Action from "../../components/Action";
import SaveButton from "../../components/SaveButton";
import Drawer from "../../components/Drawer";
import AccountLoyaltyForm from "../../views/account/components/AccountLoyaltyForm";
import AccountLoyaltyService from "../../services/AccountLoyaltyService";
import { Link } from "react-router-dom";
import PaymentList from "../payment/components/paymentList";
import BillTab from "../purchase/components/BillTab";
import DateTime from "../../lib/DateTime";
import PurchaseOrder from "../../helpers/PurchaseOrder";
import PurchaseOrderService from "../../services/PurchaseOrderService";
import Account from "../../helpers/Account";

import PurchaseList from "./components/PurchaseList";
import AccountProductService from "../../services/AccountProductService";
import AccountProductList from "./components/AccountProductList";
import PaymentService from "../../services/PaymentService";

export const Tabs = {
  VENDOR_GENERAL_TAB: "General",
  CONTACTS_TAB: "Contacts",
  PRODUCT_TAB: "Products",
  HISTORY_TAB: "History ",
  LOYALTY_TAB: "Loyalty",
  PURCHASE_TAB: "Purchases",
  PURCHASE_ORDER_TAB: "Purchase Orders",
  ADDRESS_TAB: "Addresses",
  CUSTOMFIELDS: "Custom Fields",
  PAYMENT_TAB: "Payments",
  BILLS: "Bills"
};

class VendorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      VendorDetails: {},
      vendorById: this.props.match.params.id,
      isLoading: false,
      isSubmit: true,
      isOpen: false,
      category: "",
      points: "",
      delete: false,
      data: "",
      value: "",
      Address: [],
      submitResponse: false,
      statusResponse: false,
      openDeleteModal: false,
      deleteContactModal: false,
      openDelete: false,
      addProductModal: false,
      addContactModal: false,
      addStoreModal: false,
      activeTab: Url.GetParam("tab")
        ? Url.GetParam("tab")
        : Tabs.VENDOR_GENERAL_TAB,
      productName: "",
      status: "",
      isActive: false,
      MultiSelectProduct: [],
      openVendorModal: false,
      rowValues: "",
      setBrand: "",
      paymentRowValues: "",
      setCategory: "",
      contactId: "",
      ContactName: "",
      rowValue: "",
      AddressOpen: false,
      paymentOpen: false,
      isSubmitting: true,
      openDeleteModal: false,
      details: "",
      row: false,
      dueDate: "",
      isDeleteModel: false,
      address: false,
      setAddressId: false,
      selectedOption: "",
      selectedCountryName: "",
      selectedCountryId: "",
      SelectedTitle: "",
      DeleteContactModal: false,
      isLoadings: false,
      editorState: EditorState.createEmpty(),
      isEditable: true,
      openDeleteModals: false,
      selectedProduct: ""
    };
  }

  pathName = this?.props?.history?.location?.pathname.replace(/\/\d+$/, "");

  sortByOption = [
    {
      value: "name:ASC",
      label: "Name"
    },
    {
      value: "id:DESC",
      label: "Most Recent"
    }
  ];

  purchaseSortOption = [
    {
      value: "purchase_date:DESC",
      label: "Most Recent"
    }
  ];

  purchaseOrderSortByOptions = [
    {
      value: "id:DESC",
      label: "Most Recent"
    },
    {
      value: "date:ASC",
      label: "Date"
    }
  ];

  componentDidMount() {
    this.getVendor();
  }

  showHistory = hasPermission(Permission.VENDOR_HISTORY_VIEW);
  showEditButton = hasPermission(Permission.VENDOR_EDIT);

  handleToggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  handleEditorChange = (editorState) => {
    this.setState({ editorState: editorState });
  };
  

  closeDeleteModal = () => {
    this.setState({ openDeleteModals: !this.state.openDeleteModals });
  };
 
  // Get Project Supplier Details
  getVendor = async () => {
    try {
      this.setState({ isLoading: true });
      const vendorDetails = await AccountService.getVendor(
        this.state.vendorById
      );
      this.setState({
        vendorDetails: vendorDetails,
        editorState: vendorDetails?.data?.notes
          ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(vendorDetails?.data?.notes))
          )
          : "",
        isLoading: false
      });
    } catch (err) {
      this.setState({ isLoading: false });

      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // User delete action handler
  handleDelete = async () => {
    try {
      const vendor_id = this.state.vendorById;
      const data = await AccountService.deleteVendor(vendor_id);
      this.props.history.push(this.pathName == "/accounts" ? "/accounts" : "/vendor");
      toast.success(data.message);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };
  

  DeleteAccountProduct = async () => {
    const product_id = this.state.selectedProduct.id;
    this.props.actions.dispatch(
      await deleteVendorProduct(product_id, null, null, null, (res) => {
        if (res) {
          this.props.actions.dispatch(
            fetchList(
              "vendorProduct",
              `${endpoints().vendorProductAPI}/search`,
              1,
              25,
              {
                vendor_id: this.state.vendorById,
                sort: Url.GetParam("sort"),
                sortDir: Url.GetParam("sortDir")
              }
            )
          );
        }
      })
    );
  };

  // Contact delete Function
  handleContactDelete = async () => {
    let params = {
      vendor_id: this.props.match.params.id,
      pagination: true,
      object_id: Url.GetParam("object_id")
    };
    this.props.actions.dispatch(
      await ContactService.del(this.state.contactId, params, (res) => {
        if (res) {
          this.setState({ isLoadings: true });
        }
      })
    );
  };

  // trim white space
  _trim = (data) => {
    let trimmedData = "";
    if (!data.trim()) {
      trimmedData = data && data.replace(/[^+\d]+/g, "");
    }
    return trimmedData;
  };

  // Handle Vendor form submit
  _handleSubmit = async (values) => {
    let rawComment;
    if (this.state.editorState) {
      rawComment = convertToRaw(this.state.editorState.getCurrentContent());
    }
    values.gst_number = values.gst_number ? values.gst_number : "";
    values.payment_account = values?.payment_account?.value
      ? values?.payment_account?.value
      : "";
    const newValues = Object.assign({}, values);
    newValues.status = this.state.status
      ? this.state.status
      : typeof newValues.status === "object"
        ? newValues.status.value
        : newValues.status;

    newValues.country =
      values.country && values.country.label ? values.country.label : "";
    newValues.state =
      values.stateName && values.stateName.label ? values.stateName.label : "";
    newValues.type = values.type && values.type.value ? values.type.value : "";
    newValues.notes = JSON.stringify(rawComment)
      ? JSON.stringify(rawComment)
      : "";

    try {
      const { submitResponse } = this.state;
      this.setState({ submitResponse: !submitResponse });
      const response = await AccountService.updateVendor(
        this.state.vendorById,
        newValues
      );
      toast.success(response.message);
      this.getVendor();
      this.setState({ submitResponse: false });
      this.setState({ isEditable: true });
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
      this.setState({ submitResponse: false });
    }
  };

  // Toggle tab
  toggle = (tab) => {
    this.setState({ activeTab: tab });
    this.props.history.push(`${this.props.match.params.id}?tab=${tab}`);
  };

  handleStatusChange = (selectStatus) => {
    if (selectStatus) {
      this.setState({ status: selectStatus });
      const id = this.props.match.params.id;

      this.updateVendorStatus(id, selectStatus, {});
    }
  };
  updateVendorStatus = (id, status) => {
    let data = {};
    data.status = status;
    return apiClient
      .put(`${endpoints().accountAPI}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
        }
      });
  };

  addProductToggle = () => {
    this.setState({ addProductModal: false, rowValue: "" });
    this.setState({ MultiSelectProduct: [] });
    this.setState({ productName: "" });
    this.setState({ openVendorModal: false });
    this.setState({ addContactModal: false, rowValue: "" });
    this.setState({ rowValue: "" });
  };

  addContactToggle = () => {
    this.setState({ addContactModal: false, rowValue: "" });
    this.setState({ addContactForm: true, rowValue: "" });
  };

  multiselect = (values) => {
    this.setState({ MultiSelectProduct: values });
  };

  handleSubmit = async (values) => {
    const createDate = new FormData();
    createDate.append("productIds", this.state.MultiSelectProduct);
    createDate.append("vendorId", this.props.match.params.id);
    let params = {
      accountId: this.props.match.params.id,
      sort: "name",
      sortDir: "ASC"
    };

    this.props.actions.dispatch(
      await AccountProductService.create(createDate, (res) => {
        if (res) {
          this.addProductToggle()
          this.props.actions.dispatch(
            fetchList(
              "vendorProduct",
              `${endpoints().accountProductAPI}/search`,
              1,
              25,
              params
            )
          );
        }
      })
    );
    this.setState({ addProductModal: false, rowValue: "" });
  };

  // Contact add function
  handleContact = async (values) => {
    const createData = new FormData();
    let id = this.state.rowValue.id;
    if (!id) {
      createData.append(
        "first_name",
        values.first_name ? values.first_name : ""
      );
      createData.append("last_name", values.last_name ? values.last_name : "");
      createData.append("email", values.email ? values.email : "");
      createData.append("mobile", values.mobile ? values.mobile : "");
      createData.append(
        "designation",
        values.designation ? values.designation : ""
      );

      createData.append(
        "work_phone",
        values.work_phone ? values.work_phone : ""
      );

      createData.append("object_name", ObjectName.VENDOR);
      createData.append(
        "vendor_id",
        this.props.match.params.id ? this.props.match.params.id : ""
      );
      let params = {
        object_id: this.props.match.params.id,
        pagination: true,
        sort: "id",
        sortDir: "DESC"
      };

      this.props.actions.dispatch(
        await ContactService.create(
          createData,
          params,
          this.addProductToggle,
          (res) => {
            if (res) {
              this.setState({ isLoadings: true });
            }
          }
        )
      );
    } else {
      createData.append(
        "first_name",
        values.first_name ? values.first_name : ""
      );
      createData.append("last_name", values.last_name ? values.last_name : "");
      createData.append("email", values.email ? values.email : "");
      createData.append("mobile", values.mobile ? values.mobile : "");
      createData.append(
        "designation",
        values.designation ? values.designation : ""
      );

      createData.append(
        "work_phone",
        values.work_phone ? values.work_phone : ""
      );
      createData.append("object_name", ObjectName.VENDOR);
      createData.append("id", this.state.rowValue.id);
      createData.append(
        "vendor_id",
        this.props.match.params.id ? this.props.match.params.id : ""
      );
    }
    let params = { object_id: this.props.match.params.id, pagination: true };
    this.props.actions.dispatch(
      await ContactService.update(
        id,
        createData,
        params,
        this.addProductToggle,
        (res) => {
          if (res) {
            this.setState({ isEditable: true });
            this.setState({ isLoadings: true });
          }
        }
      )
    );
  };

  addProductForm = (
    <ProductList
      vendorId={this.props.match.params.id}
      MultiSelectProduct={this.multiselect}
      history={this.props.history}
    />
  );

  productFooter = (
    <Button
      label="Add Products"
      className="h6-5-important"
      onClick={(values) => {
        this.handleSubmit(values);
      }}
    />
  );

  // Add and edit Contact Modal Form
  addContactForm = (<AddContact />);

  updateVendor = (values) => {
    const id = this.state.rowValues.id;
    const value = this.state.rowValues;
    const data = new FormData();
    data.append("price", Currency.Get(values.price));
    data.append("vendor_url", values.vendor_url);
    data.append("product_id", value?.product_id);
    data.append("vendor_id", value?.vendor_id ? value?.vendor_id : "");
    this.props.actions.updateVendorProduct(
      id,
      data,
      {
        vendor_id: value?.vendor_id,
        pagination: true,
        vendor_id: value?.vendor_id,
        pagination: true,
        ActiveCurrentPage: this.props.ActiveCurrentPage,
        ActiveCurrentPageSize: this.props.ActiveCurrentPageSize,
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir")
      },
      this.setState({
        isEditable: true
      }),
      this.addProductToggle
    );
  };

  setRow = (e) => {
    this.setState({ row: e ? e : "" });
  };

  setTitle = (e) => {
    let value = e;
    this.setState({ SelectedTitle: value });
  };

  AddressSelectModal = () => {
    this.setState({ AddressOpen: !this.state.AddressOpen });
    this.setState({ setRow: "" });
    this.setRow("");
  };

  handleOpenModal = () => {
    this.setState({ paymentOpen: !this.state.paymentOpen });

  };
  closepaymentDeleteModal = () => {
    this.setState({ openDeleteModal: !this.state.openDeleteModal })
  };
  paymentsDelete = async () => {
    this.props.actions.dispatch(await PaymentService.delete(this.state.paymentRowValues?.id, this.props.history));
    this.closepaymentDeleteModal()
  };
  handleCloseModal = () => {
    this.setState({ paymentOpen: !this.state.paymentOpen });
    this.setState({ paymentRowValues: "" })
    this.setState({ details: "" })
    this.setState({ isSubmitting: this.state.isSubmitting });
  };

  toggles = () => {
    this.setState({ AddressOpen: !this.state.paymentOpen });
    this.setState({ dueDate: "" });
  };

  EditModal = (id) => {
    this.setState({ AddressOpen: !this.state.AddressOpen });
  };

  addressHandleSubmit = async (values) => {
    const vendor_id = this.state.vendorById;
    const data = new FormData();
    if (!this.state.row?.id) {
      data.append("name", values && values.name ? values.name : "");
      data.append(
        "phone_number",
        values && values.phone_number ? values.phone_number : ""
      );
      data.append("address1", values && values.address1 ? values.address1 : "");
      data.append("title", values && values.title ? values.title : "");
      data.append("address2", values && values.address2 ? values.address2 : "");
      data.append("pin_code", values && values.pin_code ? values.pin_code : "");
      data.append(
        "country",
        values && values.country.value ? values.country.value : ""
      );
      data.append("state", values && values.state ? values.state.value : "");
      data.append("city", values && values.city ? values.city : "");
      data.append("vendor_id", this.state.vendorById);
      data.append(
        "gst_number",
        values && values.gst_number ? values.gst_number : ""
      );
      const type = this.state.vendorDetails?.data?.type;
      data.append("object_name", type)

      data.append("latitude", values && values.latitude ? values.latitude : "");
      data.append(
        "longitude",
        values && values.longitude ? values.longitude : ""
      );
      let params = {
        object_id: vendor_id,
        objectName: this.state.vendorDetails?.data?.type == Account.TYPE_CUSTOMER ? ObjectName.CUSTOMER : this.state.vendorDetails?.data?.type == Account.TYPE_VENDOR ? ObjectName.VENDOR : this.state.vendorDetails?.data?.type == Account.TYPE_EMPLOYEE ? ObjectName.EMPLOYEE : ""
      };
      this.props.actions.dispatch(
        AddressService.add(data, params, this.AddressSelectModal)
      );
    } else {
      data.append("name", values && values.name ? values.name : "");
      data.append(
        "phone_number",
        values && values.phone_number ? values.phone_number : ""
      );
      data.append("address1", values && values.address1 ? values.address1 : "");
      data.append("title", values && values.title ? values.title : "");
      data.append("address2", values && values.address2 ? values.address2 : "");
      data.append("pin_code", values && String.Get(values.pin_code));
      data.append(
        "country",
        values && values.country.value ? values.country.value : ""
      );
      data.append("state", values && values.state ? values.state.value : "");
      data.append("city", values && values.city ? values.city : "");
      data.append(
        "gst_number",
        values && values.gst_number ? values.gst_number : ""
      );
      data.append("latitude", values && values.latitude ? values.latitude : "");
      data.append(
        "longitude",
        values && values.longitude ? values.longitude : ""
      );
      data.append("id", this.state.row?.id);
      let params = {
        object_id: vendor_id,
        objectName: this.state.vendorDetails?.data?.type == Account.TYPE_CUSTOMER ? ObjectName.CUSTOMER : this.state.vendorDetails?.data?.type == Account.TYPE_VENDOR ? ObjectName.VENDOR : this.state.vendorDetails?.data?.type == Account.TYPE_EMPLOYEE ? ObjectName.EMPLOYEE : ""

      };
      this.setState({ isEditable: true });
      this.props.actions.dispatch(
        await AddressService.update(
          this.state.row?.id,
          data,
          params,
          this.AddressSelectModal
        )
      );
      this.setRow("");
    }
  };

  setAddress = (e) => {
    this.setState({ address: e });
  };

  setIsDeleteModel = (e) => {
    this.setState({ isDeleteModel: e });
  };

  hanldeDelete = async () => {
    const vendor_id = this.state.vendorById;
    this.props.actions.dispatch(
      await AddressService.Delete(this.state.setAddressId, {
        pagination: true,
        search: Url.GetParam("search"),
        page: Url.GetParam("page"),
        pageSize: Url.GetParam("pageSize"),
        object_id: vendor_id,
        objectName: ObjectName.VENDOR,
        sort: "name",
        sortDir: "ASC"
      })
    );
    this.setState({ setIsDeleteMode: false });
  };

  setAddressId = (e) => {
    this.setState({ setAddressId: e });
  };

  handleCountryChange = (values) => {
    const selectedOption = values && values.id;
    const selectedCountryName = values && values.label;
    this.setState({ selectedOption: selectedOption });
    this.setState({ selectedCountryName: selectedCountryName });
  };

  // Get contact add modal contactList from props
  setAddContactModal = (e) => {
    this.setState({ addContactModal: e });
  };

  setRowValue = (e) => {
    this.setState({ rowValue: e });
  };

  setPaymentRowValue = (e) => {
    this.setState({ paymentRowValues: e });
  };

  // Get Delete Modal from contactList props
  setDeleteContactModal = (e) => {
    this.setState({ DeleteContactModal: e });
  };

  // Get Row Values from contactList props
  setContactRow = (e) => {
    this.setState({ ContactName: e.name, contactId: e.id });
  };

  render() {
    const vendorId = this.state.rowValues.id;
    const updateProductForm = (
      <div className="text-break">
        <ProductCard
          productImageIcon
          square
          productName={this.state.rowValues.name}
          url={this.state.rowValues.image}
          brandName={this.state.rowValues.brand_name}
          salePrice={this.state.rowValues.sale_price}
          mrp={this.state.rowValues.mrp}
        />
        <Text name="vendor_url" label="Vendor Product Url" />
        <Number label="Price" name="price" />
      </div>
    );

    const addContactFooter = (
      <Button
        type="submit"
        label={this.state?.rowValue?.id ? "Update" : "Add"}
        className="h6-5-important"></Button>
    );

    const updateProductFooter = (
      <div>
        <Button type="submit" label="Update" className="h6-5-important" />
      </div>
    );

    const initialValues = {
      price: this.state.rowValues?.cost ? this.state.rowValues?.cost : "",
      vendor_url: this.state.rowValues?.vendor_url
        ? this.state.rowValues?.vendor_url
        : ""
    };

    const initialData = {
      name:
        this.state.value &&
        this.state.Address &&
        this.state.Address.length > 0 &&
        this.state.Address.find(
          (data) => data?.value == this.state.value?.category_id
        ),
      points: this.state.value
        ? {
          label: this.state.value?.points,
          value: this.state.value?.points
        }
        : ""
    };

    // Vendor Status Options
    const contactTypes = [
      {
        value: 1,
        label: "Company"
      },
      {
        value: 2,
        label: "Vendor"
      },
      {
        value: 3,
        label: "Customer"
      }
    ];

    // Vendor Status Options
    const StatusOptions = [
      {
        value: 1,
        label: "Active"
      },
      {
        value: 2,
        label: "InActive"
      }
    ];

    // Contact add InitialValues
    const initialValue = {
      first_name: this.state.rowValue.first_name || "",
      last_name: this.state.rowValue.last_name || "",
      email: this.state.rowValue.email || "",
      mobile: this.state.rowValue.mobile || "",
      work_phone: this.state.rowValue.work_phone || "",
      designation: this.state.rowValue.designation || "",
      type: {
        label: this.state.rowValue.object_name,
        value: this.state.rowValue.object_name
      },
      status: StatusOptions.find(
        (Data) => Data.value == this.state.rowValue.status_id
      )
    };

    const { vendorDetails, isLoading } = this.state;

    const { history } = this.props;

    const statusOptions =
      vendorDetails && vendorDetails.data.status == "InActive"
        ? [
          {
            value: "Active",
            label: "Active"
          }
        ]
        : vendorDetails && vendorDetails.data.status == "Active"
          ? [
            {
              value: "InActive",
              label: "InActive"
            }
          ]
          : [];

    if (isLoading) {
      return "";
    }

    const id = this.props.match.params.id;
    const { openDeleteModal, deleteModal, activeTab, DeleteContactModal } =
      this.state;
    this.breadcrumbList = [
      { label: "Home", link: "/locationDashboard" },
      {
        label:
          this.pathName == "/accounts"
            ? "Accounts"
            : this.pathName == "/customers"
              ? "Customers"
              : "Vendors",
        link: this.pathName
      },
      {
        label: activeTab,
        link: ""
      }
    ];

    const addressInitialValues = {
      name: this.state.row.name ? this.state.row.name : "",
      title: this.state.row.title || "",
      address1: this.state.row.address1 || "",
      address2: this.state.row.address2 || "",
      phone_number: this.state.row.phone_number || "",
      city: this.state.row.city || "",
      state: {
        label: this.state.row?.state ? this.state.row?.state : "",
        value: this.state.row?.state ? this.state.row?.state : ""
      },
      country: {
        label: this.state.row?.country ? this.state.row?.country : "",
        value: this.state.row?.country ? this.state.row?.country : ""
      },
      pin_code: this.state.row.pin_code || "",
      gst_number: this?.state?.row?.gst_number || "",
      longitude: this?.state?.row?.longitude || "",
      latitude: this?.state?.row?.latitude || ""
    };

    const productOnClick = () => {
      this.setState({ addProductModal: true });
      this.props.history.push(`${this.props.match.params.id}`);
    };

    const actionsMenuList = [
      {
        value: "delete",
        label: "Delete"
      }
    ];

    const actionsMenuLists = [
      {
        value: "deletes",
        label: "Delete"
      }
    ];

    if (activeTab === Tabs.PRODUCT_TAB) {
      actionsMenuList.push({
        value: Account.UPDATE_PRODUCTS_FROM_PURCHASE,
        label: Account.UPDATE_PRODUCTS_FROM_PURCHASE
      });
    }

    const handleCreate = async () => {
      const account_id = this.state.vendorById;
      let data = { account_id: account_id };

      this.props.actions.dispatch(
        await PurchaseOrderService.createPurchaseOrder(data, {}, () => { })
      );
    };

    const handleUpdateProducts = async () => {
      const account_id = this.state.vendorById;
      let data = { account_id: account_id };

      this.props.actions.dispatch(
        await AccountProductService.updateProduct(data, () => { })
      );
    };

    const handleActionChange = (e) => {
      if (e == "delete") {
        this.setState({ deleteModal: true });
      }
      if (e == "deletes") {
        this.setState({ openDeleteModal: true });
      }
      if (e == Account.UPDATE_PRODUCTS_FROM_PURCHASE) {
        handleUpdateProducts();
      }
    };

    const toggleModelClose = () => {
      this.setState({ isOpen: false });
      this.setState({ isSubmit: true });
      this.setState({ value: "" });
    };

    const toggle = () => {
      this.setState({ isOpen: true });
      this.setState({ isSubmit: true });
    };

    const handleCategoryChange = (e) => {
      let value = e.id;
      this.setState({ category: value });
    };

    const onPointsChange = (e) => {
      let value = e.id;
      this.setState({ points: value });
    };

    const gatePassForm = (
      <AccountLoyaltyForm
        rowValue={this.state.value}
        onAccountChange={handleCategoryChange}
        onPointsChange={onPointsChange}
        addressValue={(e) => this.setState({ Address: e })}
      />
    );

    const handleUpdate = async (values) => {
      const data = new FormData();
      const account_id = this.state.vendorById;
      data.append("category_id", values?.name?.value);
      data.append("account_id", account_id);
      data.append("points", values?.points?.value);
      try {
        this.props.actions.dispatch(
          await AccountLoyaltyService.update(
            this.state.value?.id ? this.state.value?.id : id,
            data,
            (res) => {
              if (res) {
                toggleModelClose();
                this.props.actions.dispatch(
                  fetchList(
                    "accountLoyalty",
                    `${endpoints().accountLoyalty}/search`,
                    1,
                    25,
                    {
                      account_id: id
                    }
                  )
                );
              }
            }
          )
        );
      } catch (err) { }
    };

    const handleSubmit = async (values) => {
      const data = new FormData();
      const account_id = this.state.vendorById;
      data.append("category_id", values?.name?.value);
      data.append("account_id", account_id);
      data.append("points", values?.points?.value);
      try {
        this.props.actions.dispatch(
          AccountLoyaltyService.add(data, (res) => {
            if (res) {
              toggleModelClose();
              this.props.actions.dispatch(
                fetchList(
                  "accountLoyalty",
                  `${endpoints().accountLoyalty}/search`,
                  1,
                  25,
                  {
                    account_id: id
                  }
                )
              );
              toggleModelClose();
            }
            toggleModelClose();
          })
        );
      } catch (err) { }
    };

    const handledelete = () => {
      try {
        this.props.actions.dispatch(
          AccountLoyaltyService.delete(this.state.data.id, (res) => {
            if (res) {
              toggleModelClose();
              this.props.actions.dispatch(
                fetchList(
                  "accountLoyalty",
                  `${endpoints().accountLoyalty}/search`,
                  1,
                  25,
                  {
                    account_id: id
                  }
                )
              );
            }
          })
        );
      } catch (err) { }
    };

    const gatePassFooter = (
      <SaveButton
        type="submit"
        loading={this.state.isSubmit == false}
        label={this.state.value?.id ? "Save" : "Add"}
        className="h6-5-important"
      />
    );

    return (
      <>
        <DeleteModal
          isOpen={this.state.openDeleteModals}
          label={this.state.selectedProduct.name}
          toggle={this.closeDeleteModal}
          title="Delete Acount Product"
          deleteFunction={this.DeleteAccountProduct}
        />
        <ProductSelectModal
          modalOpen={this.state.addProductModal}
          toggle={this.handleToggle}
          toggleModalClose={this.addProductToggle}
          BulkSelect={this.multiselect}
          history={history}
          handleSubmit={this.handleSubmit}
          apiURL={`${endpoints().accountAPI}/productList/search`}
          params={{ id: this.props.match.params.id }}
          showBrandFilter
          showCategoryFilter
        />

        <Drawer
          handleOpenModal={toggle}
          handleCloseModal={toggleModelClose}
          handleDrawerClose={toggleModelClose}
          isModalOpen={this.state.isOpen}
          enableReinitialize
          initialValues={initialData}
          DrawerBody={gatePassForm}
          DrawerFooter={gatePassFooter}
          modelTitle={this.state.value?.id ? "Edit Loyalty" : "Add Loyalty"}
          onSubmit={(values) => {
            if (this.state.value?.id) {
              handleUpdate(values);
            } else {
              handleSubmit(values);
            }
          }}
        />
        <Drawer
          modelTitle="Edit Vendor Product"
          DrawerBody={updateProductForm}
          DrawerFooter={updateProductFooter}
          onSubmit={(values) => this.updateVendor(values)}
          initialValues={initialValues}
          enableReinitialize
          handleOpenModal={this.handleToggle}
          handleCloseModal={this.addProductToggle}
          handleDrawerClose={this.handleToggle}
          isModalOpen={this.state.openVendorModal}
        />
        {/* contact add modal */}
        <AddModal
          initialValues={initialValue}
          isOpen={this.state.addContactModal}
          toggle={this.handleToggle}
          toggleModalClose={this.addContactToggle}
          modalTitle={`${this.state.rowValue.id ? "Edit Contact" : "Add Contact"
            }`}
          modalBody={this.addContactForm}
          modalFooter={addContactFooter}
          onSubmit={(values) => this.handleContact(values)}
          hideDefaultButtons
        />

        <DeleteModal
          isOpen={deleteModal}
          title="Delete Vendor"
          label={vendorDetails && vendorDetails?.data?.vendorName}
          toggle={() => {
            this.setState({ deleteModal: false });
          }}
          deleteFunction={() => this.handleDelete(vendorDetails.id)}
        />
        <BreadCrumb list={this.breadcrumbList} />
        <div className="d-flex justify-content-between">
          <PageTitle
            label={Customer.GetDisplayName(vendorDetails?.data?.vendorName)}
          />
          <div className="d-flex">
            {activeTab == Tabs.PRODUCT_TAB ? (
              <>
                <AddButton
                  label={"Add Product"}
                  onClick={productOnClick}
                  className="mt-1"
                />

                <div>
                  <Action
                    dropdownLinks={actionsMenuList}
                    handleChange={handleActionChange}
                  />
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center">
                {/* Contact active Button */}
                <div className="">
                  {activeTab == Tabs.CONTACTS_TAB ? (
                    <>
                      <div>
                        <AddButton
                          label="Add Contact"
                          onClick={() =>
                            this.setState({ addContactModal: true })
                          }
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {activeTab == Tabs.PAYMENT_TAB && (
                    <div >
                      <AddButton
                        className="pull-right"
                        label={"Add Payment"}
                        onClick={this.handleOpenModal}
                      />
                    </div>
                  )}

                  {activeTab == Tabs.ADDRESS_TAB && (
                    <AddButton label="Add" onClick={this.AddressSelectModal} />
                  )}
                </div>
                <div>
                  {activeTab == Tabs.LOYALTY_TAB && (
                    <>
                      <AddButton label={"Add"} onClick={toggle} />
                      <DeleteModal
                        isOpen={this.state.delete}
                        toggle={() => {
                          this.setState({ delete: false });
                        }}
                        title="Delete Loyalty"
                        id={this.state.data?.id}
                        label={this.state.data?.name}
                        deleteFunction={handledelete}
                      />
                    </>
                  )}
                </div>
                {activeTab == Tabs.PURCHASE_ORDER_TAB && (
                  <AddButton
                    label={PurchaseOrder.CREATE_PURCHASE_ORDER}
                    onClick={() => {
                      handleCreate()
                    }}
                  />
                )}
                {this.showEditButton && this.state.isEditable && activeTab == Tabs.VENDOR_GENERAL_TAB && (
                  <Button
                    label="Edit"
                    className="mr-1"
                    onClick={() => {
                      this.setState({
                        isEditable: false
                      });
                    }}
                  />
                )}
                <Action
                  dropdownLinks={actionsMenuLists}
                  handleChange={handleActionChange}
                />
              </div>
            )}
          </div>
          {/* Contact delete modal */}
          <DeleteModal
            isOpen={DeleteContactModal}
            title="Delete Contact"
            label={this.state.ContactName}
            toggle={() => {
              this.setState({ DeleteContactModal: false });
            }}
            deleteFunction={this.handleContactDelete}
          />
        </div>
        {activeTab == Tabs.PRODUCT_TAB ? (
          <DeleteModal
            isOpen={deleteModal}
            title="Delete Vendor"
            label={vendorDetails && vendorDetails?.data?.vendorName}
            toggle={() => {
              this.setState({ deleteModal: false });
            }}
            deleteFunction={() => this.handleDelete(vendorDetails.id)}
          />
        ) : (
          <DeleteModal
            isOpen={openDeleteModal}
            title="Delete Vendor"
            label={vendorDetails && vendorDetails?.data?.vendorName}
            toggle={() => {
              this.setState({ openDeleteModal: false });
            }}
            deleteFunction={() => this.handleDelete(vendorDetails.id)}
          />
        )}

        <DeleteModal
          isOpen={this.state.isDeleteModel}
          toggle={() => {
            this.setState({ isDeleteModel: false });
          }}
          title="Delete Address"
          label={this.state.SelectedTitle}
          deleteFunction={this.hanldeDelete}
        />

        {/* Product edit form */}
        <Nav tabs className="admin-tabs">
          {/* <NavItem>
            <NavLink
              className={classnames({
                active: activeTab == VENDOR_GENERAL_TAB,
              })}
              onClick={() => {
                this.toggle(VENDOR_GENERAL_TAB);
              }}
            >
              {VENDOR_GENERAL_TAB}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab == ADDRESS_TAB,
              })}
              onClick={() => {
                this.toggle(ADDRESS_TAB);
              }}
            >
              {ADDRESS_TAB}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab ==CONTACTS_TAB,
              })}
              onClick={() => {
                this.toggle(CONTACTS_TAB);
              }}
            >
              {CONTACTS_TAB}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab == PRODUCT_TAB,
              })}
              onClick={() => {
                this.toggle(PRODUCT_TAB);
              }}
            >
              {PRODUCT_TAB}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab == PURCHASE_ORDER_TAB,
              })}
              onClick={() => {
                this.toggle(PURCHASE_ORDER_TAB);
              }}
            >
              {PURCHASE_ORDER_TAB}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab == PURCHASE_TAB,
              })}
              onClick={() => {
                this.toggle(PURCHASE_TAB);
              }}
            >
              {PURCHASE_TAB}
            </NavLink>
          </NavItem>
          
          <NavItem>
            {this.showHistory && <NavLink
              className={classnames({
                active: activeTab == HISTORY_TAB,
              })}
              onClick={() => {
                this.toggle(HISTORY_TAB);
              }}
            >
              {HISTORY_TAB}
            </NavLink>}
          </NavItem> */}
          <Tab
            name={Tabs.VENDOR_GENERAL_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.BILLS}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.ADDRESS_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.CONTACTS_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.PRODUCT_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.PURCHASE_ORDER_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />

          <Tab
            name={Tabs.PURCHASE_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.CUSTOMFIELDS}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.LOYALTY_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.PAYMENT_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
          <Tab
            name={Tabs.HISTORY_TAB}
            active={activeTab}
            handleChange={(e) => this.toggle(e)}
            toggle={this.toggle}
          />
        </Nav>

        {/* tab contents */}
        <TabContent activeTab={activeTab}>
          {activeTab === Tabs.VENDOR_GENERAL_TAB && (
            <TabPane tabId={Tabs.VENDOR_GENERAL_TAB}>
              <General
                vendorDetails={vendorDetails}
                getVendor={this.getVendor}
                handleDelete={this.handleDelete}
                handleSubmit={this._handleSubmit}
                history={history}
                editorState={this.state.editorState}
                handleEditorChange={this.handleEditorChange}
                editable={this.state.isEditable}
              />
            </TabPane>
          )}

          {activeTab === Tabs.CONTACTS_TAB && (
            <TabPane tabId={Tabs.CONTACTS_TAB}>
              <ContactList
                setAddContactModal={this.setAddContactModal}
                setRowValue={this.setRowValue}
                setDeleteContactModal={this.setDeleteContactModal}
                setRow={this.setContactRow}
                object_id={this.state.vendorById}
                history={history}
                props={this.props}
                contactsTab={Tabs.CONTACTS_TAB}
                showSearch
                isLoadings={this.state.isLoadings}
                setIsLoadings={(res) => this.setState({ isLoadings: res })}
                editable={this.state.isEditable}
              />
            </TabPane>
          )}

          {activeTab === Tabs.PRODUCT_TAB && (
            <TabPane tabId={Tabs.PRODUCT_TAB}>
              <AccountProductList history={history} accountId={this.state.vendorById} />
            </TabPane>
          )}
          {activeTab === Tabs.BILLS && (
            <TabPane tabId={Tabs.BILLS}>
              <BillTab history={history} account_id={this.state.vendorById} />
            </TabPane>
          )}
          {activeTab === Tabs.PURCHASE_TAB && (
            <TabPane tabId={Tabs.PURCHASE_TAB} className="w-100">
              <PurchaseList
                id={"purchase"}
                apiURL={`${endpoints().purchaseAPI}/search`}
                params={{ vendor: this.state.vendorById }}
                showPurchaseNumber
                dateField="purchaseDate"
                dateSort="purchase_date"
                sortByOptions={this.purchaseSortOption}
                history={this.props.history}
                totalAmount
              />
            </TabPane>
          )}
          {activeTab == Tabs.PAYMENT_TAB && (
            <TabPane tabId={Tabs.PAYMENT_TAB}>
              {/* Image List Table Component */}
              <DeleteModal
                isOpen={openDeleteModal}
                label={this.state.paymentRowValues.id}
                toggle={this.closepaymentDeleteModal}
                title="Delete Payment"
                deleteFunction={this.paymentsDelete}
              />
              <PaymentList
                paymentTab
                isOpen={this.state.paymentOpen}
                toggles={this.handleOpenModal}
                setRowValue={this.setPaymentRowValue}
                rowValue={this.state.paymentRowValues}
                handleCloseModal={this.handleCloseModal}
                isSubmitting={this.state.isSubmitting}
                setIsSubmitting={(res) => this.setState({ isSumbitting: res })}
                setDetail={(res) => this.setState({ details: res })}
                detail={this.state.details}
                params={{
                  account: this?.props?.match?.params?.id
                }}
                notesValue={this.state.details?.notes}
                showLoggedInUser
                history={history}
                setOpenDeleteModal={(res) => this.setState({ openDeleteModal: res })}

              />
            </TabPane>
          )}
          {activeTab === Tabs.PURCHASE_ORDER_TAB && (
            <TabPane tabId={Tabs.PURCHASE_ORDER_TAB} className="w-100">
              <PurchaseOrdersList
                id={"purchaseOrder"}
                apiURL={`${endpoints().purchaseOrderAPI}/search`}
                params={{ vendor: this.state.vendorById }}
                showPurchaseOrderNumber
                dateField="date"
                dateSort="date"
                sortByOptions={this.purchaseOrderSortByOptions}
                history={this.props.history}
                objectName={ObjectName.PURCHASE_ORDER}
                showStatus
              />
            </TabPane>
          )}
          {activeTab === Tabs.ADDRESS_TAB && (
            <TabPane tabId={Tabs.ADDRESS_TAB} className="w-100">
              <AddressDetailTab
                initialValue={addressInitialValues}
                selectedOption={this.state.selectedOption}
                selectedCountryId={this.state.selectedCountryId}
                selectedCountryName={this.state.selectedCountryName}
                handleCountryChange={this.handleCountryChange}
                AddressOpen={this.state.AddressOpen}
                AddressSelectModal={this.AddressSelectModal}
                handleSubmit={this.addressHandleSubmit}
                setIsDeleteModel={this.setIsDeleteModel}
                setAddressId={this.setAddressId}
                setAddress={this.setAddress}
                EditModal={this.EditModal}
                history={this.props.history}
                setRow={this.setRow}
                setTitle={this.setTitle}
                id={this.state.row.id}
                object_id={this.state.vendorById}
                objectName={vendorDetails?.data?.type == Account.TYPE_CUSTOMER
                  ? ObjectName.CUSTOMER
                  : vendorDetails?.data?.type == Account.TYPE_VENDOR
                    ? ObjectName.VENDOR
                    : vendorDetails?.data?.type == Account.TYPE_EMPLOYEE
                      ? ObjectName.EMPLOYEE
                      : ""}

                showSearch
                editable={this.state.isEditable}
              />
            </TabPane>
          )}
          {activeTab === Tabs.CUSTOMFIELDS && (
            <TabPane tabId={Tabs.CUSTOMFIELDS} className="w-100">
              <CustomForm
                objectName={ObjectName.ACCOUNT}
                objectId={this.props.match.params.id}
              />
            </TabPane>
          )}
          {activeTab === Tabs.LOYALTY_TAB && (
            <TabPane tabId={Tabs.LOYALTY_TAB} className="w-100">
              <ReduxTable
                id="accountLoyalty"
                showHeader
                newTableHeading
                searchPlaceholder="Search"
                apiURL={`${endpoints().accountLoyalty}/search`}
                history={this.props.history}
                paramsToUrl={true}
                sortByDropdown
                params={{ account_id: id }}
                showPageSize>
                <ReduxColumn
                  field="name"
                  sortBy="name"
                  renderField={(row) => (
                    <Link to={`/admin/settings/loyalty/${row.id}`}>
                      {row.name}
                    </Link>
                  )}>
                  Name
                </ReduxColumn>
                <ReduxColumn
                  field="points"
                  sortBy="points"
                  width="50px"
                  minWidth="50px"
                  maxWidth="50px"
                  className="text-center"
                  renderField={(row) => <Link>{row.points}</Link>}>
                  Points
                </ReduxColumn>
                <ReduxColumn
                  field="Action"
                  disableOnClick
                  renderField={(row) => (
                    <div className="text-center action-group-dropdown">
                      <MoreDropdown>
                        <DropdownItem
                          onClick={() => {
                            toggle();
                            this.setState({ value: row });
                          }}>
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          className="text-danger"
                          onClick={() => {
                            this.setState({ data: row });
                            this.setState({ delete: true });
                          }}>
                          Delete
                        </DropdownItem>
                      </MoreDropdown>
                    </div>
                  )}>
                  Action
                </ReduxColumn>
              </ReduxTable>
            </TabPane>
          )}
          {this.showHistory && activeTab === Tabs.HISTORY_TAB && (
            <TabPane tabId={Tabs.HISTORY_TAB} className="w-100">
              <ActivityList
                id={id}
                objectId={id}
                object_name={ObjectName.VENDOR}
                history={this.props.history}
              />
            </TabPane>
          )}
        </TabContent>
      </>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addProductVendor,
        updateVendorProduct,
        deleteVendorProduct,
        ContactService,
        dispatch
      },
      dispatch
    )
  };
}

const mapStateToProps = (state) => {
  const reduxTable = state.table;

  const ActiveCurrentPage =
    reduxTable["vendorProduct"] && !reduxTable["vendorProduct"].isFetching
      ? reduxTable["vendorProduct"].currentPage
      : 1;

  const ActiveCurrentPageSize =
    reduxTable["vendorProduct"] && !reduxTable["vendorProduct"].isFetching
      ? reduxTable["vendorProduct"].pageSize
      : 25;

  return {
    ActiveCurrentPage,
    ActiveCurrentPageSize
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(VendorDetails);
