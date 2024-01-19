import ordersIcon from "../assets/icons/orders.svg";
import customersIcon from "../assets/icons/costumers.svg";
import dashboardIcon from "../assets/icons/dashboard.svg";
import productIcon from "../assets/icons/product.svg";
import storeIcon from "../assets/icons/store.svg";

export function getCommerceNavList() {
  let arrayList = [];

  arrayList = arrayList.concat({
    name: "Dashboard",
    url: "/commerce/dashboard",
    icon: dashboardIcon,
  });

  arrayList = arrayList.concat({
    name: "Orders",
    url: "/commerce/orders",
    detailsPageurl: "/commerce/order/detail",
    icon: storeIcon,
  });

  arrayList = arrayList.concat({
    name: "Customers",
    url: "/commerce/customers",
    detailsPageurl: "/commerce/customer/detail",
    icon: ordersIcon,
  });

  arrayList = arrayList.concat({
    name: "Products",
    url: "/commerce/products",
    detailsPageurl: "/commerce/product/detail",
    icon: productIcon,
  });

  arrayList = arrayList.concat({
    name: "Stores",
    url: "/commerce/stores",
    detailsPageurl: "/commerce/store/detail",
    icon: customersIcon,
  });

  return arrayList;
}
