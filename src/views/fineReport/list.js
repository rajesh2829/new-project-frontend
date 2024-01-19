import React, { useEffect, useState } from "react";
import { apiClient } from "../../apiClient";

// Components
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { useDispatch } from "react-redux";
import { endpoints } from "../../api/endPoints";
import Currency from "../../lib/Currency";
import Url from "../../lib/Url";
import CompanyUserService from "../../services/UserService";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ObjectName from "../../helpers/ObjectName";
import StatusService from "../../services/StatusService";
import UserCard from "../../components/UserCard";
import BreadCrumb from "../../components/Breadcrumb";
import { Collapse } from "reactstrap";

// Tabs Constants
const Fines = (props) => {
    const { history } = props;
    const [userData, setUserData] = useState([]);
    const [status, setStatus] = useState();
    const [productTagList, setProductTagList] = useState();
    const [activeAccordion, setActiveAccordion] = useState({});
    
    useEffect(() => {
        getStatus();
        getSeletedTagDetails();
        getUserList();
    }, []);

    const toggleCollapse = (dataListId) => {
        setActiveAccordion((prevAccordion) => {
            return {
                ...prevAccordion,
                [dataListId]: !prevAccordion[dataListId]
            };
        });
    };

    const getSeletedTagDetails = async () => {
        try {
            const response = await apiClient.get(`${endpoints().tagApi}/list`);
            const tagDetails = response.data.data;

            const tagList = tagDetails
                .filter(tag => tag.type === "FineType")
                .map(tag => ({
                    label: tag.name,
                    value: tag.id,
                    id: tag.id,
                    status: tag.status
                }));

            setProductTagList(tagList);
        } catch (err) {
            // Handle error
        }
    };

    const getStatus = async () => {
        const status = await StatusService.search(
            ObjectName.FINE,
            Fine.STATUS_DRAFT
        );
        setStatus(status?.[0]?.id);
    };

    const sortByOption = [
        {
            value: "id:DESC",
            label: "Most Recent"
        }
    ];

    // Bread crumb list
    const breadcrumbList = [
        { label: "Home", link: "/fineReport" },
        {
            label: "Reports",
            link: "/Reports"
        },
        {
            label: "Fine Report",
            link: ""
        }
    ];

    const getUserList = async () => {
        const data = await CompanyUserService.list();

        const userList = data?.data?.map(list => ({
            value: list.id,
            label: `${list.first_name} ${list.last_name}`
        })) || [];

        setUserData(userList);
    };

    return (
        <>
            <BreadCrumb list={breadcrumbList} />
            <div className="row mx-1 justify-content-between mb-2">
                <PageTitle label="Fine Report" />
            </div>
            <div>
                <ReduxTable
                    id="fines"
                    showHeader
                    newTableHeading
                    apiURL={`${endpoints().fineReportAPI}/search`}
                    searchPlaceholder="Search"
                    totalAmount
                    params={{
                        sort: Url.GetParam("sort"),
                        sortDir: Url.GetParam("sortDir"),
                        objectName: ObjectName.FINE
                    }}
                    sortByOptions={sortByOption}
                    showTypeFilter
                    customTypeOption={productTagList}
                    showDateFilter
                    showUserFilter
                    showStatusFilter
                    paramsToUrl={true}
                    history={props.history}
                    icon={<FontAwesomeIcon icon={faCartShopping} />}
                    message="You can start by clicking on Add Order">
                    <ReduxColumn
                        className="ellipsis text-left"
                        sortBy="user"
                        renderField={(row) => (
                            <div>
                                <div
                                    className="row justify-content-between mr-0 ml-0 mb-0"
                                    onClick={() => toggleCollapse(row.userName)}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    <div className="row mx-2 mt-2 pb-0">
                                        <UserCard
                                            customSize={parseInt(50, 10)}
                                            firstName={row.userName}
                                            url={row.media_url}
                                            lastName={row.lastName}
                                        />
                                    </div>
                                    {activeAccordion[row.userName] ? (
                                        <span className="mt-4 fa fa-chevron-up"></span>
                                    ) : (
                                        <span className="mt-4 fa fa-chevron-down"></span>
                                    )}
                                </div>
                                <Collapse isOpen={activeAccordion[row.userName] || false}>
                                    {row.userData.map((value, index) => (
                                        <div className="row mx-5 mt-2 pb-0" key={index}>
                                            <div className="mt-1 ml-2 pt-1">
                                                {value.typeName}
                                                {": "}
                                                {value.typeAmount}
                                            </div>
                                        </div>
                                    ))}
                                </Collapse>
                            </div>

                        )}>
                        User
                    </ReduxColumn>
                    <ReduxColumn
                        sortBy="amount"
                        width="90px"
                        minWidth="130px"
                        className="text-right"
                        renderField={(row) => <span>{Currency.Format(row.typeTotalAmount)}</span>}>
                        Amount
                    </ReduxColumn>
                </ReduxTable>
            </div>
        </>
    );
};

export default Fines;
