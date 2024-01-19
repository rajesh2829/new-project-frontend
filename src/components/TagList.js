import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";

//  Components
import "../components/reduxTable/styles.scss";

// API
import "../scss/_custom.scss";
import TagService from "../services/TagService";

import { endpoints } from "../api/endPoints";
import { TagsIcon } from "../assets/icons";
import { TAG_STATUS_ACTIVE, TAG_STATUS_INACTIVE } from "../helpers/Product";
import { Tab } from "../helpers/ProductTag";
import { STATUS_INACTIVE_TEXT } from "../helpers/Store";
import { tagOptions, Tag } from "../helpers/Tag";
import { isLoggedIn } from "../lib/Helper";
import Url from "../lib/Url";
import BreadCrumb from "./Breadcrumb";
import DeleteModal from "./DeleteModal";
import PageTitle from "./PageTitle";
import SaveButton from "./SaveButton";
import Select from "./Select";
import Text from "./Text";
import MoreDropdown from "./authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "./reduxTable";
import Drawer from "./Drawer";
import CurrencyComponent from "./Currency";
import Currency from "../lib/Currency";
import DateTime from "../lib/DateTime";


const TagDetail = (props) => {
  const {
    history,
    tagType,
    noTagDetail,
    __toggle,
    isModel,
    showTagTypefield,
    pageTitle,
    columnName,
    label,
  } = props;

  const [isOpen, setIsOpen] = useState(isModel || false);
  const [detail, setDetail] = useState(false);
  const [name, setName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTag, setDeleteTag] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState();
  const [amount, setAmount] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const statusOptions = [
    {
      value: Tab.STATUS_ACTIVE_TEXT,
      label: Tab.STATUS_ACTIVE_TEXT,
    },
    {
      value: Tab.STATUS_INACTIVE_TEXT,
      label: Tab.STATUS_INACTIVE_TEXT,
    },
    {
      value: "",
      label: "All",
    },
  ];

  // Use Effect
  useEffect(() => {
    isLoggedIn();
    TagTypeDetail();
  }, []);

  // get params
  const _toggle = (tagId) => {
    __toggle && __toggle();
    setId(tagId || 0);
    setIsOpen(!isOpen);
    setIsSubmit(false);
  };

  const handleAmount = (e) => {
    console.log(e.target.value);
    setAmount(e);
  };

  const toggle = (tab) => {
    __toggle && __toggle();
    setIsOpen(!isOpen);
    setName("");
    setId("");
    setType("");
    setAmount("");
    setIsSubmit(false);
  };

  const handleDelete = async (id) => {
    const params = {
      type: tagType,
      status: Url.GetParam("status"),
      search: Url.GetParam("search"),
      sort: Url.GetParam("sort"),
      sortDir: Url.GetParam("sortDir"),
    };
    dispatch(await TagService.delete(id, params));
  };

  const TagTypeDetail = async () => {
    try {
      //create new array for store list
      const response = await TagService.get(tagType);
      setDetail(() => response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Create Product
   *
   * @param values
   */
  const addtagForm = async (values) => {
    try {
      setIsSubmit(true);

      const data = new FormData();
      let params = {
        typeId: detail.id,
        pagination: true,
        status: Url.GetParam("status"),
        type: Url.GetParam("type"),
        page: 1,
        pageSize: 25,
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
        search: Url.GetParam("search")
      };

      if (!id) {
        data.append("name", values.name.trim());
        data.append("type", values?.type?.value ? values?.type?.value : "");
        data.append("amount", values && Currency.Get(values.amount));
        dispatch(await TagService.create(data, params, toggle));
        setIsSubmit(false);
      } else {
        data.append("name", values.name.trim());
        data.append("type", values.type.value);
        data.append("amount", values && Currency.Get(values.amount));
        data.append("id", id);
        data.append("status", status);
        dispatch(await TagService.update(id, data, params, toggle));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard/" },
    {
      label: "Tags",
      link: "/tags",
    },
    {
      label: tagType,
    },
  ];

  const addProductTagForm = (
    <>
      <Text name="name" label={label ? label : "Name"} required={true} />
      {!showTagTypefield && (
        <Select
          fullWidth={true}
          label="Type"
          name="type"
          options={tagOptions}
          required={true}
        />
      )}
      {Url.GetParam("type") == Tag.FINETYPE && (
        <CurrencyComponent
          label="Amount "
          name="amount"
          onChange={handleAmount}
        />
      )}
    </>
  );

  const modalOpen = isModel !== undefined ? isModel : isOpen;

  const sortByOption = props.mobileApp ? [
    {
      value: "id:DESC",
      label: "Most Recent"
    },
    {
      value: "name:ASC",
      label: "Name",
    },
  ] : [

    {
      value: "name:ASC",
      label: "Name",
    },
  ];

  const productTagFooter = (
    <SaveButton
      type="submit"
      loading={isSubmit}
      label={name ? "Save" : "Add"}
    />
  );
  
  return (
    <div>
      <>
        <Drawer
          DrawerBody={addProductTagForm}
          DrawerFooter={productTagFooter}
          modelTitle={
            name
              ? `Edit ${label ? label : "Tag"}`
              : `Add ${label ? label : "Tag"}`
          }
          onSubmit={(values) => {
            addtagForm(values);
          }}
          initialValues={{
            name: name || "",
            amount: amount || "",
            type: {
              value: Url.GetParam("type") ? Url.GetParam("type") : type,
              label: Url.GetParam("type") ? Url.GetParam("type") : type,
            },
          }}
          handleOpenModal={toggle}
          handleCloseModal={toggle}
          handleDrawerClose={toggle}
          isModalOpen={modalOpen}
        />
        <DeleteModal
          isOpen={openDeleteModal}
          toggle={() => {
            setOpenDeleteModal(false);
          }}
          title="Delete Tag Type"
          deleteFunction={() => {
            handleDelete(deleteTag.id);
          }}
          label={deleteTag.name}
          id={deleteTag.id}
        />
        {!noTagDetail && <BreadCrumb list={breadcrumbList} />}
        <div>
          {!props.showPageTitle && (
            <div className="pb-4">
              <PageTitle
                label={
                  props?.match?.params.id
                    ? props?.match?.params.id
                    : pageTitle
                      ? pageTitle
                      : tagType
                }
                buttonLabel="Add New"
                buttonHandler={(_e) => {
                  toggle();
                }}
              />
            </div>
          )}
        </div>
      </>
      <ReduxTable
        id="allTags"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().tagApi}/search`}
        newTableHeading
        icon={<TagsIcon />}
        message="You can start by clicking Add New"
        customStatusOption={statusOptions}
        sortByOptions={sortByOption}
        showStatusFilter
        params={{ type: tagType, status: "Active" }}
        paramsToUrl={true}
        history={history}
        onRowClick={(row) => {
          setName(row.name);
          setAmount(row.amount);
          setType(row.type);
          setStatus(row.status);
          return _toggle(row.id);
        }}
      >
        <ReduxColumn
          field="name"
          type="link"
          sortBy="name"
          width="160px"
          minWidth="160px"
          maxWidth="160px"
          isClickable="true"
        >
          {columnName ? columnName : "Name"}
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          width="130px"
          minWidth="130px"
          maxWidth="130px"
          className="column-status"
          renderField={(row) => (
            <div
              className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.status && row.status === TAG_STATUS_ACTIVE
                ? "bg-success"
                : row.status === TAG_STATUS_INACTIVE
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
        {props.mobileApp && <ReduxColumn
          field="createdAt"
          sortBy="createdAt"
          className="text-center"
          width="130px"
          minWidth="130px"
          maxWidth="130px"
          renderField={(row) => (
            <span>
              {DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}
            </span>
          )}
        >
          Created At
        </ReduxColumn>}
        <ReduxColumn
          minWidth={"100px"}
          width={"100px"}
          maxWidth={"100px"}
          field="status"
          disableOnClick
          className="action-column"
          renderField={(row) => (
            <div className="text-center landing-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  onClick={() => {
                    toggle()
                    setName(row?.name);
                    setAmount(row?.amount);
                    setType(row?.type);
                    setStatus(row?.status);
                    setId(row?.id)
                  }}
                >
                  Quick View
                </DropdownItem>
                {row.status !== Tab.STATUS_ACTIVE_TEXT ? (
                  <DropdownItem
                    onClick={async () => {
                      dispatch(
                        await TagService.updateStatus(
                          row.id,
                          Tab.STATUS_ACTIVE_TEXT,
                          tagType
                        )
                      );
                    }}
                  >
                    Make as Active
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={async () => {
                      dispatch(
                        await TagService.updateStatus(
                          row.id,
                          STATUS_INACTIVE_TEXT,
                          tagType
                        )
                      );
                    }}
                  >
                    Make as InActive
                  </DropdownItem>
                )}
                {/* {row.type === TYPE_USER_DEFINED && ( */}
                <DropdownItem
                  className={"text-danger"}
                  onClick={() => {
                    setOpenDeleteModal(true);
                    setDeleteTag(row);
                  }}
                >
                  Delete
                </DropdownItem>
                {/* )} */}
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
export default TagDetail;
