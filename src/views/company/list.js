import classNames from "classnames";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import CountBadge from "../../components/CountBadge";
import {
  Button,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { fetchList } from "../../actions/table";
import { bindActionCreators } from "redux";
import MoreDropdown from "../../components/authentication/moreDropdown";
import PageTitle from "../../components/PageTitle";
// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Text from "../../components/Text";
//Config
import { endpoints } from "../../api/endPoints";

import { Status } from "../../helpers/Company";
import AddModal from "../../components/Modal";
import "../../scss/_custom.scss";
import CompanyService from "../../services/CompanyService";

// Company Tabs
export const Tab = {
  ACTIVE: "Active",
  INACTIVE: "InActive",
  ALL: "All",
}

const activeCompanies = "Active";
const inActiveCompanies = "InActive";
const allCompanies = "All";

const CompanyList = (props) => {
  const param = new URLSearchParams(props.history.location.search);
  const selectedTab = param.get("section");
  const { history, ActiveCompanies, InActiveCompanies, AllCompanies } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [currentData, setCurrentData] = useState();
  const [activeTab, setActiveTab] = useState(
    selectedTab ? selectedTab : Tab.ACTIVE
  );

  const _handleStatusChange = (tabStatus) => {
    props.history.push(`/supportPortal/company?section=${tabStatus}`);
  };

  // Toggle Tab
  const tabChange = (tab) => {
    setActiveTab(tab);
  };

  const sortByOption = [
    {
      value: "company_name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const dispatch = useDispatch();

  //Toggle
  const toggle = (id) => {
    if (id) {
      setCompanyId(id);
    } else if (!id) {
      setCompanyId("");
      setCurrentData("");
    }
    setIsOpen(!isOpen);
  };

  /**
   * Create Company
   *
   * @param data
   */
  const createCompanyData = (values) => {
    const data = { ...values };
    data.status = Status.ACTIVE;
    dispatch(CompanyService.create(data, toggle, {}, dispatch));
  };

  /**
   * Update Company
   *
   * @param data
   */
  const updateCompanyData = (id, data) => {
    dispatch(CompanyService.update(id, data));
    toggle();
  };

  // Update company status
  const updateCompanyStatus = (id, data) => {
    dispatch(CompanyService.updateStatus(id, data, {}));
  };

  const renderCategoryTable = (tableId, params) => {
    return (
      <div className="mt-4">
        <ReduxTable
          id={tableId}
          showHeader
          newTableHeading
          searchPlaceholder="Search"
          apiURL={`${endpoints().companyAPI}/search`}
          sortByOptions={sortByOption}
          history={props.history}
          paramsToUrl={true}
          params={params && { ...params }}
          onRowClick={(row) => {
            history.push(`/supportPortal/company/detail/${row.id}`);
          }}
          dropdownLabel="Sort By"
        >
          <ReduxColumn
            field="company_name"
            type="link"
            isClickable="true"
            sortBy="company_name"
            width="149px"
            minWidth="150px"
            maxWidth="150px"
          >
            Company Name
          </ReduxColumn>
          <ReduxColumn
            field="status"
            width="50px"
            minWidth="50px"
            maxWidth="50px"
            sortBy="status"
            renderField={(row) => (
              <div
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase mx-auto ${row.status === Status.ACTIVE
                  ? "bg-success"
                  : row.status === Status.INACTIVE
                    ? "bg-secondary"
                    : ""
                  }`}
              >
                <p>{row.status}</p>
              </div>
            )}
          >
            Status
          </ReduxColumn>
          <ReduxColumn
            className="text-center"
            field="createdAt"
            sortBy="createdAt"
            width="50px"
            minWidth="50px"
            maxWidth="50px"
          >
            Created At
          </ReduxColumn>
          <ReduxColumn
            width={"80px"}
            minWidth={"80px"}
            maxWidth={"80px"}
            field="Action"
            className="action-column"
            disableOnClick
            renderField={(row) => (
              <div className="text-center action-group-dropdown">
                <MoreDropdown>
                  {row.status !== Status.ACTIVE ? (
                    <DropdownItem
                      onClick={() => {
                        updateCompanyStatus(row.id, {
                          company_name: row.company_name,
                          status: Status.ACTIVE,
                        });
                      }}
                    >
                      Make as Active
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => {
                        updateCompanyStatus(row.id, {
                          company_name: row.company_name,
                          status: Status.INACTIVE,
                        });
                      }}
                    >
                      Make as InActive
                    </DropdownItem>
                  )}
                </MoreDropdown>
              </div>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    );
  };

  const addCompanyForm = (
    <div className="mt-2 mb-3">
      <div>
        <Text
          name="company_name"
          label="Company Name"
          placeholder=" Add Company Name..."
          error=""
          fontBolded
          required={true}
        />
      </div>
    </div>
  );

  const companyFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button type="submit" label="" className="ml-3 h6-5-important">
          Add Company
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add Company"
        modalBody={addCompanyForm}
        modalFooter={companyFooter}
        initialValues={{
          company_name: "",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          companyId
            ? updateCompanyData(companyId, values)
            : createCompanyData(values);
        }}
        hideDefaultButtons
      />

      {/* /.page-heading */}
      <PageTitle
        label="Companies"
        buttonHandler={(e) => {
          toggle();
        }}
        buttonLabel="Add New"
      />
      <Nav tabs className="admin-tabs">
        {/* Active Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab == Tab.ACTIVE,
            })}
            onClick={() => {
              tabChange(Tab.ACTIVE);
              _handleStatusChange(Tab.ACTIVE);
            }}
          >
            {Tab.ACTIVE}
            <CountBadge
              count={ActiveCompanies}
              isActive={classNames({
                active: activeTab === Tab.ACTIVE,
              })}
            />
          </NavLink>
        </NavItem>
        {/* InActive Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab == Tab.INACTIVE,
            })}
            onClick={() => {
              tabChange(Tab.INACTIVE);
              _handleStatusChange(Tab.INACTIVE);
            }}
          >
            {Tab.INACTIVE}
            <CountBadge
              count={InActiveCompanies}
              isActive={classNames({
                active: activeTab === Tab.INACTIVE,
              })}
            />
          </NavLink>
        </NavItem>
        {/* All Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab == Tab.ALL,
            })}
            onClick={() => {
              tabChange(Tab.ALL);
              _handleStatusChange(Tab.ALL);
            }}
          >
            {Tab.ALL}
            <CountBadge
              count={AllCompanies}
              isActive={classNames({
                active: activeTab === Tab.ALL,
              })}
            />
          </NavLink>
        </NavItem>
      </Nav>

      {/* tab contents */}
      <TabContent activeTab={activeTab}>
        {activeTab == Tab.ALL && (
          <TabPane tabId={Tab.ALL}>
            <div className="tab-content-wrapper">
              {renderCategoryTable(Tab.ALL)}
            </div>
          </TabPane>
        )}
        {activeTab == Tab.ACTIVE && (
          <TabPane tabId={Tab.ACTIVE}>
            <div className="tab-content-wrapper">
              {renderCategoryTable(Tab.ACTIVE, {
                status: Status.ACTIVE,
              })}
            </div>
          </TabPane>
        )}

        {activeTab == Tab.INACTIVE && (
          <TabPane tabId={Tab.INACTIVE}>
            <div className="tab-content-wrapper">
              {renderCategoryTable(Tab.INACTIVE, {
                status: Status.INACTIVE,
              })}
            </div>
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

const mapStateToProps = (state) => {
  const reduxTable = state.table;
  const ActiveCompanies =
    reduxTable[activeCompanies] &&
      reduxTable[activeCompanies].isFetching == false
      ? reduxTable[activeCompanies].totalCount
      : 0;
  // Get Accepted Users count
  const InActiveCompanies =
    reduxTable[inActiveCompanies] &&
      reduxTable[inActiveCompanies].isFetching == false
      ? reduxTable[inActiveCompanies].totalCount
      : 0;
  // Get Accepted Users count
  const AllCompanies =
    reduxTable[allCompanies] && reduxTable[allCompanies].isFetching == false
      ? reduxTable[allCompanies].totalCount
      : 0;
  return {
    ActiveCompanies,
    InActiveCompanies,
    AllCompanies,
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(CompanyList);
