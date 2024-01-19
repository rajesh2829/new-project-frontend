import React, { useCallback, useEffect, useReducer, useState } from "react";

// ApiClient
import { apiClient } from "../../apiClient";
//Config
import { endpoints } from "../../api/endPoints";

//api
import { getStoresList } from "../../services/StoreListService";

import ArrayList from "../../lib/ArrayList";

// Components
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/SaveButton";

// Reducer
import { cartReducer } from "../../reducers/cartReducer";

// Constants
import { cartConstants } from "../../helpers/OrderList";

import { Order } from "../../helpers/Order";

import Form from "../../components/Form";

import classNames from "classnames";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { fetchList } from "../../actions/table";
import AddButton from "../../components/AddButton";
import ProductSelectModal from "../../components/ProductSelectModal";
import Toast from "../../components/Toast";
import UserCard from "../../components/UserCard";
import Account from "../../helpers/Account";
import Cookie from "../../helpers/Cookie";
import { HttpStatus } from "../../helpers/HttpStatus";
import ObjectName from "../../helpers/ObjectName";
import URL from "../../helpers/Url";
import { UserType } from "../../helpers/UserType";
import DateTime from "../../lib/DateTime";
import Cookies, { clearCookie, setCookie } from "../../lib/Helper";
import { isBadRequest } from "../../lib/Http";
import Url from "../../lib/Url";
import { AccountService } from "../../services/AccountService";
import OrderProductService from "../../services/OrderProductService";
import OrderService from "../../services/OrderService";
import ProductService from "../../services/ProductService";
import ShiftService from "../../services/ShiftService";
import StatusService from "../../services/StatusService";
import CompanyUserService from "../../services/UserService";
import GeneralTab from "./components/generalTab";
import ProductTab from "./components/productTab";
import Status from "../../components/Status";
import { hasPermission } from "../../services/UserRolePermissionService";
import Permission from "../../helpers/Permission";
import ActivityList from "../../components/ActivityList";
import Action from "../../components/Action";
import Avatar from "../../components/Avatar";

