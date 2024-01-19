// Classnames
import classNames from "classnames";

// React
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// Components
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";

// Detail Tabs
import GeneralTab from "./components/GeneralTab";
import StateTab from "./components/StateTab"

// Apiclient
import CountryService from "../../services/CountryService";
import DeleteModal from "../../components/DeleteModal";
import { useDispatch } from "react-redux";
import { deleteCountry } from "../../actions/country";
import Text from "../../components/Text";
import Button from "../../components/Button";
import AddModal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import AddButton from "../../components/AddButton";
import Action from "../../components/Action";

// Tabs Constants
export const Tab = { GENERAL: "General", STATE: "State" };

// Country detail page
const CountryDetail = (props) => {
  // useState
  const [countryDetail, setCountryDetail] = useState([]);
  const [activeTab, setActiveTab] = useState(Tab.GENERAL);
  const [deleteModal, setDeleteModal] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    getCountryDetail();
  }, []);

  // Breadcrumb
  const breadcrumbList = [
    { label: "Settings", link: "/Setting/Countries  " },
    {
      label: "Countries",
      link: "/Setting/Countries",
    },
    {
      label: activeTab,
      link: "",
    },
  ];

  const handledelete = (id) => {
    dispatch(deleteCountry(id, {}));
    props.history.push("/Setting/Countries")
  };

  // Getting country details
  const getCountryDetail = async () => {
    {
      let id = props.match.params.id;
      const response = await CountryService.get(id);
      setCountryDetail(response);
    }
  };

  // Toggling the tabs
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // Handling the tabs change
  const handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  //Get Country Name
  const countryName = countryDetail?.country_name;

  const addAccountEntryForm = (
    <Text
      name="state"
      label="Add State"
      placeholder="Enter state..."
      error=""
    />
  );

  if (isLoading) {
    return <Spinner />
  }

  const accountEntryFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button type="submit" label="Add" className="h6-5-important" />
      </div>
    </div>
  );

  const handleCreate = async (data) => {
    try {
      const countryId = props.match.params.id;
      data.state = data?.state,
        data.countryId = countryId,
        setIsLoading(true);
      await CountryService.statecreate(data, countryId);
      setIsLoading(false);
      addToggle();
    } catch (error) {
    }
  };

  const addToggle = () => {
    setIsOpen(!isOpen);
  };

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
      {/* Breadcrumb */}
      <BreadCrumb list={breadcrumbList} />

      {/* Page Title */}
      <div className="d-flex justify-content-between">
        <PageTitle
          label="Country Detail"
        />

        <div className="d-flex">
          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
          {activeTab === Tab.STATE && <AddButton
            label="Add"
            className="pull-right btn btn-secondary h6-5-important font-weight-bold ml-2"
            onClick={() => {
              addToggle();
            }}

          />}
        </div>
      </div>

      <AddModal
        isOpen={isOpen}
        toggle={addToggle}
        toggleModalClose={addToggle}
        modalTitle="Add State"
        modalBody={addAccountEntryForm}
        modalFooter={accountEntryFooter}
        initialValues={{
          date: new Date(),
          type: "",
          description: "",
          amount: "",
          bank_description: "",
          bank: "",
          status: "",
          notes: "",

        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          handleCreate(values);
        }}
        hideDefaultButtons
      />

      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Country"
        id={countryDetail?.id}
        label={countryDetail?.country_name}
        deleteFunction={handledelete}
      />

      {/* Tab navigations */}
      <Nav tabs className="admin-tabs">
        {/* General tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.GENERAL,
            })}
            onClick={() => {
              toggle(Tab.GENERAL);
              handleTabChange(Tab.GENERAL);
            }}
          >
            {Tab.GENERAL}
          </NavLink>
        </NavItem>

        {/* State tab  */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.STATE,
            })}
            onClick={() => {
              toggle(Tab.STATE);
              handleTabChange(Tab.STATE);
            }}
          >
            {Tab.STATE}
          </NavLink>
        </NavItem>
      </Nav>

      {/* Tab contents */}
      <TabContent activeTab={activeTab}>
        {/* General tab */}
        <TabPane tabId={Tab.GENERAL}>
          <GeneralTab history={props.history} countryDetail={countryDetail} />
        </TabPane>

        <TabPane tabId={Tab.STATE}>
          {activeTab == Tab.STATE && (
            <StateTab
              history={props.history}
              countryDetail={countryDetail}
              countryId={props.match.params.id}
            />
          )}
        </TabPane>
      </TabContent>
    </>
  );
};

export default CountryDetail;
