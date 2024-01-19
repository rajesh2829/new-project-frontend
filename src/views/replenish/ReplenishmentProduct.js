import React, { useState } from "react";

import PageTitle from "../../components/PageTitle";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

//Config
import { endpoints } from "../../api/endPoints";

import ProductCard from "../product/components/productCard";
import { Link } from "react-router-dom";
import Action from "../../components/Action";
import Drawer from "../../components/Drawer";
import UserSelect from "../../components/UserSelect";
import SaveButton from "../../components/SaveButton";
import ReplenishService from "../../services/ReplenishService";
import { useDispatch } from "react-redux";

const ReplenishmentProduct = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const [selectedOwner, setSelectedOwner] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);

    const dispatch = useDispatch();

    const onBulkSelect = (value) => {
        setSelectedProducts(value);
    }

    const handleChanges = (value) => {
        if (value == "Assign Owner") {
            setIsOpen(true);
        }
    }

    const handleChange = (selectedUser) => {
        if (selectedUser) {
            setSelectedOwner(selectedUser.id)
        }
    }

    const _toggle = () => {
        setIsOpen(false);
    }

    const addOwnerForm = (<UserSelect label="Owner" handleUserChange={handleChange} />);

    const editFooter = (<SaveButton label="Add" />)

    const addReplenishProductOwner = async () => {
        if (selectedOwner && selectedProducts && selectedProducts.length > 0) {
            let bodyObject = { selectedOwner: selectedOwner, selectedProducts: selectedProducts }
            dispatch(ReplenishService.updateOwner(bodyObject, {}, _toggle));
        }
    }

    return (
        <div>
            <div className="d-flex flex-row justify-content-between">
                <PageTitle
                    label="Replenishment Products"
                    className={"pt-3"}
                />

                <Action
                    dropdownLinks={[{ label: "Assign Owner", value: "Assign Owner" }]}
                    handleChange={(e) => handleChanges(e)}
                    buttonLabel="Action"
                />

                <Drawer
                    modelTitle="Assign Owner"
                    DrawerBody={addOwnerForm}
                    DrawerFooter={editFooter}
                    onSubmit={(values) => {
                        addReplenishProductOwner();
                    }}
                    initialValues={{}}
                    handleOpenModal={_toggle}
                    handleCloseModal={_toggle}
                    handleDrawerClose={_toggle}
                    isModalOpen={isOpen}
                />
            </div>

            <div className="mt-4">
                <ReduxTable
                    id="ReplenishList"
                    showHeader

                    searchPlaceholder="Search"
                    apiURL={`${endpoints().replenish}/search`}
                    newTableHeading
                    history={props.history}
                    paramsToUrl={true}
                    sortByDropdown={true}
                    showCategoryFilter={true}
                    showBrandFilter={true}
                    onBulkSelect={onBulkSelect}
                    bulkSelect
                >
                    <ReduxColumn
                        field="name"
                        type="link"
                        isClickable="true"
                        sortBy="product_name"
                        renderField={(row) => (
                            <div>
                                <Link target="_blank" to={`/replenish?search=${row.barcode}&productId=${row.id}&replenishBy=stock`}>

                                    <ProductCard
                                        id={row.id}
                                        productImageIcon
                                        square
                                        productName={row.name}
                                        brandName={row.brand}
                                        size={row.size != "null" ? row.size : ""}
                                        unit={row.unit != "null" ? row.unit : ""}
                                        salePrice={row.sale_price != "null" ? row.sale_price : ""}
                                        mrp={row.mrp != "null" ? row.mrp : ""}
                                        url={row.image}
                                        status={row.status}
                                        packSize={row.pack_size}
                                        brand_id={row.brand_id}
                                        disableLink
                                    />
                                </Link>
                            </div>
                        )}
                    >
                        Product
                    </ReduxColumn>
                    <ReduxColumn
                        className="text-center"
                        field="quantity"
                        sortBy="quantity"
                        minWidth="170px"
                    >
                        Quantity
                    </ReduxColumn>
                    <ReduxColumn
                        className="text-center"
                        field="store_count"
                        sortBy="store_count"
                        minWidth="170px"
                    >
                        Location Count
                    </ReduxColumn>
                    <ReduxColumn
                        className="text-center"
                        field="order_quantity"
                        sortBy="order_quantity"
                        minWidth="170px"
                    >
                        Order Count
                    </ReduxColumn>
                    <ReduxColumn
                        className="text-center"
                        field="distributionCenterQuantity"
                        sortBy="distribution_center_quantity"
                        minWidth="170px"
                    >
                        Distribution Center Quantity
                    </ReduxColumn>

                    <ReduxColumn
                        className="text-center"
                        field="ownerName"
                        sortBy="owner_id"
                        minWidth="170px"
                    >
                        Owner
                    </ReduxColumn>
                </ReduxTable>
            </div>
        </div >
    );
};

export default ReplenishmentProduct;