const AddProducts = (props) => {
  const { history, toggle } = props
  const [location, setStore] = useState([]);
  const [orderDate, setOrderDate] = useState(new Date());
  const [productList, setProductList] = useState();
  const [orderId, setOrderId] = useState();
  const [showCart, setShowCart] = useState(false);
  const [salesExecutive, setSalesExecutive] = useState([]);
  const [selectedSalesExecutive, setSelectedSalesExecutive] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState()
  const [shiftValue, SetShiftValue] = useState(null);
  const [outofStockProducts, setOutOfStockProducts] = useState();
  const [orderCreatedBy, setOrderCreatedBy] = useState();

  const [shiftList, setShiftList] = useState([]);
  const [paymentValue, setPaymentValue] = useState(null);
  const [storeValue, setStoreValue] = useState(null);
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [inActiveSaleExecutive, setInActiveSaleExecutive] = useState([]);
  const [products, setProducts] = useState([]);
  const [modelOpen, setAddProductModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const Tab = { SUMMARY: "Summary", PRODUCT: "Product", HISTORY: "History" };
  const [activeTab, setActiveTab] = useState(Tab.SUMMARY);
  const [isLoading, setIsLoading] = useState(false);
  const [editable, setEditable] = useState(true)
  const [selectProduct, setSelectedProduct] = useState("");
  const [usersList, setUsersList] = useState([]);

  let pathName = props?.history?.location?.pathname.replace(/\/\d+$/, "");
  const tabToggle = (tab) => {
    setActiveTab(tab);
  };
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [date, setDate] = useState();
  const [statusId, setStatusId] = useState();

  const toggleCard = useCallback(() => setShowCart((value) => !value));
  const [MultiSelectProduct, setMultiSelectProduct] = useState([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState(null)
  const [customerValue, setCustomerValue] = useState(null)
  const [OrderDetail, setOrderDetail] = useState(null)
  const [cashAmountValue, setCashAmountValue] = useState(null)
  const [upiAmountValue, setUpiAmountValue] = useState(null)
  let storeId = Cookies.get(Cookie.ORDER_SELECTED_STORE);
  let order_id = props && props?.match?.params?.id ? props?.match?.params?.id : Cookies.get(Cookie.ORDER_ID);
  const Dispatch = useDispatch();
  let showEditButton = hasPermission(Permission.ORDER_EDIT);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    storeList();
    getUserRole();
    getUserDetails();
    getUserDetail();
    getShift();
    getProduct();
    getStatus();
    getCustomerList();
    getUsersList();
    if (!props?.match?.params?.id){
      setEditable(false)
    }

  }, []);

  useEffect(() => {
    setOrderId(order_id);
    if (order_id) {
      getOrderDetails(order_id);
    }
    setDate(new Date());
  }, [products]);


  const paymentType = [
    {
      label: "Cash",
      value: 1,
    },
    {
      label: "Upi",
      value: 2,
    },
    {
      label: "Mixed",
      value: 3,
    }
  ];

  const getStatus = async () => {
    const status = await StatusService.search(
      pathName == "/location/deliveryOrders/details" ? ObjectName.DELIVERY : ObjectName.ORDER,
      pathName == "/location/deliveryOrders/details" ? Order.STATUS_DRAFT : Order.STATUS_COMPLETED
    );

    if (status && status.length > 0) {
      setStatusId(status[0]?.id);
    }
  };

  //use Reducer for state management
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
    cartItem: 0,
    orderPlaced: false,
    orderId: null,
    totalCost: 0,
  });

  const getOrderDetails = async (orderId) => {
    try {
      //validate order Id exist or not
      if (orderId) {
        const response = await OrderService.get(orderId);
        let cartList = new Array();

        let stateValues = new Object();

        //validate response data exist or not
        if (response && response.data && response.data.data) {
          //get order details
          let orderDetails = response.data.data;
          setCustomer(orderDetails && orderDetails?.customer_account)

          setOrderNumber(orderDetails && orderDetails?.order_number);

          setOrderDetail(orderDetails)

          //validate order status draft or not
          if (orderDetails.status == Order.STATUS_DRAFT) {
            //get order products
            let orderProducts = orderDetails && orderDetails.orderProducts;

            //validate order product exist or not
            if (
              orderProducts &&
              orderProducts.length > 0 &&
              productList &&
              productList.length > 0
            ) {
              //loop the prder products
              for (let i = 0; i < orderProducts.length; i++) {
                let productId = orderProducts[i].product_id;

                let productData = productList.find(
                  (data) => data.id == productId
                );

                cartList.push({
                  id: productId,
                  image: productData.image,
                  name: productData.name,
                  orderProductId: orderProducts[i].id,
                  amount: orderProducts[i].amount,
                  qty: orderProducts[i].quantity,
                  brand_name: productData.brand,
                });
              }

              stateValues.cart = cartList;
              stateValues.cartItem = cartList.length;
              stateValues.orderId = orderDetails.id;
              stateValues.products = productList;
              stateValues.orderPlaced = true;
              stateValues.totalCost = orderDetails.total_amount;
            }

            const isEmpty = Object.keys(stateValues).length === 0;

            if (!isEmpty) {
              dispatch({
                type: cartConstants.UPDATE_STATE,
                payload: stateValues,
              });
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCustomerList = async () => {

    let params = {
      type: Account.TYPE_CUSTOMER
    }
    let response = await AccountService.list(params);
    let data = response && response?.data;
    let list = []
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const { name, id, mobile_number } = data[i];
        list.push({
          label: (
            <div>
              <div>{name}</div>
              <div>{mobile_number}</div>
            </div>
          ),
          value: name + ' ' + mobile_number,
          id: id,
        });
      }

    }
    setCustomerList(list)
  }

  //get all products list
  const getProduct = async () => {
    const list = await ProductService.search();
    const data = list && list.data;
    setProducts(data);
  };

  const storeList = async () => {
    try {
      let storeLists = [];
      const stores = await getStoresList();
      if (ArrayList.isNotEmpty(stores)) {
        stores.forEach((location) => {
          storeLists.push({
            id: location.id,
            label: location.label,
            value: location.label,
          });
        });
      }
      setStore(storeLists);
    } catch (err) {
      console.log(err);
    }
  };

  //create order action
  const createOrder = async (orderData) => {
    let response = await OrderService.create(orderData);
    return response;
  };

  //update order action
  const updateOrder = async (orderId, orderData, callback) => {
    OrderService.update(orderId, orderData, (response, outofStockProducts) => {
      return callback(response, outofStockProducts);
    });
  };

  //create order product action
  const createOrderProduct = async (orderProductData) => {
    let response = await OrderProductService.create(orderProductData);
    return response;
  };


  //place order
  const placeOrder = async () => {
    try {
      //destructue the state object
      const { cart, orderPlaced } = state;

      //create new cart list array
      let cartList = [];

      //validate order placed or not
      if (!orderPlaced) {
        //validate product exit or not in the cart
        if (cart && cart.length > 0) {
          //get the updated total cost
          let totalCost = cart.reduce(
            (acc, current) => acc + Number(current.amount) * current.qty,
            0
          );
          //update the cost in state
          dispatch({
            type: cartConstants.ADD_TOTAL_COST,
            totalCost: totalCost,
          });

          //create order create object
          let orderData = {
            total_amount: totalCost,
            date: orderDate ? orderDate : date,
            payment_type: paymentValue
              ? paymentValue
              : Cookies.get(Cookie.ORDER_SELECTED_PAYMENT),
            sales_executive_user_id: selectedSalesExecutive
              ? selectedSalesExecutive
              : Cookies.get(Cookie.ORDER_SELECTED_SALESEXECUTIVE),
            storeId: storeValue
              ? storeValue
              : Cookies.get(Cookie.ORDER_SELECTED_STORE),
            shift: shiftValue
              ? shiftValue
              : Cookies.get(Cookie.ORDER_SELECTED_SHIFT),
            createdBy: orderCreatedBy,
          };
          //create new order
          let response = await createOrder(orderData);

          //get order Id from response
          const orderId = response && response.data && response.data.orderId;
          setOrderId(orderId);
          //validate order Id exist or not
          if (orderId) {
            setCookie(Cookie.ORDER_ID, orderId);

            //update order Id inside the state
            dispatch({
              type: cartConstants.PLACE_ORDER,
              orderId: orderId,
            });

            //loop the cart products and form object
            cart.forEach((cartItem) => {
              cartList.push({
                orderId: orderId,
                productId: cartItem.id,
                quantity: cartItem.qty,
                unitPrice: cartItem.amount,
              });
            });

            //create order product object
            const orderProductData = {
              orderProductList: cartList,
            };

            //create order product
            let response = await createOrderProduct(orderProductData);

            return response;
          }
        }
      }
    } catch {
      console.log(err);
    }
  };

  // Product Card
  const getUserDetails = (first_name) => {
    return (
      <div>
        <UserCard first_name={first_name} firstName={first_name} />
      </div>
    );
  };

  // Sales Executive Role
  const getUserRole = async () => {
    let userType = UserType.SALES_EXECUTIVE;
    const response = await CompanyUserService.list({ userType });
    const roleDetail = response.data;

    const data = [];
    roleDetail &&
      roleDetail.length > 0 &&
      roleDetail.forEach((list) => {
        data.push({
          label: list.first_name + " " + list.last_name,
          value: list.id,
        });
      });
    setSalesExecutive(data);
  };

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


  const getUsersList = async () => {
    const userRole = await CompanyUserService.list();
    const data = [];
    userRole.data &&
      userRole.data.length > 0 &&
      userRole.data.forEach((list) => {
        data.push({
          label: getUserName(list.media_url, list.first_name, list.last_name),
          value: list.first_name,
          id: list.id,
        });
      });
    setUsersList(data);

  };


  const storeFieldOnchange = (e) => {
    const value = e?.id ? e?.id : "";
    setStoreValue(value);
    handleUpdate(order_id, { storeId: value })
    setCookie(Cookie.ORDER_SELECTED_STORE, e?.id);
  };

  const orderDateFieldOnchange = (e) => {
    setOrderDate(e);
    handleUpdate(order_id, { date: new Date(e) })
  };

  const handleUpdate = (id, values) => {
    let keys = Object.keys(values)[0];
    const data = new FormData();

    if (keys === "date") {
      data.append("date", values.date);
    }
    if (keys === "storeId") {
      data.append("storeId", values && values.storeId);
    }
    if (keys === "shift") {
      data.append("shift", values && values.shift);
    }
    if (keys === "sales_executive_user_id") {
      data.append("sales_executive_user_id", values && values.sales_executive_user_id)
    }
    if (keys === "delivery_executive") {
      data.append("delivery_executive", values && values.delivery_executive?.id)
    }
    if (keys === "payment_type") {
      data.append("payment_type", values && values.payment_type)
    }
    if (keys === "customer_account") {
      data.append("customer_account", values && values.customer_account)
    }
    if (keys === "cash_amount") {
      data.append("cash", values && values.cash_amount)
    }
    if (keys === "upi_amount") {
      data.append("upi", values && values.upi_amount)
    }

    dispatch(
      activeTab === Tab.SUMMARY &&
      updateOrder(id, data, (response) => {
        if (response.status == HttpStatus.OK) {
          setIsLoading(true);
          getOrderDetails(order_id)
          setIsLoading(false);
        }
      })
    );
  };

  // Bread crumb list
  const breadcrumbList = [
    {
      label: "Home",
      link: "/locationDashboard",
    },
    {
      label: pathName == "/location/deliveryOrders/details" || pathName == "/deliveryOrder" && props?.match?.params?.id ? "Delivery Orders" : "Orders",
      link: pathName == "/location/deliveryOrders/details" || pathName == "/deliveryOrder" && props?.match?.params?.id ? URL.DELIVERY_ORDER_LIST : URL.ORDER_LIST,
    },
    {
      label: pathName == "/location/deliveryOrders/details" ? "Add New" : pathName == "/deliveryOrder" && props?.match?.params?.id ? "Delivery Order Detail" : pathName == "/order" && props?.match?.params?.id ? "Order Detail" : "New Order",
    },
  ];

  // get the login user details
  const getUserDetail = async () => {
    try {
      let response = await apiClient.get(`${endpoints().userAPI}/`);
      const createdBy = response.data.id;
      setOrderCreatedBy(createdBy);
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

  const completeOrder = async () => {
    let shift = Cookies.get(Cookie.ORDER_SELECTED_SHIFT);
    let location = Cookies.get(Cookie.ORDER_SELECTED_STORE);
    let salesExecutive = Cookies.get(Cookie.ORDER_SELECTED_SALESEXECUTIVE);
    let payment = Cookies.get(Cookie.ORDER_SELECTED_PAYMENT);
    let productId = Cookies.get(Cookie.PRODUCT_ID);
    const message = !location
      ? "Location"
      : !shift
        ? "Shift"
        : !salesExecutive
          ? "Sales Executive"
          : !payment
            ? "Payment Type"
            : "Order";
    placeOrder();
    if (!salesExecutive || !location || !shift || !payment) {
      Toast.error(`Please Select ${message}`);
    } else {
      if (productId) {
        updateOrder(
          order_id,
          {
            status: statusId,
            date: orderDate ? orderDate : date,
            sales_executive_user_id: Cookies.get(
              Cookie.ORDER_SELECTED_SALESEXECUTIVE
            )
              ? Cookies.get(Cookie.ORDER_SELECTED_SALESEXECUTIVE)
              : "",
            storeId: Cookies.get(Cookie.ORDER_SELECTED_STORE)
              ? Cookies.get(Cookie.ORDER_SELECTED_STORE)
              : "",
            shift: Cookies.get(Cookie.ORDER_SELECTED_SHIFT)
              ? Cookies.get(Cookie.ORDER_SELECTED_SHIFT)
              : "",
            payment_type: Cookies.get(Cookie.ORDER_SELECTED_PAYMENT)
              ? Cookies.get(Cookie.ORDER_SELECTED_PAYMENT)
              : "",
            createdBy: orderCreatedBy,
          },
          (response, outofStockProducts) => {
            if (outofStockProducts) {
              setOutOfStockProducts(outofStockProducts);
            } else {
              if (pathName == "/location/deliveryOrders/details") {
                history.push(URL.DELIVERY_ORDER_LIST);
              } else if (pathName == "/deliveryOrder") {
                history.push(URL.DELIVERY_ORDER_LIST);
              } else {
                history.push(URL.ORDER_LIST);

              }
              clearCookie(Cookie.ORDER_ID)
              clearCookie(Cookie.PRODUCT_ID)

            }
          }
        );
      } else {
        Toast.error(`Please Add Cart`);
      }
    }
  };

  const onChangeSalesExecutive = (e) => {
    const value = e?.values?.sales_executive_user_id?.value
      ? e?.values?.sales_executive_user_id?.value
      : "";
    setSelectedSalesExecutive(value);
    handleUpdate(order_id, { sales_executive_user_id: value })

    setCookie(
      Cookie.ORDER_SELECTED_SALESEXECUTIVE,
      e?.values?.sales_executive_user_id?.value
        ? e?.values?.sales_executive_user_id?.value
        : ""
    );
  };

  const onChangeAssignee = (e) => {
    const value = e
      ? e
      : "";
    setSelectedAssignee(value);
    handleUpdate(order_id, { delivery_executive: value })
  };

  const handleShiftChange = (values) => {
    const value = values?.values?.shift?.value
      ? values?.values?.shift?.value
      : "";

    SetShiftValue(value);
    handleUpdate(order_id, { shift: value })

    setCookie(
      Cookie.ORDER_SELECTED_SHIFT,
      values?.values?.shift?.value ? values?.values?.shift?.value : ""
    );
  };

  // Get Shift List
  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };

  const onChangePaymentValue = (x) => {
    const value = x?.values?.payment_type?.value;

    setPaymentValue(value);
    handleUpdate(order_id, { payment_type: value })

    setCookie(Cookie.ORDER_SELECTED_PAYMENT, x?.values?.payment_type?.value);
  };

  const onChangeSalesCustomer = (e) => {
    const value = e?.values?.customer_account
    setCustomerValue(value)
    handleUpdate(order_id, { customer_account: value?.id })

  }

  const handleCashAmount = (e) => {
    const value = e?.values?.cash_amount
    handleUpdate(order_id, { cash_amount: value })
    setCashAmountValue(value)
  }

  const handleUpiAmount = (e) => {
    const value = e?.values?.upi_amount
    handleUpdate(order_id, { upi_amount: value })
    setUpiAmountValue(value)
  }

  let salesExecutiveId = Cookies.get(Cookie.ORDER_SELECTED_SALESEXECUTIVE);

  let salesExecutives = salesExecutive.find(
    (data) => data.value == Cookies.get(Cookie.ORDER_SELECTED_SALESEXECUTIVE)
  )
    ? salesExecutive.find(
      (data) => data.value == Cookies.get(Cookie.ORDER_SELECTED_SALESEXECUTIVE)
    )
    : inActiveSaleExecutive.find((data) => data.value == salesExecutiveId);

  const initialValues = {
    location: storeValue ? location.find(
      (data) => data.id == storeValue
    ) : location.find(
      (data) => data.id == OrderDetail?.location?.id
    ),
    shift: shiftValue ? shiftList.find(
      (data) => data.id == shiftValue
    ) : shiftList.find(
      (data) => data.id == OrderDetail?.shift
    ),
    assignee: selectedAssignee ? selectedAssignee :
      usersList.find((option) => option?.id == OrderDetail?.delivery_executive ? (option) => option?.id == OrderDetail?.delivery_executive : ""),
    sales_executive_user_id: selectedSalesExecutive ? salesExecutive.find(
      (data) => data.value == selectedSalesExecutive) : OrderDetail ? salesExecutive.find(
        (data) => data.value == OrderDetail?.sales_executive_user_id) : salesExecutives,
    payment_type: paymentValue ? paymentType.find(
      (data) => data.value == paymentValue
    ) : OrderDetail ? paymentType.find(
      (data) => data.value == OrderDetail?.payment_type
    ) : paymentType.find(
      (data) => data.value == Cookies.get(Cookie.ORDER_SELECTED_PAYMENT)
    ),
    BrandSelect: brandData ? brandData : "",
    CategorySelect: categoryData ? categoryData : "",
    date: OrderDetail?.date ? DateTime.getDateTimeByUserProfileTimezone(OrderDetail?.date) : orderDate ? DateTime.getDateTimeByUserProfileTimezone(orderDate) : DateTime.getDateTimeByUserProfileTimezone(new Date()),
    customer_account: customerValue ? customerValue : customerList.find((data) => data?.id == customer),
    cash_amount: cashAmountValue ? cashAmountValue : OrderDetail?.cash_amount,
    upi_amount: upiAmountValue ? upiAmountValue : OrderDetail?.upi_amount
  };

  const handleSubmit = async () => {
    const createData = new FormData();
    createData.append("productIds", MultiSelectProduct);
    createData.append("orderId", order_id);
    createData.append("storeId", storeId);
    createData.append("order_number", orderNumber);

    if (order_id) {
      let response = await OrderProductService.create(createData);
      if (response) {
        Toast.success(response.data.message);
        setAddProductModal(false);
        setMultiSelectProduct("");
      }
      Dispatch(
        fetchList("order", `${endpoints().orderProductAPI}/search`, 1, 25, {
          orderId: order_id,
          isWeb: order_id ? true : false,
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
        })
      );
    } else {
      Toast.error("Order id Required");
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const addProductToggle = () => {
    setAddProductModal(false);
  };

  const multiselect = (values) => {
    setMultiSelectProduct(values);
    setCookie(Cookie.PRODUCT_ID, values);
  };

  const onSubmit = async (values) => {
    if (order_id || orderId) {
      let orderUpdateData = new Object();

      if (values.location) {
        orderUpdateData.storeId = values?.location?.id
          ? values?.location?.id
          : "";
      }
      if (values.payment_type) {
        orderUpdateData.payment_type = values?.payment_type?.value
          ? values?.payment_type?.value
          : "";
      }
      if (values.sales_executive_user_id) {
        orderUpdateData.sales_executive_user_id = values
          ?.sales_executive_user_id?.value
          ? values?.sales_executive_user_id?.value
          : "";
      }
      if (values.shift) {
        orderUpdateData.shift = values?.shift?.value;
      }
      if (values.date) {
        orderUpdateData.date = values.date ? values.date : "";
      }

      if (values?.cash_amount) {
        orderUpdateData.cash_amount = values?.cash_amount ? values?.cash_amount : ""
      }

      if (values?.upi_amount) {
        orderUpdateData.upi_amount = values?.upi_amount ? values?.upi_amount : ""
      }

      if (pathName == "/location/deliveryOrders/details" || pathName == "/deliveryOrder") {
        orderUpdateData.type = Order.TYPE_DELIVERY

        orderUpdateData.customer_account = values && values?.customer_account ? values?.customer_account?.id : ""
      } else {
        orderUpdateData.type = Order.TYPE_STORE

      }

      let response = await updateOrder(orderId, orderUpdateData, () => { });

      if (response && response.data) {
        Toast.success(response.data.message);
      }
    } else {
      let orderCreateData = new Object();

      if (values.location) {
        orderCreateData.storeId = values?.location?.id
          ? values?.location?.id
          : "";
      }
      if (values.payment_type) {
        orderCreateData.payment_type = values?.payment_type?.value
          ? values?.payment_type?.value
          : "";
      }
      if (values.date) {
        orderCreateData.date = values.date ? values.date : "";
      }

      if (values.shift) {
        orderCreateData.shift = values?.shift?.value;
      }

      if (values.sales_executive_user_id) {
        orderCreateData.sales_executive_user_id = values
          ?.sales_executive_user_id?.value
          ? values?.sales_executive_user_id?.value
          : "";
      }

      if (values?.cash_amount) {
        orderCreateData.cash_amount = values?.cash_amount ? values?.cash_amount : ""
      }

      if (values?.upi_amount) {
        orderCreateData.upi_amount = values?.upi_amount ? values?.upi_amount : ""
      }

      if (pathName == "/location/deliveryOrders/details") {
        orderCreateData.type = Order.TYPE_DELIVERY
        orderCreateData.customer_account = values && values?.customer_account ? values?.customer_account?.id : ""
      } else {
        orderCreateData.type = Order.TYPE_STORE

      }

      let response = await createOrder(orderCreateData);

      if (response && response.data) {
        const orderId = response.data.orderId;
        Toast.success(response.data.message);
        if (orderId) {
          setOrderId(orderId);
          setCookie(Cookie.ORDER_ID, orderId);
        }
      }
    }
  };

  const onStatusChange = (value) => {
    if (value) {
      OrderService.updateStatus(orderId, { status: value }, null, (res) => {
        if (res) {
          getOrderDetails(order_id)
          setEditable(true)
        }
      })
    }
  };

  const _handleTabChange = (tab) => {
    history.push(`?tab=${tab}`);
  };

  const bulkProductSelect = (selectedProduct) => {
    setSelectedProduct(selectedProduct);
  };

  const dropDownLinks = [
    {
      label: "Bulk Cancel",
      value: "Bulk Cancel",
    },
  ];

  const handleChange = async (selectedAction) => {
    if (selectedAction == "Bulk Cancel") {
      if (selectProduct) {
        let body = { orderProductList: selectProduct, orderId: orderId };
        Dispatch(
          await OrderProductService.bulkCancel(
            body,
            { orderId: orderId },
            (res) => {
              if (res) {
                Dispatch(
                  fetchList(
                    "order",
                    `${endpoints().orderProductAPI}/get`,
                    1,
                    25,
                    body,
                  )
                );
              }
            }
          )
        );
      }
    }
  };

  return (
    <div>
      <BreadCrumb list={breadcrumbList} />
      <div>
        <div className="d-flex justify-content-between">
          <PageTitle label={pathName == "/location/deliveryOrders/details" ? "Add New" : pathName == "/deliveryOrder" && props?.match?.params?.id ? `Delivery Order #${orderNumber}` : pathName == "/order" && props?.match?.params?.id ? `Order #${orderNumber}` : "New Orders"} />
          <div className="d-flex justify-content-around">
            <>
              {showEditButton && editable && props?.match?.params?.id &&
                <div style={{ maxHeight: "20px" }}>
                  <Button
                    label="Edit"
                    loadingLabel="Editable"
                    className="mr-1"
                    disabled={editable == false ? true : false}
                    onClick={() => {
                      setEditable(false);
                    }}
                  />
                </div>
              }
              {props?.match?.params?.id && (

                <Status
                  objectName={ObjectName.ORDER}
                  handleChange={onStatusChange}
                  buttonLabel={OrderDetail?.statusDetail?.name}
                  currentStatusId={OrderDetail?.status}
                  disabled={editable}
                />
              )}

              <AddButton
                label={"Add New"}
                className="mx-2 p-2"
                onClick={() => {
                  setAddProductModal(true);
                }}
              />
              {props?.match?.params?.id ? "" :
                <div style={{ maxHeight: "20px" }}>
                  <Button
                    onClick={completeOrder}
                    label="Complete Order"
                    disabled={editable}
                  />
                </div>
              }
              <div className=" ml-2">
                <Action
                  buttonLabel={""}
                  dropdownLinks={dropDownLinks}
                  handleChange={handleChange}
                />
              </div>
            </>
          </div>

          {windowSize.innerWidth < 576 ? (
            <Button label="Cart" className="mb-2" onClick={toggleCard} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <Nav tabs className="admin-tabs">
          {/* Detail Tab */}
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.SUMMARY,
              })}
              onClick={() => {
                tabToggle(Tab.SUMMARY);
                _handleTabChange(Tab.SUMMARY);

              }}
            >
              {Tab.SUMMARY}
            </NavLink>
          </NavItem>
          <NavItem>
            {history && (
              <NavLink
                className={classNames({
                  active: activeTab === Tab.HISTORY,
                })}
                onClick={() => {
                  tabToggle(Tab.HISTORY);
                  _handleTabChange(Tab.HISTORY);
                }}
              >
                {Tab.HISTORY}
              </NavLink>
            )}
          </NavItem>
        </Nav>
      </div>

      <Form
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <TabContent activeTab={activeTab}>
          <TabPane tabId={Tab.SUMMARY} className="w-100">
            <GeneralTab
              paymentType={paymentType}
              selectedDate={orderDate}
              orderDateFieldOnchange={orderDateFieldOnchange}
              storeFieldOnchange={storeFieldOnchange}
              storeOption={location}
              shiftOption={shiftList}
              orderId={orderId}
              handleShiftChange={handleShiftChange}
              onChangeAssignee={onChangeAssignee}
              salesExecutiveOption={salesExecutive}
              onChangeSalesExecutive={onChangeSalesExecutive}
              onChangePaymentValue={onChangePaymentValue}
              history={history}
              customerList={customerList}
              pathName={pathName}
              onChangeSalesCustomer={onChangeSalesCustomer}
              handleCashAmount={handleCashAmount}
              handleUpiAmount={handleUpiAmount}
              editable={editable}
            />

            <ProductTab
              id="order"
              history={history}
              params={{ orderId: order_id }}
              apiURL={`${endpoints().orderProductAPI}/get`}
              orderId={order_id}
              showStatusColumn
              showBulkSelect={true}
              bulkSelect={bulkProductSelect}
            />
          </TabPane>

          <TabPane tabId={Tab.HISTORY} className="w-100">
            <ActivityList
              id={order_id}
              objectId={order_id}
              object_name={ObjectName.ORDER}
              history={history}
            />
          </TabPane>
        </TabContent>
      </Form>

      <ProductSelectModal
        modalOpen={modelOpen}
        toggle={toggleOpen}
        toggleModalClose={addProductToggle}
        handleSubmit={handleSubmit}
        BulkSelect={multiselect}
        history={history}
        params={{ store_id: storeId }}
      />
    </div>
  );
};

export default AddProducts;
