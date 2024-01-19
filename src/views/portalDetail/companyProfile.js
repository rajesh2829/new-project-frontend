import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import DefaultContent from "../../components/content/defaultContent";
import AddressDetailTab from "./AddressTab";
import ConatctDetailTab from "./contactTab";
import SocialLinksTab from "./socialLinksTab";

//Service
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Select from "../../components/Select";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import Url from "../../components/Url";
import { portalTemplate } from "../../helpers/Support";

// Lib
import Urls from "../../lib/Url";

// Configs
import { endpoints } from "../../api/endPoints";

// API call
import { apiClient } from "../../apiClient";
import AddButton from "../../components/AddButton";
import AvatarCard from "../../components/AvatarCard";
import DeleteModal from "../../components/DeleteModal";
import Spinner from "../../components/Spinner";
import ObjectName from "../../helpers/ObjectName";
import { isBadRequest } from "../../lib/Http";
import AddressService from "../../services/AddressService";
import CompanyService from "../../services/CompanyService";

// Tabs Constants
export const Tab = {
  GENERAL_TAB: "GENERAL",
  CONTACT_DETAILS: "Contact Details",
  SOCIAL_LINKS: "Social Links",
  ADDRESS: "Address",
};

const CompanyProfile = (props) => {
  const { history } = props;

  const [companyData, setCompanyData] = useState("");
  const [logoUrl, setLogoUrl] = useState();
  const [logoFile, setLogoFile] = useState();
  const [activeTab, setActiveTab] = useState(
    Urls.GetParam("tab") || Tab.GENERAL_TAB
  );
  const [selectedOption, setSelectedOption] = useState();
  const [selectedCountryName, setSelectedCountryName] = useState();
  const [selectedCountryId, setSeletedCountryId] = useState();
  const [status, setStatus] = useState();

  // set Social Links
  const [faceBookUrl, setFaceBookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedInUrl, setInkedInUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState("");
  const [fileName, setFileName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [AddressOpen, setAddressOpen] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [addressId, setAddressId] = useState(false);
  const [address, setAddress] = useState(false);
  const [row, setRow] = useState(false);
  const [title, setTitle] = useState(false);

  const AddressSelectModal = () => {
    setAddressOpen(!AddressOpen);
    setRow("");
  };

  const EditModal = (id) => {
    setAddressOpen(!AddressOpen);
  };

  const logoRef = useRef();
  useEffect(() => {
    getCompanyDetail();
    setIsLoading(true);
  }, []);

  const dispatch = useDispatch();

  const companyLogoUrl = logoUrl ? logoUrl : "";

  //Handle Update Store Details
  const handleUpdate = async (values) => {
    const data = new FormData();
    data.append(
      "company_name",
      values && values.company_name ? values.company_name : ""
    );
    data.append("email", values && values.email ? values.email : "");
    data.append("city", values && values.city ? values.city : "");
    data.append(
      "mobileNumber1",
      values && values.mobileNumber1 ? values.mobileNumber1 : ""
    );
    data.append(
      "mobileNumber2",
      values && values.mobileNumber2 ? values.mobileNumber2 : ""
    );
    data.append("address1", values && values.address1 ? values.address1 : "");
    data.append("gst_number", values && values.gst_number ? values.gst_number : "");
    data.append("address2", values && values.address2 ? values.address2 : "");
    data.append("facebook_url", faceBookUrl ? faceBookUrl : "");
    data.append("instagram_url", instagramUrl ? instagramUrl : "");
    data.append("twitter_url", twitterUrl ? twitterUrl : "");
    data.append("linkedIn_url", linkedInUrl ? linkedInUrl : "");
    data.append("youtube_url", youTubeUrl ? youTubeUrl : "");
    data.append("pin_code", values && values.pin_code ? values.pin_code : "");
    data.append("state", values && values.state ? values.state : "");
    data.append(
      "websiteurl",
      values && values.portal_url ? values.portal_url : ""
    );
    data.append(
      "description",
      values && values.description ? values.description : ""
    );
    // data.append("files", logoFile ? logoFile : "");

    data.append(
      "portal_url",
      values && values.portal_url ? values.portal_url : ""
    );

    data.append(
      "template",
      values && values.template && values.template.value
        ? values.template.value
        : ""
    );
    data.append("fileName", fileName ? fileName : "");
    data.append("object_name", ObjectName.COMPANY);
    data.append("country", values?.country?.value);
    data.append("state", values?.state?.value);
    await CompanyService.update(values.id, data, {}, dispatch);
  };

  //Get Company Detail
  const getCompanyDetail = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `${endpoints().companyAPI}`
      );
      const data = response.data;
      setCompanyData(data);
      setLogoUrl(data.company_logo);
      setStatus(data.status);
      setSelectedCountryName(data.country ? data.country : "");
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

  if (isLoading) {
    return <Spinner />;
  }

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // Handle Country
  const handleCountryChange = (values) => {
    const selectedOption = values && values.id;
    const selectedCountryName = values && values.label;
    setSelectedOption(selectedOption);
    setSelectedCountryName(selectedCountryName);
  };

  const _handleTabChange = (tab) => {
    history.push(`?tab=${tab}`);
  };

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

  const initialValue = {
    ...companyData,
    company_name: companyData.company_name || "",
    status: companyData.status || "",
    websiteurl: companyData.websiteurl || "",
    description: companyData.description || "",
    email: companyData.email || "",
    facebook_url: companyData.facebook_url || "",
    mobileNumber1: companyData.mobileNumber1 || "",
    gst_number: companyData.gst_number || "",
    portal_url: companyData.portal_url || "",
    country: {
      label: companyData.country,
      value: companyData.country,
    },
    state: {
      label: companyData.state,
      value: companyData.state,
    },
    template:
      portalTemplate.find(
        (template) => template.value == companyData.template
      ) || "",
  };

  const initialValues = {
    name: row.name ? row.name : "",
    title: row.title ? row.title : "",
    address1: row.address1 ? row.address1 : "",
    address2: row.address2 ? row.address2 : "",
    phone_number: row.phone_number ? row.phone_number : "",
    city: row.city ? row.city : "",
    state: {
      label: row?.state ? row?.state : "" || "",
      value: row?.state ? row?.state : "" || "",
    },
    country: {
      label: row?.country || "",
      value: row?.country || "",
    },
    pin_code: row.pin_code ? row.pin_code : "",
    gst_number: row.gst_number ? row.gst_number : "",
    latitude: row?.latitude ? row?.latitude : "",
    longitude: row?.longitude ? row?.latitude : "",
  };

  const handleSubmit = async (values) => {
    const data = new FormData();
    if (!row.id) {
      data.append("name", values && values.name ? values.name : "");
      data.append("phone_number", values && values.phone_number);
      data.append("address1", values && values.address1 ? values.address1 : "");
      data.append("address2", values && values.address2 ? values.address2 : "");
      data.append("pin_code", values && values.pin_code ? values.pin_code : "");
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
      data.append("title", values && values.title ? values.title : "");
      let params = {
        object_id: companyData ? companyData.id : "",
        objectName: ObjectName.COMPANY,
      };
      dispatch(AddressService.add(data, params, AddressSelectModal));
    } else {
      data.append("name", values && values.name ? values.name : "");
      data.append("phone_number", values && values.phone_number);
      data.append("address1", values && values.address1 ? values.address1 : "");
      data.append("address2", values && values.address2 ? values.address2 : "");
      data.append("pin_code", values && values.pin_code ? values.pin_code : "");
      data.append(
        "country",
        values && values.country.value ? values.country.value : ""
      );
      data.append("state", values && values.state ? values.state.value : "");
      data.append("city", values && values.city ? values.city : "");
      data.append("gst_number", values && values.gst_number);
      data.append("title", values && values.title ? values.title : "");
      data.append("id", row.id);
      let params = {
        object_id: companyData ? companyData.id : "",
        objectName: ObjectName.COMPANY,
      };
      dispatch(
        await AddressService.update(row.id, data, params, AddressSelectModal())
      );
    }
  };

  const hanldeDelete = (id) => {
    dispatch(
      AddressService.Delete(id, {
        pagination: true,
        sort: "id",
        sortDir: "DESC",
        search: Urls.GetParam("search") || "",
        page: Urls.GetParam("page") || "",
        pageSize: Urls.GetParam("pageSize") || "",
        object_id: companyData ? companyData.id : "",
        objectName: ObjectName.COMPANY,
      })
    );
    setIsDeleteModel(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <PageTitle label="Company Profile" />
        {activeTab == Tab.ADDRESS && (
          <AddButton label="Add" onClick={AddressSelectModal} />
        )}
      </div>
      
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Delete Address"
        label={title}
        deleteFunction={() => hanldeDelete(addressId)}
      />

      <Nav tabs className="admin-tabs mb-1">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.GENERAL_TAB,
            })}
            onClick={() => {
              toggle(Tab.GENERAL_TAB);
              _handleTabChange(Tab.GENERAL_TAB);
            }}>
            General
          </NavLink>
        </NavItem>
        {/* Contact detail Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.CONTACT_DETAILS,
            })}
            onClick={() => {
              toggle(Tab.CONTACT_DETAILS);
              _handleTabChange(Tab.CONTACT_DETAILS);
            }}>
            Contact Details
          </NavLink>
        </NavItem>
        {/* Socila Link tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.SOCIAL_LINKS,
            })}
            onClick={() => {
              toggle(Tab.SOCIAL_LINKS);
              _handleTabChange(Tab.SOCIAL_LINKS);
            }}>
            Social Links
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.ADDRESS,
            })}
            onClick={() => {
              toggle(Tab.ADDRESS);
              _handleTabChange(Tab.ADDRESS);
            }}>
            Address
          </NavLink>
        </NavItem>
      </Nav>

      {/* General tab */}
      <TabContent activeTab={activeTab}>
        {activeTab === Tab.GENERAL_TAB && (
          <TabPane tabId={Tab.GENERAL_TAB}>
            <DefaultContent>
              <Form
                enableReinitialize={true}
                initialValues={{
                  ...initialValue,
                }}
                onSubmit={(values) => {
                  handleUpdate(values);
                }}>
                <div className="card bg-white mt-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <div className="row field-wrapper">
                          <div className="col-lg-12 col-sm-12">
                            <Text
                              className="w-100"
                              id="company_name"
                              name="company_name"
                              label="Company Name"
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="row field-wrapper">
                          <div className="col-lg-12 col-sm-12">
                            <Text
                              className="w-100"
                              id="portal_url"
                              name="portal_url"
                              label="Portal Url"
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="row field-wrapper">
                          <div className="col-lg-12 col-sm-12">
                            <Text
                              className="w-100"
                              id="gst_number"
                              name="gst_number"
                              label="GST Number"
                              required={true}
                            />
                          </div>
                        </div>

                        <div className="row field-wrapper">
                          <div className="col-lg-12 col-sm-12">
                            <Select
                              name="template"
                              label="Template"
                              placeholder="Select Template..."
                              options={portalTemplate}
                              error=""
                              required={true}
                            />
                          </div>
                        </div>

                        <div className="row field-wrapper">
                          <div className="col-lg-12 col-sm-12">
                            <Url
                              id="websiteurl"
                              name="websiteurl"
                              label="Website Url"
                            />
                          </div>
                        </div>
                        <div className="row field-wrapper">
                          <div className="col-lg-12 col-sm-12">
                            <TextArea
                              name="description"
                              label="About"
                              placeholder="Enter Description..."
                            />
                          </div>
                        </div>
                      </div>
                      {companyLogoUrl && (
                        <div className="align-items-center m-auto">
                          <AvatarCard
                            url={companyLogoUrl}
                            square
                            customSize="300px"
                          />
                        </div>
                      )}
                    </div>
                    <HorizontalSpace bottom="2">
                      <SaveButton label="Save" />
                    </HorizontalSpace>
                  </div>
                </div>
              </Form>
            </DefaultContent>
          </TabPane>
        )}

        {/* Contact details tab*/}
        {activeTab === Tab.CONTACT_DETAILS && (
          <TabPane tabId={Tab.CONTACT_DETAILS}>
            <ConatctDetailTab
              history={history}
              handleUpdate={handleUpdate}
              initialValue={initialValue}
              selectedOption={selectedOption}
              selectedCountryId={selectedCountryId}
              selectedCountryName={selectedCountryName}
              handleCountryChange={handleCountryChange}
            />
          </TabPane>
        )}

        {/* Socila links */}
        {activeTab === Tab.SOCIAL_LINKS && (
          <TabPane tabId={Tab.SOCIAL_LINKS}>
            <SocialLinksTab
              history={history}
              handleUpdate={handleUpdate}
              initialValue={initialValue}
              faceBookFun={faceBookFun}
              faceBookUrl={faceBookUrl}
              instagramFun={instagramFun}
              instagramUrl={instagramUrl}
              linkedInFun={linkedInFun}
              linkedInUrl={linkedInUrl}
              twitterFun={twitterFun}
              twitterUrl={twitterUrl}
              youTubFun={youTubFun}
              youTubeUrl={youTubeUrl}
            />
          </TabPane>
        )}
        {activeTab === Tab.ADDRESS && (
          <TabPane tabId={Tab.ADDRESS}>
            <AddressDetailTab
              history={history}
              initialValue={initialValues}
              selectedOption={selectedOption}
              selectedCountryId={selectedCountryId}
              selectedCountryName={selectedCountryName}
              handleCountryChange={handleCountryChange}
              AddressOpen={AddressOpen}
              AddressSelectModal={AddressSelectModal}
              handleSubmit={handleSubmit}
              setIsDeleteModel={setIsDeleteModel}
              setAddressId={setAddressId}
              setAddress={setAddress}
              EditModal={EditModal}
              setRow={setRow}
              setTitle={setTitle}
              id={row.id}
              object_id={companyData ? companyData.id : ""}
              objectName={ObjectName.COMPANY}
              newTableHeading
            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default CompanyProfile;
