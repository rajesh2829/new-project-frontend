import React from "react";
import PageTitle from "../../components/PageTitle";
import { Button, DropdownItem } from "reactstrap";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { endpoints } from "../../api/endPoints";
import Text from "../../components/Text";
import StateDropdown from "../../components/State";
import Zipcode from "../../components/Zipcode";
import Country from "../../components/Country";
import Phone from "../../components/Phone";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { Link } from "react-router-dom";
import Drawer from "../../components/Drawer";

const AddressDetailTab = (props) => {
  const {
    selectedOption,
    selectedCountryId,
    selectedCountryName,
    handleCountryChange,
    initialValue,
    history,
    AddressOpen,
    AddressSelectModal,
    handleSubmit,
    setIsDeleteModel,
    setAddressId,
    setAddress,
    EditModal,
    setRow,
    id,
    object_id,
    objectName,
    setTitle,
    setDeleteRow,
    editable,
  } = props;

  const addAddressFormFooter = (
    <Button type="submit" className="h6-5-important">
      {id ? "Update" : "Add"}
    </Button>
  );

  const sortByOption = [
    {
      value: "title:ASC",
      label: "Title",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const addAddressForm = (
    <div>
      <Text
        name="title"
        label="Title"
        placeholder="Enter Title"
        error=""
        required
      />
      <Text name="name" label="Name" placeholder="Enter Name" error="" />
      <Text
        name="address1"
        label="Address 1"
        placeholder="Enter Address 1"
        error=""
      />
      <Text
        name="address2"
        label="Address 2"
        placeholder="Enter Address 2"
        error=""
      />

      <Text name="city" label="City" placeholder="Enter City" error="" />
      <Country
        name="country"
        label="Country"
        placeholder="Enter Country"
        onChange={handleCountryChange}
      />
      <StateDropdown
        name="state"
        label="State"
        placeholder="Enter State"
        selectedCountry={
          selectedOption
            ? selectedOption
            : selectedCountryId
              ? selectedCountryId
              : ""
        }
        selectedCountryName={selectedCountryName ? selectedCountryName : ""}
      />
      <Zipcode
        label="Pin Code"
        name="pin_code"
        placeholder="Enter Pin Code"
        error=""
      />
      <Phone
        name="phone_number"
        label="Phone Number"
        placeholder="Enter Phone Number"
        error=""
      />
      <Text
        label="GST Number"
        name="gst_number"
        placeholder="GST Number"
        notify
      />
      <Text
        name="longitude"
        label="Longitude"
        placeholder="Enter Longitude"
        error=""
      />
      <Text
        name="latitude"
        label="Latitude"
        placeholder="Enter Latitude"
        error=""
      />
    </div>
  );

  return (
    <>
      <Drawer
        modelTitle={id ? "Edit Address" : "Add Address"}
        DrawerBody={addAddressForm}
        DrawerFooter={addAddressFormFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={{
          ...initialValue,
        }}
        handleOpenModal={AddressSelectModal}
        handleCloseModal={AddressSelectModal}
        handleDrawerClose={AddressSelectModal}
        isModalOpen={AddressOpen}
        enableReinitialize={true}
      />

      <div className="mt-4">
        <ReduxTable
          id="address"
          apiURL={`${endpoints().addressAPI}/search`}
          showHeader
          searchPlaceholder="Search"
          newTableHeading={
            props.newTableHeading ? props.newTableHeading : false
          }
          showSearch={props.showSearch ? props.showSearch : false}
          sortByOptions={sortByOption}
          onRowClick
          params={{
            pagination: true,
            object_id: object_id,
            objectName: objectName,
          }}
          history={history}
          paramsToUrl={true}
        >
          <ReduxColumn
            field="title"
            type="Link"
            sortBy="title"
            renderField={(row) => (
              <div className="text-left action-group-dropdown">
                <Link
                  onClick={() => {
                    setRow(row);
                    return EditModal(row.id);
                  }}
                >
                  {row.title}
                </Link>
              </div>
            )}
          >
            Title
          </ReduxColumn>
          <ReduxColumn field="name" sortBy="name">
            Name
          </ReduxColumn>
          <ReduxColumn field="address1" sortBy="address1">
            Address 1
          </ReduxColumn>
          <ReduxColumn field="address2" sortBy="address2">
            Address 2
          </ReduxColumn>
          <ReduxColumn field="city" sortBy="City">
            City
          </ReduxColumn>
          <ReduxColumn field="country" sortBy="country">
            Country
          </ReduxColumn>
          <ReduxColumn field="state" sortBy="state">
            State
          </ReduxColumn>
          <ReduxColumn field="pin_code" sortBy="pin_code">
            Pin Code
          </ReduxColumn>
          <ReduxColumn field="gst_number" sortBy="gst_number">
            GST
          </ReduxColumn>
          <ReduxColumn field="longitude" sortBy="longitude">
            Longitude
          </ReduxColumn>
          <ReduxColumn field="latitude" sortBy="latitude">
            Latitude
          </ReduxColumn>
          <ReduxColumn
            field="Action"
            disableOnClick
            width="120px"
            minWidth="80px"
            maxWidth="80px"
            renderField={(row) => (
              <div className=" text-center action-group-dropdown">
                <MoreDropdown>
                  {(
                    <DropdownItem
                      onClick={() => {
                        setRow(row);
                        return EditModal(row.id);
                      }}
                    >
                      Edit
                    </DropdownItem>
                  )}
                  <DropdownItem
                    className=" text-danger cursor-pointer"
                    onClick={() => {
                      setDeleteRow && setDeleteRow(row);
                      setIsDeleteModel(true);
                      setAddressId(row.id);
                      setAddress(row.id);
                      setTitle(row.title);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </MoreDropdown>
              </div>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
export default AddressDetailTab;
