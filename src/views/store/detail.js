import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

//Configs
import { apiClient } from "../../apiClient";

//Icons
import { endpoints } from "../../api/endPoints";
import Avatar from "../../components/Avatar";
import BreadCrumb from "../../components/Breadcrumb";
import DateSelector from "../../components/Date";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import PageTitle from "../../components/PageTitle";
import Password from "../../components/Password";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import Text from "../../components/Text";
import toast from "../../components/Toast";
import Currency from "../../lib/Currency";
import { isBadRequest } from "../../lib/Http";
import ShiftService from "../../services/ShiftService";

// Action
import { addTeam, deleteStore, updateStore, updateStoreStatus } from "../../actions/storeList";
import { addStore } from "../../actions/storeProductDetail";
import { fetchList } from "../../actions/table";
import AddButton from "../../components/AddButton";
import Button from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import AddModal from "../../components/Modal";
import { ProductStoreStatus } from "../../helpers/Product";
import * as Store from "../../helpers/Store";
import Team from "./components/Team";
import ProductTab from "./components/productTab";
import ProductList from "./components/storeProductList";
import ImageList from "../../components/MediaCarousel";
import QRCode from "qrcode.react";
import QRCodePrint from "./components/qrPrint";
import String from "../../lib/String";
import { bindActionCreators } from "redux";
import ActivityList from "../../components/ActivityList";
import CurrencyComponent from "../../components/Currency";
import IPAddress from "../../components/IpAddress";
import ProductSelectModal from "../../components/ProductSelectModal";
import UserSelect from "../../components/UserSelect";
import ObjectName from "../../helpers/ObjectName";
import { User } from "../../helpers/User";
import Url from "../../lib/Url";
import AddressService from "../../services/AddressService";
import ContactService from "../../services/ContactService";
import StoreProductService from "../../services/StoreProductService";
import StoreService from "../../services/StoreService";
import AddContact from "../contact/components/AddContact";
import ContactList from "../contact/components/ContactList";
import AddressDetailTab from "../portalDetail/AddressTab";
import Permission from "../../helpers/Permission";
import { hasPermission } from "../../services/UserRolePermissionService";
import Action from "../../components/Action";
import Drawer from "../../components/Drawer";
import SettingsTab from "./components/settingTab";
import { locationTypeOptions } from "../../helpers/locationTypes";
import { Link } from "react-router-dom";
import URL from "../../components/Url";

