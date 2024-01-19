import classNames from "classnames";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import BasicTab from "./components/BasicTab";
import Action from "../../components/Action";

const TrainingDetailPage = (props) => {

    const [activeTab, setActiveTab] = useState("Basic");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    let { history } = props;
    let id = props?.match?.params?.id;

    const breadcrumbList = [
        { label: "Home", link: "/people/dashboard" },
        { label: "Training", link: "/training" },
        { label: "Training Detail Page", link: "" },
    ];

    const navToggle = (tab) => {
        setActiveTab(tab)
    }

    const actionsMenuList = [
        {
            value: "delete",
            label: "Delete",
        },
    ];

    const handleActionChange = (e) => {
        if (e == "delete") {
            setOpenDeleteModal(true);
        }

    };

    return (
        <>
            <BreadCrumb list={breadcrumbList} />
            <div className="d-flex justify-content-between">
                <PageTitle label="Training Detail Page" />
                <div className="pl-2">
                    <Action
                        dropdownLinks={actionsMenuList}
                        handleChange={handleActionChange}
                    />
                </div>
            </div>
            <Nav tabs className="admin-tabs mt-2">
                <NavItem>
                    <NavLink
                        className={classNames({
                            active: activeTab === "Basic",
                        })}
                        onClick={() => {
                            navToggle("Basic");
                        }}
                    >
                        {"Basic"}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId={"Basic"}>
                    <BasicTab history={history} id={id} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
                </TabPane>
            </TabContent>
        </>
    );
}

export default TrainingDetailPage