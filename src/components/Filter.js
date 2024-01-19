import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ObjectName from "../helpers/ObjectName";
import { UserType } from "../helpers/UserType";
import AccountSelect from "./AccountSelect";
import BrandSelect from "./BrandSelect";
import Button from "./Button";
import CategorySelect from "./CategorySelect";
import DateSelector from "./Date";
import Drawer from "./Drawer";
import PageSearch from "./PageSearch";
import PageSize from "./PageSize";
import PaymentSelect from "./PaymentAccountSelect";
import ProductSelect from "./ProductSelect";
import Select from "./Select";
import SelectDropdown from "./SelectDropdown";
import StatusSelect from "./SelectStatus";
import SelectStore from "./SelectStore";
import SelectType from "./SelectType";
import ShiftSelect from "./ShiftSelect";
import SprintSelect from "./SprintSelect";
import StatusGroupSelect from "./StatusGroupSelect";
import SelectTag from "./TagSelect";
import UserSelect from "./UserSelect";
import ProjectSelect from "./projectSelect";
import SingleCheckbox from "./SingleCheckbox";
import SaveButton from "./SaveButton";
import TimeSelector from "./TimeSelector";
import DateTime from "../lib/DateTime";

const Filter = (props) => {
  let {
    initialValues,
    filteredValue,
    handleDeleteFilter,
    openModel,
    modelOpen,
    accountType,
    handleFilter
  } = props;

  const [displayFilter, setDisplayFilter] = useState(true);
  const [spinning, setSpinning] = useState(props.spinning);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let hideParamsValue = {
    objectName: true,
    pagination: true
  };

  const handleRemoveFilter = (obj) => {
    let objectvalue = {};
    let key = Object.keys(obj)[0];
    objectvalue[key] = "";
    handleDeleteFilter && handleDeleteFilter(objectvalue);
  };

  const handleClick = () => {
    props.refreshButtonOnClick();
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 100);
  };

  let filteredArrayValues = [];
  let filteredObjectValues = [];
  let filteredNormalValues = [];
  if (initialValues && initialValues !== undefined) {
    const filteredData = Object.fromEntries(
      Object.entries(initialValues).filter(
        ([key, value]) => value !== undefined && value !== null && value !== ""
      )
    );
    if (filteredData) {
      const arrayValues = [];
      const objectValues = [];
      const normalValues = [];

      for (const [key, value] of Object.entries(filteredData)) {
        if (Array.isArray(value)) {
          arrayValues.push({ [key]: value });
        } else if (typeof value === "object" && value !== null) {
          objectValues.push({ [key]: value });
        } else {
          normalValues.push({ [key]: value });
        }
      }

      for (const item of arrayValues) {
        const key = Object.keys(item)[0];
        const value = item[key][0];
        let filteredKey =
          Object.keys(hideParamsValue).find((values) => values === key) || "";
        if (value !== undefined && !filteredKey) {
          filteredArrayValues.push({ [key]: value?.label });
        }
      }

      for (let item of objectValues) {
        const key = Object.keys(item)[0];
        const value = item[key];
        let filteredKey =
          Object.keys(hideParamsValue).find((values) => values === key) || "";
        if (value !== undefined && !filteredKey) {
          if (key === "product") {
            filteredObjectValues.push({ [key]: value?.label?.props?.url });
          } else {
            filteredObjectValues.push({ [key]: value?.label });
          }
        }
      }

      for (let item of normalValues) {
        const key = Object.keys(item)[0];
        const value = item[key];
        let filteredKey =
          Object.keys(hideParamsValue).find((values) => values === key) || "";
        if (value !== undefined && !filteredKey) {
          filteredNormalValues.push({ [key]: value });
        }
      }
    }
  }

  let mergedValues = [
    ...filteredArrayValues,
    ...filteredObjectValues,
    ...filteredNormalValues
  ];

  const modelBody = (
    <>
      <div className="row d-block px-0 py-0">
        {/*  Date Filter */}

        {props.showSingleDateFilter && (
          <>
            <div className="col">
              <DateSelector
                name="date"
                placeholder="Date"
                // selected={this.state.startSelected}
                onChange={props.handleDateChange}
                isClearable
              />
            </div>
          </>
        )}
        {props.showProjectFilter && (
          <div className="col">
            <ProjectSelect
              oninputProjectChange={props.handleProjectChange}
              projectList={(e) =>
                props.setProjectList && props.setProjectList(e)
              }
            />
          </div>
        )}
        {/* Brand Filter */}
        {props.showBrandFilter && (
          <div className="col">
            <BrandSelect
              handleBrandChange={props.handleBrandChange}
              brandOption={(x) => props.brandOption(x)}
            />
          </div>
        )}
        {/* Category Filter */}
        {props.showCategoryFilter && (
          <div className="col">
            <CategorySelect
              handleCategoryChange={props.handleCategoryChange}
              categoryList={(x) => props.categoryList(x)}
              menuPortal=""
            />
          </div>
        )}
        {/* Product Filter */}
        {props.showProductFilter && (
          <div className="col">
            <ProductSelect
              handleProductChange={props.handleProductChange}
              productOption={(x) => props.productOption(x)}
              menuPortal=""
              brandValue={props.brandValue}
              categoryValue={props.categoryValue}
            />
          </div>
        )}
        {/* Vendor Filter */}
        {props.showAccountFilter && (
          <div className="col">
            <AccountSelect
              handleVendorChange={props.handleVendorChange}
              vendorList={(x) => props.vendorList(x)}
              placeholder={
                props.vendorPlaceholder
                  ? props.vendorPlaceholder
                  : "Select Account"
              }
              menuPortal=""
              customOption={props.accountCustomOption}
              type={accountType}
            />
          </div>
        )}
        {/* Store Filter */}
        {props.showStockEntryProductTypeFilter && (
          <div className="col">
            <Select
              name="stockEntryProductType"
              options={props.stockProductTypeOption}
              placeholder="Select Type"
              handleChange={props.handleStockEntryProductTypeChange}
              menuPortal=""
            />
          </div>
        )}
        {props.showStoreFilter && (
          <div className="col">
            <SelectStore
              name={props.locationName}
              handleStoreChange={props.handleStoreChange}
              StoreList={props.StoreList}
              menuPortal={""}
            />
          </div>
        )}
        {/* Status Filter */}
        {props.showStatusFilter && (
          <div className="col">
            <StatusSelect
              customStatusOption={props.customStatusOption}
              handleStatusChange={props.onStatusChange}
              statusOption={(x) => props.statusOption(x)}
              objectName={props.objectName}
              isMulti={props.isMultiSelect}
              menuPortal={""}
            />
          </div>
        )}
        {props.showGstStatusFilter && (
          <div className="col">
            <StatusSelect
              name="gstStatus"
              placeholder="Select GST Status"
              handleStatusChange={props.onGstStatusChange}
              statusOption={(x) => props.gstStatusOption(x)}
              objectName={ObjectName.BILL_GST_STATUS}
              menuPortal=""
            />
          </div>
        )}
        {/* salesExecutive Filter */}
        {props.showSalesExecutiveFilter && (
          <div className="col">
            <UserSelect
              name="salesExecutive"
              options={props.salesExecutiveOption}
              placeholder="Sales Executive"
              handleChange={props.handleSalesExecutiveChange}
              minWidth="200px"
              handleUserChange={props.handleSalesExecutiveChange}
              params={{ userType: UserType.SALES_EXECUTIVE }}
              menuPortal=""
            />
          </div>
        )}
        {/* Shift Filter */}
        {props.showShiftFilter && (
          <div className="col">
            <ShiftSelect
              name={props.shiftName}
              shiftOption={(x) => props.shiftOption(x)}
              handleShiftChange={props.handleShiftChange}
              menuPortal={""}
            />
          </div>
        )}
        {/* Payment Type Filter */}
        {props.showPaymentTypeFilter && (
          <div className="col">
            <Select
              name="paymentType"
              placeholder="Select Payment Type"
              options={props.paymentType}
              handleChange={props.handlePaymentTypeChange}
              menuPortal=""
            />
          </div>
        )}
        {/* Type Filter */}
        {props.showTypeFilter && (
          <div className="col">
            <SelectType
              name={props.typeName}
              handleTypeChange={props.handleTypeChange}
              typeOption={(x) => props.typeOption(x)}
              customTypeOption={props.customTypeOption}
              clearable={props.typeIsclearable}
              menuPortal=" "
            />
          </div>
        )}
        {/* Type Filter */}
        {props.showGraphDataFilter && (
          <div className="col">
            <Select
              name={"graphData"}
              onInputChange={props.handleGraphDataChange}
              options={props.graphDataTypeOption}
              clearable
              placeholder="Select Graph Type"
              menuPortal=" "
            />
          </div>
        )}
        {/* From Store To Store Filter */}
        {props.showFromToLocationFilter && (
          <>
            <div className="col">
              <SelectStore
                name="fromLocation"
                placeholder="Select From Location"
                StoreList={props.StoreList}
                handleChange={props.handleFromStoreChange}
                handleStoreChange={props.handleFromStoreChange}
                menuPortal=""
              />
            </div>
            <div className="col">
              <SelectStore
                name="toLocation"
                placeholder="Select To Location"
                StoreList={props.StoreList}
                handleChange={props.handleFromStoreChange}
                handleStoreChange={props.handleToStoreChange}
                menuPortal=""
              />
            </div>
          </>
        )}
        {/* Payment Account filter */}
        {props.showPaymentAccountFilter && (
          <div className="col">
            <PaymentSelect
              name="paymentAccount"
              placeholder="Select Payment Account"
              options={props.bankOption}
              handleChange={props.handlePaymentAccountChange}
              menuPortal=""
            />
          </div>
        )}
        {/* User Filter */}
        {props.showUserFilter ? (
          <div className="col">
            <UserSelect
              placeholder={
                props?.assigneePlaceholder ? props.assigneePlaceholder : ""
              }
              handleUserChange={props.handleUserChange}
              userList={(x) => props.userList(x)}
              menuPortal=""
            />
          </div>
        ) : (
          ""
        )}
        {props.showReporterFilter ? (
          <div className="col">
            <UserSelect
              name="reporter"
              placeholder="Select Reporter"
              handleUserChange={props.handleReporterChange}
              userList={(x) => props.reporterList(x)}
              menuPortal=""
            />
          </div>
        ) : (
          ""
        )}
        {props.ShowObjectNameFilter && (
          <div className="col">
            <Select
              name="objectName"
              options={props.objectNameOptions}
              placeholder="Object Name"
              handleChange={props.handleObjectNameChange}
              menuPortal=""
            />
          </div>
        )}

        {props.showTagFilter && (
          <div className="col">
            <SelectTag
              name="productTag"
              placeholder={props.tagPlaceholder}
              customTagOption={props.customTagOption}
              params={props.tagParams}
              handleTagChange={props.handleTagChange}
              TagList={(x) => props.TagList(x)}
            />
          </div>
        )}
        {props.showVisitorTypeFilter && (
          <div className="col">
            <SelectTag
              name="visitorType"
              placeholder={props.tagPlaceholder}
              customTagOption={props.customTagOption}
              params={props.tagParams}
              handleTagChange={props.handleTagChange}
              TagList={(x) => props.TagList(x)}
            />
          </div>
        )}
        {props.showManufactureFilter && (
          <div className="col">
            <SelectTag
              name="manufacture"
              placeholder={"Manufacture"}
              params={{
                type: "Manufacture"
              }}
              handleTagChange={props.handleManufactureChange2}
            />
          </div>
        )}
        {props.showStatusOptions && (
          <div className="col">
            <SelectDropdown
              buttonLabel={props.getSelectedStatusLabel}
              dropdownLinks={props.statusOptions}
              color={"var(--dropdown-color)"}
              hideCaret
              width
              handleChange={props.handleStatusByChange}
            />
          </div>
        )}
        {props.showSprintFilter && (
          <div className="col">
            <SprintSelect
              name="sprint"
              options={props.sprintOptions}
              placeholder="Select Sprint"
              handleChange={props.handleSprintChange}
              menuPortal=""
            />
          </div>
        )}
        {/* Reason Filter */}
        {props.showReasonFilter && (
          <div className="col">
            <Select
              name="reason"
              options={props.reasonOption}
              placeholder="Select Reason"
              handleChange={props.handleReasonChange}
              menuPortal=""
            />
          </div>
        )}
        {/* Reason Filter */}
        {props.showStockFilter && (
          <div className="col">
            <Select
              name="stockType"
              options={props.ActionMenu}
              placeholder="Select Stock Type"
              handleChange={props.handleStockTypeChange}
              menuPortal=""
            />
          </div>
        )}

        {props.showCountSortFilter && (
          <div className="col">
            <Select
              name="sortType"
              options={props.countSortOption}
              placeholder="Select Sort Type"
              handleChange={props.handleSortTypeChange}
              menuPortal=""
            />
          </div>
        )}
        {props.showStatusGroupFilter && (
          <div className="col">
            <StatusGroupSelect
              onInputChange={props?.groupSelectOnChange}
              groupOption={props?.groupOption}
            />
          </div>
        )}
        {props.showDateFilter && !props.showTimeFilter && (
          <>
            <div className="col">
              <DateSelector
                name="startDate"
                placeholder="Start Date"
                // selected={this.state.startSelected}
                onChange={props.handleStartDateChange}
                isClearable
              />
            </div>
            <div className="col">
              <DateSelector
                name="endDate"
                placeholder="End Date"
                // selected={props.startSelected}
                onChange={props.handleEndDateChange}
                isClearable
              />
            </div>
          </>
        )}
        {props.showDateFilter && props.showTimeFilter && (
          <>
            <div className="row m-0">
              <div className="col-7">
                <DateSelector
                  name="startDate"
                  placeholder="Start Date"
                  // selected={this.state.startSelected}
                  onChange={props.handleStartDateChange}
                  isClearable
                />
              </div>
              <div className="col-5">
                <TimeSelector
                  name="startTime"
                  placeholder="Start Time"
                  isClearable={true}
                  onChange={props.handleStartTimeChange}
                  timeInterval={30}
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-7">
                <DateSelector
                  name="endDate"
                  placeholder="End Date"
                  // selected={props.startSelected}
                  onChange={props.handleEndDateChange}
                  isClearable
                />
              </div>
              <div className="col-5">
                <TimeSelector
                  name="endTime"
                  placeholder="End Time"
                  isClearable={true}
                  onChange={props.handleStartTimeChange}
                  timeInterval={30}

                />
              </div>
            </div>
          </>
        )}
        {props.showRoleFilter && (
          <div className="col">
            <Select
              name="role"
              placeholder="Select Role"
              options={props.roleLists}
              handleChange={props.handleRoleChange}
            />
          </div>
        )}
        {props.showCheckBox && (
          <div className="col">
            <SingleCheckbox
              name="show_duplicate"
              label="Show Duplicate"
              className="accepted-terms mb-2 pb-0"
              handleOnChangeSubmit={(value, name) =>
                props.handleOnChangeSubmit(value, name)
              }
            />
          </div>
        )}
      </div>
    </>
  );

  let modelFooter = (
    <>
      <SaveButton label="Apply Filter" />
    </>
  )
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangeFilter = (values) => {
    handleFilter && handleFilter(values)
    setIsModalOpen(false);
    openModel()
  }


  return (
    <>
      <Drawer
        DrawerBody={modelBody}
        initialValues={initialValues}
        handleOpenModal={openModel ? openModel : handleOpenModal}
        handleCloseModal={openModel ? openModel : handleOpenModal}
        handleDrawerClose={openModel ? openModel : handleOpenModal}
        isModalOpen={modelOpen ? modelOpen : isModalOpen}
        enableReinitialize
        className="filter-width"
        modelTitle="Filter"
        DrawerFooter={modelFooter}
        onSubmit={handleChangeFilter}
      />
      {props.showHeader && !props.disableHeader && (
        <>
          {props.newTableHeading && displayFilter ? (
            // To display show and hide filter using this id---> filterSection
            <div className="d-block">
              <div
                className={` page-heading  cover ${props.showSearch
                  ? "justify-content-end"
                  : "justify-content-between"
                  }`}>
                <div className="d-flex py-3 pt-0 justify-content-end ">
                  {props.showPageSize && (
                    <div className="mr-2 d-none d-sm-block">
                      <PageSize
                        onChange={(e) => props.getPageSizeByOptions(e)}
                        selectedPageSize={props.selectedPageSize}
                      />
                    </div>
                  )}

                  {/* <div className="col-9"> */}
                  {!props.showSearch && (
                    <PageSearch
                      width={props.searchBarWidth}
                      value={props.pageSearchValue}
                      classnames="page-search"
                      placeholder={props.searchPlaceholder}
                      onChange={props.pageSearchOnChange}
                      onKeyPress={(e) => props.onKeyPress(e)}
                      onSearchClick={props.onSearchClick}
                    />
                  )}
                  {!props.sortByDropdown && (
                    <div className="d-none d-sm-block">
                      <SelectDropdown
                        buttonLabel={
                          props.dropdownLabel
                            ? props.dropdownLabel
                            : props.getSelectedSortLabel
                        }
                        dropdownLinks={props.sortByOptions}
                        hideCaret
                        handleChange={props.handleSortByChange}
                      />
                    </div>
                  )}
                  <div className="d-flex">
                    <div className=" d-flex  ml-sm-2 ">
                      {!props.refreshButton && (
                        <div onClick={handleClick} className="btn btn-dark">
                          <span
                            className={
                              props.refreshValue || spinning
                                ? "fa fa-sync fa-spin"
                                : "fa fa-refresh"
                            }></span>
                        </div>
                      )}
                    </div>
                  </div>
                  {(props.showDateFilter || props.showTimeFilter ||
                    props.showSingleDateFilter ||
                    props.showCategoryFilter ||
                    props.showBrandFilter ||
                    props.showProductFilter ||
                    props.showStockEntryProductTypeFilter ||
                    props.showStoreFilter ||
                    props.showStatusFilter ||
                    props.showGstStatusFilter ||
                    props.showSalesExecutiveFilter ||
                    props.showShiftFilter ||
                    props.showPaymentTypeFilter ||
                    props.showTypeFilter ||
                    props.showFromToLocationFilter ||
                    props.showPaymentAccountFilter ||
                    props.showUserFilter ||
                    props.showReporterFilter ||
                    props.ShowObjectNameFilter ||
                    props.showTagFilter ||
                    props.showVisitorTypeFilter ||
                    props.showManufactureFilter ||
                    props.showStatusOptions ||
                    props.showSprintFilter ||
                    props.showReasonFilter ||
                    props.showStockFilter ||
                    props.showCountSortFilter ||
                    props.showStatusGroupFilter ||
                    props.showProjectFilter ||
                    props.showRoleFilter) && (
                      <div className="d-flex">
                        <div className=" d-flex  ml-2">
                          <Button
                            label={props.buttonLabel}
                            onClick={
                              props?.buttonOnClick
                                ? props.buttonOnClick
                                : openModel
                                  ? openModel
                                  : handleOpenModal
                            }
                            className={"btn btn-primary fa fa-filter bg-dark"}
                          />
                        </div>
                      </div>
                    )}
                </div>
                <div className="row w-100">
                  {mergedValues &&
                    mergedValues.length > 0 &&
                    mergedValues.map((obj) => (
                      <div className="d-flex col flex-grow-0 pr-0">
                        <p
                          className="shadow px-2 rounded-left text-capitalize font-size-12"
                          style={{
                            backgroundColor:
                              "var(--filter-show-lable-bg-color)",
                            display: "flex",
                            alignItems: "center"
                          }}>
                          {Object.keys(obj)[0]}:
                        </p>
                        <p
                          className="badge badge-primary font-size-12"
                          style={{
                            alignItems: "center",
                            display: "flex",
                            minWidth: "50px",
                            justifyContent: "space-evenly",
                            padding: "6px 10px 6px 10px",
                            lineHeight: 0,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            height: "33px",
                            maxHeight: "33px",
                            backgroundColor: "var(--filter-show-value-bg-color)"
                          }}>
                          {Object.keys(obj)[0] === "product" ? (
                            <img
                              src={obj[Object.keys(obj)[0]]}
                              style={{ width: "100px" }}
                            />
                          ) : Object.keys(obj)[0] === "startTime" ? (DateTime.getUserTimeZoneTime(obj[Object.keys(obj)[0]])) :
                            Object.keys(obj)[0] === "endTime" ? (DateTime.getUserTimeZoneTime(obj[Object.keys(obj)[0]])) : (
                              obj[Object.keys(obj)[0]]
                            )}
                          <FontAwesomeIcon
                            icon={faXmark}
                            style={{
                              cursor: "pointer",
                              marginLeft: "5px"
                            }}
                            onClick={(e) => handleRemoveFilter(obj)}
                          />
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};
export default Filter;
