// React
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// Components
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";

// Apiclient
import DeleteModal from "../../components/DeleteModal";
import { useDispatch } from "react-redux";
import { deleteCountry } from "../../actions/country";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import GeneralTab from "./component/GeneralTab";
import LoyaltyCategoryService from "../../services/loyaltyCategoryService";

// Tabs Constants
export const Tab = { GENERAL: "General" };

// Country detail page
const CategoryDetail = (props) => {
  // useState
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [activeTab, setActiveTab] = useState(Tab.GENERAL);
  const [deleteModal, setDeleteModal] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    getCategoryDetail();
  }, []);

  // Breadcrumb
  const breadcrumbList = [
    { label: "Settings", link: "/Setting/Loyalty  " },
    {
      label: "Loyalty",
      link: "/Setting/Loyalty",
    },
    {
      label: activeTab,
      link: "",
    },
  ];

  const handledelete = (id) => {
    dispatch(deleteCountry(id, {}));
    props.history.push("/Setting/Loyalty")
  };

  // Getting country details
  const getCategoryDetail = async () => {
    {
      let id = props.match.params.id;
      const response = await LoyaltyCategoryService.get(id);
      setCategoryDetail(response);
    }
  };

  // Toggling the tabs
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return <Spinner />
  }

  const addToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Breadcrumb */}
      <BreadCrumb list={breadcrumbList} />

      {/* Page Title */}
      <div className="d-flex justify-content-between">
        <PageTitle
          label="Category Detail"
        />
      </div>

      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Category"
        id={categoryDetail?.id}
        label={categoryDetail?.name}
        deleteFunction={handledelete}
      />

      <GeneralTab history={props.history} categoryDetail={categoryDetail} />
      
    </>
  );
};

export default CategoryDetail;
