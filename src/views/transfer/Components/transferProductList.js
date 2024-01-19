import React, { Fragment } from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { endpoints } from "../../../api/endPoints";
import ProductCard from "../../product/components/productCard";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import { Link } from "react-router-dom";
import { TagTypeName } from "../../../helpers/Tag";
import UserCard from "../../../components/UserCard";

const TransferProductList = (props) => {
    const { history } = props;

    const sortByOption = [
        {
            value: "id:DESC",
            label: "Most Recent",
        },

    ];

    return (
        <Fragment>
            <ReduxTable
                id="transferProduct"
                showHeader
                searchPlaceholder="Search"
                newTableHeading
                icon={<FontAwesomeIcon icon={faCubes} />}
                message="You can start by clicking on Add New"
                apiURL={`${endpoints().transferProductApi}/search`}
                params={{
                    tab: Url.GetParam("tab"),
                    sort: Url.GetParam("sort") ? Url.GetParam("sort") : "id",
                    sortDir: Url.GetParam("sortDir") ? Url.GetParam("sortDir") : "DESC",
                    productId: props?.product_id ? props?.product_id : ""
                }}
                sortByOptions={sortByOption}
                paramsToUrl={true}
                history={history}
                showDateFilter
                showFromToLocationFilter
                showCategoryFilter
                showTagFilter
                showUserFilter
                tagFilterType={{
                    type: TagTypeName.PRODUCT,
                }}
                showBrandFilter
                showReasonFilter
            >
                <ReduxColumn
                    field="transfer_number"
                    sortBy="transfer_number"
                    isClickable="true"
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px"
                    type="link"
                    className="text-center"
                    renderField={(row) => (
                        <Link
                            to={`/transfer/${row.transfer_id}`}
                        >
                            {row.transfer_number}
                        </Link>
                    )}
                >
                    Transfer#
                </ReduxColumn>
                <ReduxColumn
                    field="date"
                    sortBy="createdAt"
                    renderField={(row) => (
                        <span>
                            {DateTime.getDate(row.date)}
                        </span>
                    )}
                >
                    Date
                </ReduxColumn>
                <ReduxColumn
                    field="from_location_name"
                    sortBy="from_location_name"
                >
                    From Location
                </ReduxColumn>
                <ReduxColumn
                    field="to_location_name"
                    sortBy="to_location_name"
                >
                    To Location
                </ReduxColumn>
                <ReduxColumn
                    field="product_name"
                    sortBy="product_name"
                    renderField={(row) => (
                        <>
                            <ProductCard
                                id={row.product_id}
                                productImageIcon
                                square
                                productName={row.product_name}
                                url={row.image}
                                brandName={row.brand_name}
                                size={row.size}
                                unit={row.unit}
                                salePrice={row.sale_price}
                                mrp={row.mrp}
                                brand_id={row.brand_id}
                            />
                        </>
                    )}
                >
                    Product
                </ReduxColumn>
                <ReduxColumn
                    className="text-center"
                    field="quantity"
                    sortBy="quantity"
                >
                    Quantity
                </ReduxColumn>
                <ReduxColumn
                    field="reasonForTransfer"
                    sortBy="reason_for_transfer"
                    className="text-center"
                >
                    Reason
                </ReduxColumn>
                <ReduxColumn field="createdBy" sortBy="createdBy"
                    renderField={(row) => (
                        <>
                            <UserCard
                                customSize={parseInt(50, 10)}
                                firstName={row.createdByName}
                                url={row.avatarUrl}
                                lastName={row.createdByLastName}
                            />
                        </>
                    )}
                >
                    createdBy
                </ReduxColumn>
            </ReduxTable>
        </Fragment>
    )
}

export default TransferProductList;