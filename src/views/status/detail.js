import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Form from "../../components/Form";

// Components
import BreadCrumb from "../../components/Breadcrumb";
import CancelButton from "../../components/CancelButton";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";

//  Lib
import { useDispatch } from "react-redux";
import Url from "../../lib/Url";

import ActivityList from "../../components/ActivityList";
import DeleteButton from "../../components/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import Spinner from "../../components/Spinner";
import ObjectName from "../../helpers/ObjectName";
import { groupOption } from "../../helpers/Status";
import StatusService from "../../services/StatusService";
import { getUserRole } from "../../services/UserSettingService";
import Permission from "../../helpers/Permission";
import { hasPermission } from "../../services/UserRolePermissionService";
import StatusForm from "./statusForm";
import { User } from "../../helpers/User";

export const Tab = {
  GENERAL: "General",
  HISTORY: "History"
};

const statusDetail = (props) => {
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") || Tab.GENERAL
  );
  const [detail, setDetail] = useState();
  const [store, setStore] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [userRole, setUserRole] = useState([]);
  const [objectName, setObjectName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState();
  const [userList, setUserList] = useState()
  const dispatch = useDispatch();
  let showHistory = hasPermission(Permission.STATUS_HISTORY_VIEW)

  let statusId = props.match.params.id;

  useEffect(() => {
    getStatusDetail();
    getUserList();
  }, []);

  useEffect(() => {
    getStatusDetail();
  }, [detail?.project_id]);

  useEffect(() => {
    getStatusList();
  }, [objectName]);

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // Bread crumb list
  const breadcrumbList = [
    {
      label: "Settings",
      link: "/setting/Account"
    },
    {
      label: "Status",
      link: `/setting/Statues`,
    },
    {
      label: `${detail?.object_name?.charAt(0)?.toUpperCase() + detail?.object_name?.slice(1)?.toLowerCase()}`,
      link: `/setting/${detail?.object_name?.charAt(0)?.toUpperCase() + detail?.object_name?.slice(1)?.toLowerCase()}`,
    },
    {
      label: `${detail?.name} `,
      link: "",
    },
  ];

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  const getStatusDetail = async () => {
    setIsLoading(true);

    const data = await StatusService.get(statusId);
    setIsLoading(false);

    setDetail(data.data);
    setObjectName(data?.data?.object_name);
    getStatusList(data?.data?.object_name);
  };

  // Handle form Submit
  const submit = async (values) => {

    const data = new FormData();

    data.append(
      "objectName",
      values && values?.object && values?.object?.value
        ? values?.object?.value
        : detail?.object_name
    );
    data.append("name", values.status.trim());
    data.append(
      "nextStatus",
      values && values?.nextStatus ? JSON.stringify(values?.nextStatus) : ""

    );
    if (values && values.allowedUser) {
      data.append(
        "allowedUser",
        values && values.allowedUser ? JSON.stringify(values.allowedUser) : ""
      );
    }
    data.append("sortOrder", values.sortOrder);
    data.append("colorCode", values?.colorcode?.value);

    data.append("id", statusId);

    data.append("update_quantity", values.update_quantity);
    data.append("allow_edit", values.allow_edit);

    data.append("send_notification_to_owner", values.send_notification_to_owner);

    data.append(
      "location_product_last_stock_entry_date_update",
      values.update_location_product_last_stock_entry_date
    );
    data.append("update_product_price", values.update_product_price);

    if (values && values?.default_owner && values?.default_owner.value == User.LOGGED_IN_USER) {
      data.append(
        "default_owner",
        User.LOGGED_IN_USER_VALUE
      );
    } else {
      data.append(
        "default_owner",
        values && values?.default_owner ? values?.default_owner?.id : ""
      );
    }
    data.append(
      "default_reviewer",
      values && values?.default_reviewer ? values?.default_reviewer?.id : ""
    );
    data.append(
      "update_distribution_quantity",
      values && values?.update_distribution_quantity
        ? values?.update_distribution_quantity
        : ""
    );
    data.append(
      "allow_cancel",
      values && values?.allow_cancel ? values?.allow_cancel : ""
    );

    data.append(
      "group",
      values && values?.group?.value ? values?.group?.value : ""
    );
    data.append(
      "default_due_date",
      values && values?.default_due_date ? values?.default_due_date?.value : ""
    );
    data.append(
      "project_id",
      detail?.project_id ? detail?.project_id : ""
    );
    data.append("validate_amount", values.validate_amount);
    data.append("allow_to_view", values.allow_to_view);

    data.append("allow_replenishment", values.allow_replenishment);

    data.append("is_active_price", values.is_active_price);

    dispatch(await StatusService.update(statusId, data));
  };

  const deleteStatus = (id) => {
    StatusService.Delete(id, (res) => {
      if (res && detail?.project_id) {
        props.history.push(`/project/${detail?.project_id}?object_name=TICKET&tab=Status`);
      } else {
        props.history.push(`/setting/Statues/StatusList/StatusDetail/?object_name=${Url.GetParam("object_name")}`);
      }
    });
  };

  const getStatusList = async (objectName) => {
    const list = await StatusService.search(objectName, null, detail?.project_id);
    let nextStatusValue = []
    list && list.forEach((value) => {
      nextStatusValue.push({
        label: value.name,
        id: value.id,
        value: value.id
      });
    });
    setStatusList(nextStatusValue);
  };

  const getUserList = async () => {
    const roleData = await getUserRole();
    setUserRole(roleData);
  };

  let selectedTags = [];

  if (detail?.allowedUser) {
    detail?.allowedUser.forEach((result) => {
      selectedTags.push({
        value: result.id,
        label: result.name,
      });
    });
  }

  let nextStatusValue = [];

  if (detail?.nextStatus) {
    detail?.nextStatus.forEach((result) => {
      nextStatusValue.push({
        value: result.id,
        label: result.name,
      });
    });
  }

  if (isLoading) {
    return <Spinner />;
  }

  const handleChange = (e) => {
    if (e?.value) {
      getStatusList(e?.value)
    }
  }

  const dueDateOption = [
    {
      label: "Today",
      value: "Today",
    },
    {
      label: "Tomorrow",
      value: "Tomorrow",
    }
  ]

  return (
    <>
      <DeleteModal
        id={detail?.id}
        label={detail?.name}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Status"
        deleteFunction={() => deleteStatus(detail?.id)}
      />
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between">
        <PageTitle label={detail?.name} />
        <div className="col">
          <div className="float-right">
            <DeleteButton
              onClick={(e) => {
                setDeleteModal(true);
              }}
            />
          </div>
        </div>
      </div>
      <Nav tabs className="admin-tabs mb-1">
        {/* GENERAL Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.GENERAL,
            })}
            onClick={() => {
              toggle(Tab.GENERAL);
              _handleTabChange(Tab.GENERAL);
            }}
          >
            General
          </NavLink>
        </NavItem>
        <NavItem>
          {showHistory && <NavLink
            className={classNames({
              active: activeTab === Tab.HISTORY,
            })}
            onClick={() => {
              toggle(Tab.HISTORY);
              _handleTabChange(Tab.HISTORY);
            }}
          >
            History
          </NavLink>}
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.GENERAL}>
          <div className="card p-3">
            <Form
              enableReinitialize={true}
              initialValues={{
                status: detail?.name || "",
                object: { label: detail?.object_name || "" },
                colorcode: color && color.find(
                  (option) => option.value === detail?.colorCode
                ),
                default_owner: userList &&
                  userList.length > 0 &&
                  userList.find((data) => data?.id == detail?.default_owner),
                default_reviewer: userList &&
                  userList.length > 0 &&
                  userList.find((data) => data?.id == detail?.default_reviewer),
                allowedUser: selectedTags,
                nextStatus: nextStatusValue,
                sortOrder: detail?.sortOrder || "",
                update_quantity: detail?.update_quantity == 1 ? true : false,
                allow_edit: detail?.allow_edit == 1 ? true : false,
                send_notification_to_owner: detail?.notifyToOwner == 1 ? true : false,
                group: groupOption.find((data) => data.value == detail?.groupValue),
                allow_cancel: detail ?
                  detail?.allowCancel == 1
                    ? true
                    : false
                  : "",
                send_notification_to_owner: detail
                  ? detail?.notifyToOwner == 1
                    ? true
                    : false
                  : "",
                update_location_product_last_stock_entry_date: detail
                  ? detail?.location_product_last_stock_entry_date_update
                    ? true
                    : false
                  : "",
                update_product_price: detail
                  ? detail?.update_product_price == 1
                    ? true
                    : false
                  : "",
                update_distribution_quantity: detail
                  ? detail?.updateDistributionQuantity
                  : "",
                default_due_date: detail?.default_due_date
                  ? dueDateOption.find(
                    (data) => data?.value === detail?.default_due_date
                  )
                  : "",
                validate_amount: detail
                  ? detail?.validate_amount == 1
                    ? true
                    : false
                  : "",
                allow_to_view: detail ? detail?.allow_to_view == 1
                  ? true
                  : false
                  : "",
                allow_replenishment: detail?.allowReplenishment || "",
                is_active_price: detail?.isActivePrice || ""
              }}
              onSubmit={(values) => {
                submit(values);
              }}
            >

              <StatusForm
                objectName={Url.GetParam("object_name")}
                detail={detail}
                defaultOwner={detail?.default_owner}
                defaultReviewer={detail?.default_reviewer}
                setColor={setColor}
                userList={setUserList}
                project_id={Url.GetParam("projectId") ? Url.GetParam("projectId") : ""}
              />
              <div>
                <SaveButton label="Save" />
                <CancelButton on Click={() => {
                  props.history.goBack()
                }}
                /></div>
            </Form></div>
        </TabPane>
        {showHistory && <TabPane tabId={Tab.HISTORY}>
          <ActivityList
            id={statusId}
            objectId={statusId}
            object_name={ObjectName.STATUS}
          />
        </TabPane>}
      </TabContent>
    </>
  );
};
export default statusDetail;