const StoreDetail = (props) => {
  const param = new URLSearchParams(props.history.location.search);
  const selectedTab = param.get("tab");

  const { history, CurrentPage, CurrentPageSize } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    selectedTab ? selectedTab : Store.GENERAL_TAB
  );
  const [productData, setProductData] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [shiftList, setShiftList] = useState("");
  const [usersList, setUsersList] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [selectedCountryName, setSelectedCountryName] = useState();
  const [selectedCountryId, setSeletedCountryId] = useState();
  const [addStoreModal, setAddProductModal] = useState(false);
  const [addTeamEntryModal, setAddTeamEntryModal] = useState(false);
  const [productName, setProductName] = useState([]);
  const [productsList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [MultiSelectProduct, setMultiSelectProduct] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [selectCountry, setSelectCountry] = useState(null);
  const [storeList, setStoreList] = useState([]);
  const [productIds, setProductIds] = useState([]);

  const [isAddressOpen, setIsAdressModelOpen] = useState(false);
  const [addressDetails, setAddressDetails] = useState();
  const [isAddressDeleteModel, setIsAddressDeleteModel] = useState(false);

  const [isContactModelOpen, setIsContactModelOpen] = useState(false);

  const [contactDetails, setContactDetails] = useState();
  const [isContactDeleteModel, setIsContactDeleteModel] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [status, setImageStatus] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("")

  let showHistory = hasPermission(Permission.LOCATION_HISTORY_VIEW);

  // Product id
  let productId = props.match.params.tab || productData.id;

  // Store id

  let storeId = props.match.params.tab;

  const dispatch = useDispatch();

  const statusOptions = [
    {
      value: Store.STATUS_ACTIVE_TEXT,
      label: "Active"
    },
    {
      value: Store.STATUS_INACTIVE_TEXT,
      label: "InActive"
    }
  ];

  useEffect(() => {
    getStoreDetail();
    getUserList();
    getShift();
    getCountryDetails();
    getStoreList();
  }, [props]);

  useEffect(() => {
    getProductDetail();
  }, [selectedProduct]);

  useEffect(() => {
    getproductId();
  }, [MultiSelectProduct]);

  const getStoreList = async () => {
    await StoreService.list((storeList) => setStoreList(storeList));
  };

  // contact tab
  const addContactToggle = () => {
    setIsContactModelOpen(!isContactModelOpen);
  };

  const editContactModel = (e) => {
    setIsContactModelOpen(e);
  };

  const handleContact = async (values) => {
    const createData = new FormData();
    let id = contactDetails?.id;
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

      createData.append("object_name", ObjectName.LOCATION);
      createData.append("store_id", storeId);
      let params = {
        object_id: storeId,
        pagination: true,
        sort: "id",
        sortDir: "DESC"
      };
      dispatch(
        await ContactService.create(
          createData,
          params,
          addContactToggle,
          setContactDetails
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
      createData.append("object_name", ObjectName.LOCATION);
      createData.append("id", contactDetails?.id);
      createData.append("store_id", storeId);
    }
    let params = { object_id: storeId, pagination: true };
    dispatch(
      await ContactService.update(
        id,
        createData,
        params,
        addContactToggle,
        setContactDetails
      )
    );
  };

  const initialValue = {
    first_name: contactDetails?.first_name ? contactDetails?.first_name : "",
    last_name: contactDetails?.last_name ? contactDetails?.last_name : "",
    email: contactDetails?.email ? contactDetails?.email : "",
    mobile: contactDetails?.mobile ? contactDetails?.mobile : "",
    work_phone: contactDetails?.work_phone ? contactDetails?.work_phone : "",
    designation: contactDetails?.designation ? contactDetails?.designation : ""
  };

  const handleContactDelete = async () => {
    let params = {
      vendor_id: storeId,
      pagination: true,
      object_id: storeId
    };
    dispatch(
      await ContactService.del(contactDetails?.id, params, setContactDetails)
    );
  };

  // adress tab
  const addressOpenToggle = () => {
    setIsAdressModelOpen(!isAddressOpen);
    setAddressDetails("");
  };
  const EditModal = () => {
    setIsAdressModelOpen(!isAddressOpen);
  };

  const addressInitialValues = {
    title: addressDetails?.title ? addressDetails?.title : "",
    name: addressDetails?.name ? addressDetails?.name : "",
    address1: addressDetails?.address1 ? addressDetails?.address1 : "",
    address2: addressDetails?.address2 ? addressDetails?.address2 : "",
    city: addressDetails?.city ? addressDetails?.city : "",
    gst_number: addressDetails?.gst_number ? addressDetails?.gst_number : "",
    pin_code: addressDetails?.pin_code ? addressDetails?.pin_code : "",
    phone_number: addressDetails?.phone_number
      ? addressDetails?.phone_number
      : "",
    state: {
      label: addressDetails?.state ? addressDetails?.state : "",
      value: addressDetails?.state ? addressDetails?.state : ""
    },
    country: {
      label: addressDetails?.country ? addressDetails?.country : "",
      value: addressDetails?.country ? addressDetails?.country : ""
    },
    latitude: latitude ? latitude : addressDetails?.latitude ? addressDetails?.latitude : "",
    longitude: longitude ? longitude : addressDetails?.longitude ? addressDetails?.longitude : ""
  };

  const handleAdressUpdate = async (values) => {
    const store_id = storeId;
    const data = new FormData();
    const addressId = addressDetails?.id;
    if (!addressId) {
      data.append("name", values && values.name ? values.name : "");
      data.append(
        "phone_number",
        values && values.phone_number ? values.phone_number : ""
      );
      data.append("address1", values && values.address1 ? values.address1 : "");
      data.append("title", values && values.title ? values.title : "");
      data.append("store_id", storeId);
      data.append("object_name", ObjectName.LOCATION);
      data.append("address2", values && values.address2 ? values.address2 : "");
      data.append("pin_code", values && values.pin_code ? values.pin_code : "");
      data.append("latitude", latitude ? latitude : values && values.latitude ? values.latitude : "");
      data.append(
        "longitude",
        longitude ? longitude : values && values.longitude ? values.longitude : ""
      );

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
      let params = {
        object_id: store_id,
        objectName: ObjectName.LOCATION
      };
      dispatch(
        AddressService.add(data, params, addressOpenToggle, setAddressDetails)
      );
    } else {
      data.append("name", values && values.name ? values.name : "");
      data.append(
        "phone_number",
        values && values.phone_number ? values.phone_number : ""
      );
      data.append("address1", values && values.address1 ? values.address1 : "");
      data.append("title", values && values.title ? values.title : "");
      data.append("store_id", storeId);
      data.append("object_name", ObjectName.LOCATION);
      data.append("address2", values && values.address2 ? values.address2 : "");
      data.append("pin_code", values && values.pin_code ? values.pin_code : "");
      data.append(
        "country",
        values && values.country.value ? values.country.value : ""
      );
      data.append("latitude", latitude ? latitude : values && values.latitude ? values.latitude : "");
      data.append(
        "longitude",
        longitude ? longitude : values && values.longitude ? values.longitude : ""
      );
      data.append("state", values && values.state ? values.state.value : "");
      data.append("city", values && values.city ? values.city : "");
      data.append(
        "gst_number",
        values && values.gst_number ? values.gst_number : ""
      );
      data.append("id", addressDetails?.id);
      let params = {
        object_id: storeId,
        objectName: ObjectName.LOCATION
      };
      dispatch(
        await AddressService.update(
          addressDetails?.id,
          data,
          params,
          setIsAdressModelOpen
        )
      );
      setAddressDetails("");
    }
  };

  const addUrlForm = (
    <>
      <URL
        name="url"
        label="Location Url"
        placeholder="Enter Location Url"
      />
    </>
  );

  const roleFooter = (
    <>
      <SaveButton onClick={() => setIsToggleOpen(false)} />
    </>
  );

  const handleAddressDelete = async () => {
    dispatch(
      await AddressService.Delete(addressDetails?.id, {
        pagination: true,
        search: Url.GetParam("search"),
        page: Url.GetParam("page"),
        pageSize: Url.GetParam("pageSize"),
        object_id: storeId,
        objectName: ObjectName.LOCATION,
        sort: "name",
        sortDir: "ASC"
      })
    );
    setAddressDetails("");
    setIsAddressDeleteModel(false);
  };

  //Get Store Detail
  const getStoreDetail = () => {
    let id = props.match.params.tab;
    return apiClient
      .get(`${endpoints().locationAPI}/${id}`)
      .then((response) => {
        const data = response.data;
        setProductData(data);
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });
  };

  const getproductId = async () => {
    let params = { pagination: false, store_id: storeId };
    const response = await StoreProductService.search(params);

    const data = response.data.data;
    let productsId = [];
    for (let i = 0; i < data.length; i++) {
      let { id } = data[i];
      productsId.push(id);
    }
    setProductIds(productsId);
  };

  const _toggle = (id) => {
    setIsToggle(!isToggle);
  };

  const toggleOpen = () => {
    setIsToggleOpen(!isToggleOpen)
  }

  // Add store modal toggling
  const addProductToggle = () => {
    setAddProductModal(false);
    setProductName("");
    history.push(`/location/${storeId}?pageSize=${25}`);
  };

  const addTeamToggle = () => {
    setAddTeamEntryModal(false);
  };

  // Handle store Add
  const handleProductAdd = () => {
    const data = new FormData();
    data.append("productId", productData.id);
    dispatch(
      getProductDetail(
        data,
        { productId: productId },
        addProductToggle,
        getProductDetail
      )
    );
    getProductTypeOptions();
    setProductName("");
  };

  // Get Shift List
  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };

  const multiselect = (values) => {
    setMultiSelectProduct(values);
  };

  const handleSubmitValue = (values) => {
    const url = values?.url;
    const regex = /@(-?\d+\.\d{4,}),(-?\d+\.\d{4,})/;

    const match = url.match(regex);

    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      setLatitude(latitude)
      setLongitude(longitude)

    } else {
      console.log("Latitude and longitude not found in the URL.");
    }
  }

  const handleSubmit = async (values) => {
    const createDate = new FormData();
    createDate.append("productIds", MultiSelectProduct);
    createDate.append("storeId", storeId);

    try {
      const response = await apiClient.post(
        `${endpoints().storeProductAPI}/productAdd`,
        createDate
      );
      if (response) {
        toast.success(response.data.message);
        setAddProductModal(false);
        setMultiSelectProduct("");
        history.push(`/location/${storeId}?pageSize=${25}`);
      }
      dispatch(
        fetchList(
          "storeProduct",
          `${endpoints().storeProductAPI}/search`,
          1,
          25,
          {
            store_id: props.match.params.tab,
            sort: Url.GetParam("sort") ? Url.GetParam("sort") : "product_name",
            sortDir: Url.GetParam("sortDir") ? Url.GetParam("sortDir") : "ASC"
          }
        )
      );
      dispatch(
        fetchList("product", `${endpoints().productAPI}/search`, 1, 25, {
          locationId: storeId
        })
      );
      const data = {
        productIds: values.product.value,
        quantity: values.quantity,
        storeId: storeId
      };

      dispatch(addStore(data));
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };

  // Getting the active store details in the select dropdown
  const getProductDetail = async () => {
    try {
      const response = await apiClient.get(`${endpoints().productAPI}/search`);
      const data = response && response.data && response.data.data;
      if (data && data.length > 0) {
        const productList = [];
        data.forEach((product) => {
          if (selectedProduct.indexOf(product.id) == -1) {
            if (product.status !== ProductStoreStatus.INACTIVE)
              productList.push({
                id: product.id,
                name: product.name
              });
          }
        });
        setProductList(productList);
        setSelectedProduct(data.selectedProductId);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  //Get User Details and list Start
  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <Avatar
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
        <div className="edit-profile-name m-2">
          {firstName} {lastName}
        </div>
      </div>
    );
  };

  const getUserList = async () => {
    let data;
    await apiClient
      .get(`${endpoints().userAPI}/search?status=${User.STATUS_ACTIVE_VALUE}`)
      .then((response) => {
        data = response.data.data;
        if (data && data.length > 0) {
          const usersList = [];
          data.forEach((list) => {
            usersList.push({
              value: list.first_name,
              id: list.id,
              label: getUserName(
                list.avatarUrl,
                list.first_name,
                list.last_name
              )
            });
          });
          // Set the User List Options in State
          setUsersList(usersList);
        }
      });
  };

  const toggle = (tab) => {
    setIsOpen(!isOpen);
    setActiveTab(tab);

    history.push(`/location/${storeId}?pageSize=${25}`);
  };

  const handleCountryChange = (values) => {
    setSelectCountry(values);
    const selectedOption = values && values.id;
    const selectedCountryName = values && values.label;
    setSelectedOption(selectedOption);
    setSelectedCountryName(selectedCountryName);
  };

  // Get Country Details
  const getCountryDetails = async () => {
    const response = await apiClient.get(`${endpoints().countryAPI}/search`);
    const data = response.data;
    setSeletedCountryId(data.id);
  };

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  /**
   * Delete Store
   *
   * @param data
   */
  const storeDelete = (id) => {
    dispatch(deleteStore(id, {}));
    history.push("/location");
  };

  const addTeamEntry = (
    <>
      <UserSelect label="User" name="userName" required />
      <Select
        name="shift"
        label="Shift"
        placeholder="Select Shift"
        options={shiftList}
        required
      />
    </>
  );

  //Handle Update Store Details
  const handleUpdate = (id, values) => {
    let bodyData = new Object();

    if (values?.name) {
      bodyData.name = String.Get(values.name);
    }
    if (values?.status?.value) {
      bodyData.status = values?.status && String.Get(values.status.value);
    }
    if (values?.shopify_shop_name) {
      bodyData.shopify_shop_name = String.Get(values?.shopify_shop_name);
    }
    if (values?.shopify_api_key) {
      bodyData.shopify_api_key = String.Get(values.shopify_api_key);
    }
    if (values?.shopify_admin_api_version) {
      bodyData.shopify_admin_api_version = String.Get(
        values.shopify_admin_api_version
      );
    }
    if (values?.shopify_password) {
      bodyData.shopify_password = String.Get(values.shopify_password);
    }
    if (values?.address1) {
      bodyData.address1 = String.Get(values.address1);
    }
    if (values?.address2) {
      bodyData.address2 = String.Get(values.address2);
    }
    if (values?.state) {
      bodyData.state = String.Get(values.state.value);
    }
    if (values?.city) {
      bodyData.city = String.Get(values.city);
    }
    if (values?.country) {
      bodyData.country = String.Get(values.country.value);
    }
    if (values?.pin_code) {
      bodyData.pin_code = String.Get(values.pin_code);
    }
    if (values?.email) {
      bodyData.email = String.Get(values.email);
    }
    if (values?.mobile_number1) {
      bodyData.mobile_number1 = String.Get(values.mobile_number1);
    }
    if (values?.mobile_number2) {
      bodyData.mobile_number2 = String.Get(values.mobile_number2);
    }

    if (values && values.printName !== undefined) {
      bodyData.printName = String.Get(values.printName);
    }
    if (values && values.color) {
      bodyData.color = String.Get(values.color);
    }
    if (values && values.longitude) {
      bodyData.longitude = String.Get(longitude) ? longitude : String.Get(values.longitude);
    }
    if (values && values.latitude) {
      bodyData.latitude = latitude ? latitude : String.Get(values.latitude);
    }
    bodyData.ip_address = String.Get(values.ip_address);

    bodyData.minimum_cash_in_store =
      values &&
      Currency.Get(
        values.minimum_cash_in_store ? values.minimum_cash_in_store : null
      );

    bodyData.cash_in_location =
      values &&
      Currency.Get(values.cash_in_location ? values.cash_in_location : null);

    bodyData.start_date = values && values.start_date ? values.start_date : "";

    bodyData.end_date = values && values.end_date ? values.end_date : "";


    bodyData.open_time = values && values.open_time ? values.open_time : "";

    bodyData.close_time = values && values.close_time ? values.close_time : "";

    if (values?.distributionCenter !== undefined) {
      bodyData.distributionCenter =
        values?.distributionCenter && values?.distributionCenter.value;
    }


    if (values?.type !== undefined) {
      bodyData.type =
        values?.type && values?.type.value;
    }

    bodyData.location_code =
      values && values?.location_code ? values?.location_code : "";

    bodyData.last_order_number =
      values && values?.last_order_number ? values?.last_order_number : "";

    dispatch(updateStore(id, bodyData, {}));
    getStoreDetail();
  };

  const handleTeamAdd = (id, values) => {
    const data = new FormData();
    if (values?.userName) {
      data.append("user", String.Get(values.userName.id));
    }
    if (values?.shift) {
      data.append("shift", String.Get(values.shift.id));
    }

    if (values?.status) {
      data.append("status", String.Get(values.status.value));
    }

    dispatch(addTeam(id, data, _toggle));
  };

  const handleStatusChange = (selectStatus) => {
    if (selectStatus && selectStatus.status) {
      this.setStatus(selectStatus.status);
    }
  };

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Location",
      link: "/location"
    },
    {
      label: activeTab,
      link: ""
    }
  ];

  // Getting the Store Type options
  const getProductTypeOptions = () => {
    // To list the stores in select dropdown.
    let productListOptions = [];

    if (!productsList) return productListOptions;

    productsList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        productListOptions.push({ value: type.id, label: type.name });
      });
    return productListOptions;
  };

  // Modal Body of Add Store
  const addStoreForm = (
    <ProductList
      // productId={productId}
      storeId={storeId}
      MultiSelectProduct={multiselect}
      history={history}
    />
  );

  // Modal Footer of Add Store
  const productFooter = (
    <Button
      label="Add Products"
      className="h6-5-important"
      onClick={(values) => {
        handleSubmit(values);
      }}
    />
  );

  const teamFooter = <SaveButton type="submit" label="Add" />;

  const downloadQRCode = (
    <QRCode
      id="qr-gen"
      value={productData?.data?.encryptedStoreID}
      size={290}
      level={"H"}
      includeMargin={true}
    />
  );
  const imagetoggle = (id) => {
    if (id) {
      setModalOpen(!modalOpen);
    } else {
      setModalOpen(!modalOpen);
      setImageStatus("");
      setSelectedFile("");
      setErrorMessage("");
      setSelectedFile("");
      setFile("");
    }
  };

  const onStatusChange = async (value) => {
    const id = props.match.params.tab;
    dispatch(updateStoreStatus(id, value, {})
    );
  };

  const initialValues = {
    name: productData?.data?.name,
    start_date: productData?.data?.start_date,
    end_date: productData?.data?.end_date,
    ip_address: productData?.data?.ip_address,
    color: productData?.data?.color,
    printName: productData?.data?.printName,
    status: productData?.data?.status
      ? statusOptions.find((data) => data.label === productData?.data?.status)
      : "",
    minimum_cash_in_store:
      productData?.data?.minimum_cash_in_store == 0
        ? ""
        : productData?.data?.minimum_cash_in_store,
    cash_in_location:
      productData?.data?.cash_in_location == 0
        ? ""
        : productData?.data?.cash_in_location,
    distributionCenter:
      storeList &&
      storeList.find(
        (data) => data.value == productData?.data?.distributionCenter
      ),
    location_code: productData?.data?.location_code,
    last_order_number: productData?.data?.last_order_number,
    latitude: latitude ? latitude : productData?.data?.latitude || "",
    longitude: longitude ? longitude : productData?.data?.longitude || "",
    type: productData?.data?.type
      ? locationTypeOptions.find((data) => data.value === productData?.data?.type)
      : "",
    close_time: productData?.data?.close_time ? productData?.data?.close_time : "",
    open_time: productData?.data?.open_time ? productData?.data?.open_time : "",
  };

  const addContactForm = <AddContact />;

  const addContactFooter = (
    <Button type="submit" label={"Add"} className="h6-5-important"></Button>
  );

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete"
    }
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Store"
        id={productData?.data?.id}
        label={productData?.data?.name}
        deleteFunction={storeDelete}
      />
      {/* Store Add Modal */}
      <DeleteModal
        isOpen={isContactDeleteModel}
        title="Delete Contact"
        label={contactDetails?.name}
        toggle={() => {
          setIsContactDeleteModel(false);
        }}
        deleteFunction={handleContactDelete}
      />

      <DeleteModal
        isOpen={isAddressDeleteModel}
        title="Delete Address"
        label={addressDetails?.title}
        toggle={() => {
          setIsAddressDeleteModel(false);
        }}
        deleteFunction={handleAddressDelete}
      />

      <ProductSelectModal
        modalOpen={addStoreModal}
        toggle={toggle}
        toggleModalClose={addProductToggle}
        handleSubmit={handleSubmit}
        BulkSelect={multiselect}
        history={history}
        params={{ locationId: storeId }}
      />
      <Drawer
        modelTitle="Add Member"
        DrawerBody={addTeamEntry}
        DrawerFooter={teamFooter}
        onSubmit={(values) => {
          let id = props.match.params.tab;

          handleTeamAdd(id, values);
        }}
        initialValues={{ userName: "", shift: "", status: "" }}
        handleOpenModal={_toggle}
        handleCloseModal={_toggle}
        handleDrawerClose={_toggle}
        isModalOpen={isToggle}
        enableReinitialize={true}
      />
      <Drawer
        modelTitle={contactDetails?.id ? "Edit Address" : "Add Address"}
        DrawerBody={addContactForm}
        DrawerFooter={addContactFooter}
        onSubmit={(values) => handleContact(values)}
        initialValues={initialValue}
        handleOpenModal={addContactToggle}
        handleCloseModal={addContactToggle}
        handleDrawerClose={addContactToggle}
        isModalOpen={isContactModelOpen}
        enableReinitialize={true}
      />

      {/* BreadCrumb */}
      <BreadCrumb list={breadcrumbList} />
      {/* Page Title */}
      <div className="d-flex justify-content-between">
        <PageTitle label={productData?.data?.name} />

        <div className="d-flex">
          {activeTab == Store.PRODUCT_TAB ? (
            <AddButton
              label={"Add Product"}
              onClick={() => {
                setAddProductModal(true);
              }}
            />
          ) : (
            ""
          )}
          {activeTab == Store.TEAM_TAB ? (
            <AddButton
              label={"Add User"}
              onClick={() => {
                _toggle(true);
              }}
            />
          ) : (
            ""
          )}
          {activeTab == Store.ADDRESS_TAB ? (
            <AddButton
              label={"Add Address"}
              onClick={() => {
                addressOpenToggle(true);
              }}
            />
          ) : (
            ""
          )}
          {activeTab == Store.CONTACT_TAB ? (
            <AddButton
              label={"Add Contact"}
              onClick={(e) => {
                setContactDetails("");
                addContactToggle(true);
              }}
            />
          ) : (
            ""
          )}
          {activeTab == Store.FILES_TAB && (
            <AddButton
              className="py- ml-3 mr-1"
              label="Add File"
              onClick={(e) => {
                imagetoggle();
              }}
            />
          )}

          <div className="mr-2">
            <Action
              buttonLabel={productData?.data?.status}
              dropdownLinks={statusOptions}
              handleChange={onStatusChange}
            />
          </div>
          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>
      </div>

      <Nav tabs className="admin-tabs">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.GENERAL_TAB
            })}
            onClick={() => {
              toggle(Store.GENERAL_TAB);
              _handleTabChange(Store.GENERAL_TAB);
            }}>
            {Store.GENERAL_TAB}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.FILES_TAB
            })}
            onClick={() => {
              toggle(Store.FILES_TAB);
              _handleTabChange(Store.FILES_TAB);
            }}>
            {Store.FILES_TAB}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.ADDRESS_TAB
            })}
            onClick={() => {
              toggle(Store.ADDRESS_TAB);
              _handleTabChange(Store.ADDRESS_TAB);
            }}>
            {Store.ADDRESS_TAB}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.CONTACT_TAB
            })}
            onClick={() => {
              toggle(Store.CONTACT_TAB);
              _handleTabChange(Store.CONTACT_TAB);
            }}>
            {Store.CONTACT_TAB}
          </NavLink>
        </NavItem>

        {/* Email Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.SHOPIFY_TAB
            })}
            onClick={() => {
              toggle(Store.SHOPIFY_TAB);
              _handleTabChange(Store.SHOPIFY_TAB);
            }}>
            {Store.SHOPIFY_TAB}
          </NavLink>
        </NavItem>

        {/* Prouduct Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.PRODUCT_TAB
            })}
            onClick={() => {
              toggle(Store.PRODUCT_TAB);
              _handleTabChange(Store.PRODUCT_TAB);
            }}>
            {Store.PRODUCT_TAB}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.TEAM_TAB
            })}
            onClick={() => {
              toggle(Store.TEAM_TAB);
              _handleTabChange(Store.TEAM_TAB);
            }}>
            {Store.TEAM_TAB}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Store.SETTINGS_TAB
            })}
            onClick={() => {
              toggle(Store.SETTINGS_TAB);
              _handleTabChange(Store.SETTINGS_TAB);
            }}>
            {Store.SETTINGS_TAB}
          </NavLink>
        </NavItem>
        <NavItem>
          {showHistory && (
            <NavLink
              className={classnames({
                active: activeTab === Store.HISTORY_TAB
              })}
              onClick={() => {
                toggle(Store.HISTORY_TAB);
                _handleTabChange(Store.HISTORY_TAB);
              }}>
              {Store.HISTORY_TAB}
            </NavLink>
          )}
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Store.GENERAL_TAB}>
          <AddModal
            isOpen={isToggleOpen}
            toggle={toggleOpen}
            toggleModalClose={toggleOpen}
            modalTitle="Add Location URL"
            modalBody={addUrlForm}
            modalFooter={roleFooter}
            initialValues={{
              name: "",
            }}
            onSubmit={handleSubmitValue}
            hideDefaultButtons
          />
          <Form
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              let id = props.match.params.tab;
              handleUpdate(id, values);
            }}>
            <div className="card bg-white mt-3 col-lg-12">
              <div className="card-body">
                <div className=" field-wrapper row">
                  <div className="col-sm-6">
                    <Text
                      className="w-100"
                      name="name"
                      label="Name"
                      required={true}
                    />
                    <div className="row">
                      <div className="col">
                        <Text
                          className="w-100"
                          name="printName"
                          label="Print Name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Text
                          className="w-100"
                          name="location_code"
                          label="Location Code"
                        />
                      </div>
                      <div className="col">
                        <Text
                          className="w-100"
                          name="last_order_number"
                          label="Last Order Number"
                        />
                      </div>
                    </div>
                    <IPAddress name="ip_address" label="Ip Address" />
                    <div className="row">
                      <div className="col">
                        <Text
                          className="w-100"
                          name="longitude"
                          label="Longitude"
                        />
                      </div>
                      <div className="col">
                        <Text
                          className="w-100"
                          name="latitude"
                          label="Latitude"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <DateSelector
                          label="Open Time"
                          name="open_time"
                          isClearable
                          showTimeSelect
                          showTimeSelectOnly
                          format="h:mm aa"
                        />
                      </div>
                      <div className="col">
                        <DateSelector
                          isClearable
                          showTimeSelect
                          showTimeSelectOnly
                          format="h:mm aa" label="Close Time" name="close_time" />
                      </div>
                    </div>
                    <div>
                      <Link onClick={toggleOpen}>Get From URL</Link>
                    </div>
                    <div className="row">
                      <div className="col">
                        <CurrencyComponent
                          name="minimum_cash_in_store"
                          label="Minimum Cash In Location"
                        />
                      </div>
                      <div className="col">
                        <CurrencyComponent
                          name="cash_in_location"
                          label="Cash In Location"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Select
                          label="Distribution Center"
                          name="distributionCenter"
                          options={storeList}
                        />
                      </div>
                      <div className="col">
                        <Select
                          name="type"
                          label="Type"
                          options={locationTypeOptions}
                        />
                      </div>
                    </div>
                    <Text className="w-100" name="color" label="Color" />
                    <div className="row">
                      <div className="col">
                        <DateSelector
                          label="Start Date"
                          required={true}
                          name="start_date"
                        />
                      </div>
                      <div className="col">
                        <DateSelector label="End Date" name="end_date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 ">
                    <QRCodePrint
                      image={downloadQRCode}
                      storeDetail={productData?.data?.name}
                    />
                  </div>
                  <HorizontalSpace>
                    <SaveButton label="Save" />
                    <CancelButton
                      onClick={() => {
                        history.push("/location");
                      }}
                    />
                  </HorizontalSpace>
                </div>
              </div>
            </div>
          </Form>
        </TabPane>
        <TabPane tabId={Store.FILES_TAB}>
          {/* Image List Table Component */}
          <ImageList
            title="Location"
            objectName="LOCATION"
            objectId={props.match.params.tab}
            showFeature={true}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            selectedFile={selectedFile}
            setSelectedFile={selectedFile}
            file={file}
            currentData={currentData}
            setCurrentData={setCurrentData}
            status={status}
            setImageStatus={setImageStatus}
            setFile={setFile}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            toggle={imagetoggle}
            userView
            hideAttachments
          />
        </TabPane>
        <TabPane tabId={Store.ADDRESS_TAB}>
          <AddressDetailTab
            AddressOpen={isAddressOpen}
            AddressSelectModal={addressOpenToggle}
            handleSubmit={(e) => handleAdressUpdate(e)}
            initialValue={addressInitialValues}
            history={history}
            object_id={storeId}
            objectName={ObjectName.LOCATION}
            EditModal={EditModal}
            id={addressDetails?.id}
            setIsDeleteModel={setIsAddressDeleteModel}
            setRow={setAddressDetails}
            setDeleteRow={setAddressDetails}
            handleCountryChange={handleCountryChange}
            selectedOption={selectedOption}
            selectedCountryName={selectedCountryName}
            newTableHeading
          />
        </TabPane>

        <TabPane tabId={Store.CONTACT_TAB}>
          <ContactList
            setAddContactModal={editContactModel}
            object_id={storeId}
            history={history}
            setRowValue={setContactDetails}
            setDeleteContactModal={setIsContactDeleteModel}
            setRow={setContactDetails}
            newTableHeading
          />
        </TabPane>
        <TabPane tabId={Store.SHOPIFY_TAB}>
          <Form
            enableReinitialize={true}
            initialValues={{
              ...initialValues,
              name: productData?.data?.name,
              start_date: productData?.data?.start_date,
              end_date: productData?.data?.end_date,
              ip_address: productData?.data?.ip_address,
              allow_sale: productData?.data?.allow_sale,
              status: productData?.data?.status
                ? statusOptions.find(
                  (data) => data.label === productData?.data?.status
                )
                : "",
              address1:
                productData && productData.data && productData.data.address1,
              address2: productData?.data?.address2,
              state: {
                label: productData?.data?.state,
                value: productData?.data?.state
              },
              country: {
                label: productData?.data?.country,
                value: productData?.data?.country
              },
              pin_code: productData?.data?.pin_code || "",
              city: productData?.data?.city,
              shopify_shop_name: productData?.data?.shopifyStoreName,
              shopify_api_key: productData?.data?.shopifyApiKey,
              shopify_password: productData?.data?.shopifyPassword,
              shopify_admin_api_version:
                productData?.data?.shopifyAdminApiVersion
            }}
            onSubmit={(values) => {
              let id = props.match.params.tab;
              handleUpdate(id, values);
            }}>

            <div className="card bg-white mt-3 col-lg-12">
              <div className="card-body">
                <div className=" field-wrapper row">
                  <Text
                    className="w-100"
                    name="shopify_shop_name"
                    label="Shopify Store Name"
                  />
                  <Text
                    className="w-100"
                    name="shopify_admin_api_version"
                    label="Shopify Admin API Version"
                  />
                  <Text
                    className="w-100"
                    name="shopify_api_key"
                    label="Shopify API Key"
                  />
                  <div className="w-100">
                    <Password
                      name="shopify_password"
                      label="Shopify Password"
                    />
                  </div>
                </div>
              </div>
              <HorizontalSpace>
                <SaveButton label="Save" />
                <CancelButton
                  onClick={() => {
                    history.push("/location");
                  }}
                />
              </HorizontalSpace>
            </div>
          </Form>
        </TabPane>

        {/* Prouduct Tab */}
        <TabPane tabId={Store.PRODUCT_TAB}>
          {activeTab === Store.PRODUCT_TAB && (
            <ProductTab
              storeId={props.match.params.tab}
              CurrentPage={CurrentPage}
              CurrentPageSize={CurrentPageSize}
              history={history}
            />
          )}
        </TabPane>
        {activeTab === Store.TEAM_TAB && (
          <Team
            let
            storeId={props.match.params.tab}
            setIsDeleteModel={setDeleteModal}
            history={history}
          />
        )}
        <TabPane tabId={Store.TEAM_TAB}></TabPane>
        {showHistory && activeTab === Store.HISTORY_TAB && (
          <TabPane tabId={Store.HISTORY_TAB} className="w-100">
            <ActivityList
              id={props.match.params.tab}
              objectId={props.match.params.tab}
              object_name={ObjectName.LOCATION}
              history={props.history}
            />
          </TabPane>
        )}

        <TabPane tabId={Store.SETTINGS_TAB}>
          <SettingsTab
            storeId={storeId}
            history={history}
            productData={productData}
          />
        </TabPane>
      </TabContent>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;

  const CurrentPage =
    reduxTable["storeProduct"] && !reduxTable["storeProduct"].isFetching
      ? reduxTable["storeProduct"].currentPage
      : 1;

  const CurrentPageSize =
    reduxTable["storeProduct"] && !reduxTable["storeProduct"].isFetching
      ? reduxTable["storeProduct"].pageSize
      : 25;

  return {
    CurrentPage,
    CurrentPageSize
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetail);
