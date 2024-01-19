import classnames from "classnames";
import BreadCrumb from "../../components/Breadcrumb";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
//Configs
import { apiClient } from "../../apiClient";
//Icons
import { ChevronLeft } from "../../assets/icons";
import { isBadRequest } from "../../lib/Http";
import DeleteModal from "../../components/DeleteModal";
// Components
import PageTitle from "../../components/PageTitle";
import SelectDropdown from "../../components/SelectDropdown";
import Spinner from "../../components/Spinner";
import Toast from "../../components/Toast";
import { endpoints } from "../../api/endPoints";
import * as companyConstants from "../../helpers/Company";

import GeneralTab from "./Components/GeneralTab";
import ConatctDetailTab from "./Components/ContactTab";
import SocialLinksTab from "./Components/SocialLinksTab";
import DeleteButton from "../../components/DeleteButton";
import { portalTemplate } from "../../helpers/Support";
import ObjectName from "../../helpers/ObjectName";

// Lib
import Url from "../../lib/Url";
import { deleteMediaById } from "../../actions/media";
import Features from "../setting/components/Features";
import CompanyService from "../../services/CompanyService";
import Action from "../../components/Action";

// General Tab
export const Tab = { GENERAL_TAB: "GENERAL" };

const CompanyDetails = (props) => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [logoUrl, setLogoUrl] = useState();
  const [logoFile, setLogoFile] = useState();

  //Tab constants
  const GENERAL_TAB = "Detail";
  const FEATURES_TAB = "Features";
  const [activeTabs, setActiveTabs] = useState(GENERAL_TAB);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedCountryName, setSelectedCountryName] = useState();
  const [selectedCountryId, setSeletedCountryId] = useState();
  const [status, setStatus] = useState();
  const [fileName, setFileName] = useState();

  // set Social Links
  const [faceBookUrl, setFaceBookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedInUrl, setInkedInUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState("");

  const dispatch = useDispatch();
  const logoRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    getCompanyDetail();
  }, []);



  //Visibility Status
  const statusOptions =
    status === ""
      ? [
          {
            value: "Active",
            label: "Active",
          },
          {
            value: "InActive",
            label: "InActive",
          },
        ]
      : status !== "InActive"
      ? [
          {
            value: "InActive",
            label: "InActive",
          },
        ]
      : [
          {
            value: "Active",
            label: "Active",
          },
        ];

  //Get Company Detail
  const getCompanyDetail = async () => {
    let id = props.match.params.id;
    try {
      const data = await CompanyService.get(id)

      setCompanyData(data);
      setStatus(data.status);
      setSelectedCountryName(data.country);
      setFaceBookUrl(data.facebook_url);
      setInstagramUrl(data.instagram_url);
      setInkedInUrl(data.linkedIn_url);
      setTwitterUrl(data.twitter_url);
      setYouTubeUrl(data.youtube_url);
      if (data && data.country && data.message) {
        getCountryDetails(data.country);
      }
      setIsLoading(false);
    } catch (error) {
      if (isBadRequest(error)) {
        setIsLoading(false);
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  // const toggle = (tab) => {
  //   setActiveTabs(tab);
  // };

  // Toggling the tabs and modals in respective tab
  const handleTabs = (tab) => {
    setActiveTabs(tab);
  };

  const handleStatusChange = (status) => {
    const id = props.match.params.id;
    updateCompanyStatus(id, status);
    setStatus(status);
  };

  const _handleSectionChange = (tab) => {
    history.push(`?tab=${tab}`);
  };

  const companyLogoChange = (e) => {
    companyLogoUpload(e);
  };
  const companyLogoUpload = (e) => {
    const files = e.target.files ? e.target.files[0] : "";
    const fileName = files.name;
    if (files) {
      setLogoUrl(files);
      setLogoFile(files);
      setFileName(fileName);
    }
  };

  // Set image preview in state
  const setBase64Image = (file, value) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      value(reader.result);
    };
  };

  // Portal logo image remove
  const userImageRemove = () => {
    if (companyData.company_logo) {
      let id = companyData.media_id;
      handleLogoRemove(id, companyData.company_logo);
    }
    logoRef.current.value = "";
    setLogoUrl("");
    setLogoFile("");
  };
  const handleLogoRemove = async (id) => {
    let params = {
      object_id: companyData.id,
      object_name: ObjectName.COMPANY,
      pagination: true,
    };
    dispatch(deleteMediaById(id, params));
  };

  const updateCompanyStatus = (id, status) => {
    let data = {};
    data.status = status;
    return apiClient
      .put(`${endpoints().companyAPI}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(error.response.data.message);
        }
      });
  };
  // set logo url
  const companyLogoUrl = logoUrl ? logoUrl : companyData.company_logo;

  //social link fun
  const faceBookFun = (e) => {
    setFaceBookUrl(e.target.value);
  };

  const instagramFun = (e) => {
    setInstagramUrl(e.target.value);
  };

  const linkedInFun = (e) => {
    setInkedInUrl(e.target.value);
  };

  const twitterFun = (e) => {
    setTwitterUrl(e.target.value);
  };

  const youTubFun = (e) => {
    setYouTubeUrl(e.target.value);
  };

  // Handle Country
  const handleCountryChange = ({ values }) => {
    const selectedOption = values.country && values.country.id;
    const selectedCountryName = values.country && values.country.label;
    setSelectedOption(selectedOption);
    setSelectedCountryName(selectedCountryName);
  };

  // Get Country Details
  const getCountryDetails = async (countryName) => {
    const response = await apiClient.get(
      `${endpoints().countryAPI}/${countryName}`
    );
    const data = response.data;
    setSeletedCountryId(data.id);
  };

  /**
   * Delete Store
   *
   * @param data
   */

  const companyDelete = (id) => {
    dispatch(CompanyService.delete(id, {}, history,dispatch));
  };

  //Handle Update Store Details
  const handleUpdate = async (values) => {
    const data = new FormData();
    data.append(
      "company_name",
      values && values.company_name ? values.company_name : ""
    );
    data.append("status", status ? status : "Active");
    data.append(
      "websiteurl",
      values && values.websiteurl ? values.websiteurl : ""
    );
    data.append(
      "description",
      values && values.description ? values.description : ""
    );
    data.append("address1", values && values.address1 ? values.address1 : "");
    data.append("address2", values && values.address2 ? values.address2 : "");
    data.append("city", values && values.city ? values.city : "");
    data.append(
      "country",
      values && values.country ? values.country.value : ""
    );
    data.append("email", values && values.email ? values.email : "");
    data.append("files", logoFile ? logoFile : "");
    data.append(
      "mobileNumber1",
      values && values.mobileNumber1 ? values.mobileNumber1 : ""
    );
    data.append(
      "mobileNumber2",
      values && values.mobileNumber2 ? values.mobileNumber2 : ""
    );
    data.append("pin_code", values && values.pin_code ? values.pin_code : "");
    data.append("state", values && values.state ? values.state.value : "");
    data.append("facebook_url", faceBookUrl ? faceBookUrl : "");
    data.append("instagram_url", instagramUrl ? instagramUrl : "");
    data.append("twitter_url", twitterUrl ? twitterUrl : "");
    data.append("linkedIn_url", linkedInUrl ? linkedInUrl : "");
    data.append("youtube_url", youTubeUrl ? youTubeUrl : "");

    data.append(
      "portal_url",
      values && values.portal_url ? values.portal_url : ""
    );

    data.append(
      "portal_api_url",
      values && values.portal_api_url ? values.portal_api_url : ""
    );
    data.append(
      "template",
      values && values.template && values.template.value
        ? values.template.value
        : ""
    );

    data.append("fileName", fileName ? fileName : "");

    data.append("object_name", ObjectName.COMPANY);

    await CompanyService.updateCompany(values.id, data, {});

    getCompanyDetail();

    setCompanyData(values);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const initialValue = {
    ...companyData,
    company_name: companyData.company_name || "",
    status: companyData.status || "",
    websiteurl: companyData.websiteurl || "",
    description: companyData.description || "",
    email: companyData.email || "",
    company_logo: companyData.company_logo || "",
    mobileNumber1: companyData.mobileNumber1 || "",
    mobileNumber2: companyData.mobileNumber2 || "",
    address1: companyData.address1 || "",
    address2: companyData.address2 || "",
    city: companyData.city || "",
    portal_api_url: companyData.portal_api_url || "",
    state: {
      label: companyData.state,
      value: companyData.state,
    },
    country: {
      label: companyData.country,
      value: companyData.country,
    },
    pin_code: companyData.pin_code || "",
    portal_url: companyData.portal_url || "",
    template:
      portalTemplate.find(
        (template) => template.value == companyData.template
      ) || "",
  };
  const breadcrumbList = [
    { label: "Home", link: "/supportPortal/dashboard" },
    { label: "Company", link: "/supportPortal/company" },
    { label: "Detail", link: "" },
  ];

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
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
        title="Delete Company"
        id={companyData.id}
        label={companyData.company_name}
        deleteFunction={companyDelete}
      />

     
  
      {/* Breadd Crumb Section */}
      <BreadCrumb list={breadcrumbList} />
 {/* /.page-heading */}
      <div className="row">
        <div className="mt-3">
          <PageTitle label={initialValue.company_name} />
          {/* <PageTitle label="Company Details"/> */}
        </div>

        <div className="ml-auto mt-2 mr-3">
          <div className="d-flex align-items-center">
            <div className="mr-2 w-80">
              <SelectDropdown
                buttonLabel="Status"
                visible="visible"
                dropdownLinks={statusOptions}
                color={"gray"}
                hideCaret
                selectName={"Status"}
                handleChange={handleStatusChange}
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
      </div>

      {/* Nav Section for userRole detail tabs navigation */}
      <Nav tabs className="admin-tabs mt-2">
        {/* General Tab */}
        <NavItem>
          <NavLink
          className={classnames({
            active: activeTabs === GENERAL_TAB,
          })}
          onClick={() => {
            handleTabs(GENERAL_TAB);
          }}
          >
            {GENERAL_TAB}
          </NavLink>
        </NavItem>

        {/* Company Tab */}
        <NavItem>
          <NavLink
          className={classnames({
            active: activeTabs === FEATURES_TAB,
          })}
          onClick={() => {
            handleTabs(FEATURES_TAB);
          }}
          >
            {FEATURES_TAB}
          </NavLink>
        </NavItem>
      </Nav>

      {/* UserRoleTab sections */}
      <TabContent activeTab={activeTabs}>
        <TabPane tabId={GENERAL_TAB}>
          {/* General tab */}

          <GeneralTab
            history={history}
            handleUpdate={handleUpdate}
            initialValue={initialValue}
            companyLogoChange={companyLogoChange}
            companyData={companyData}
            logoRef={logoRef}
            companyLogoUrl={companyLogoUrl}
            userImageRemove={userImageRemove}
          />
        </TabPane>

        {/* Company Tab */}
        <TabPane tabId={FEATURES_TAB}>

      <Features companyData = {companyData} />
        </TabPane>
      </TabContent>
    </>
  );
};
export default CompanyDetails;
