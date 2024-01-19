import React, { useState, useEffect } from "react";
import ProductCard from "../product/components/productCard";
import Url from "../../lib/Url";
import TransferService from "../../services/TransferService";
import PageSearch from "../../components/PageSearch";
import StoreProductService from "../../services/StoreProductService";
import ProductService from "../../services/ProductService";
import ToggleButton from "../../components/ToggleSwitchButton";
import CountBadge from "../../components/CountBadge";
import Quantity from "../../components/Quantity";
import QuantityEditModal from "../../components/modal/QuantityEditModal";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ProductSelectModal from "../../components/ProductSelectModal";
import NoRecordsFound from "../../components/NoRecordsFound";

const Replenish = (props) => {
    let replenishType = Url.GetParam("replenishBy") ? Url.GetParam("replenishBy") : "stock";
    const [selectedRow, setSelectedRow] = useState("");
    const [openQuantityModal, setOpenQuantityModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [searchTerm, setSearchTerm] = useState(Url.GetParam("search"));
    const [allStoreList, setAllStoreList] = useState([]);
    const [replenishBy, setReplenishBy] = useState(replenishType);
    const [distributionStoreQuanity, setDistributionStoreQuantity] = useState(0);
    const [openQuantityEditModal, setQuantityEditModelOpen] = useState(false);
    const [distributionStoreProductDetail, setDistributionStoreProductDetail] = useState("");
    const [isWareHouseQuantityUpdate, setIsWareHouseQuantityUpdate] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(Url.GetParam("productId"));
    const [productSelectModalOpen, setProductSelectModalOpen] = useState(false);
    const [searchProducts, setSearchProducts] = useState([]);
    const [replenishStoreList, setReplenishStoreList] = useState([]);
    const [replenishedStoreList, setReplenishedStoreList] = useState([]);
    const [noReplenishStoreList, setNoReplenishStoreList] = useState([]);
    const [totalReplenishQuantity, setTotalReplenishQuantity] = useState(0);
    const [replenishAllModalOpen, setReplenishAllModalOpen] = useState(false);

    useEffect(() => {
        renderIntialList();
        props.showSidenav && props.showSidenav();
    }, []);

    const renderIntialList = () => {

        updateUrl({ search: searchTerm, productId: selectedProductId, replenishBy: replenishBy });

        if (searchTerm) {
            onSearchClick(searchTerm, Url.GetParam("productId"));
        }

        if (selectedProductId) {
            getReplenishStoreList(selectedProductId);
        }

    }

    const getReplenishStoreList = async (productId, replenishBy) => {

        productId = productId ? productId : Url.GetParam("productId");

        replenishBy = replenishBy != undefined ? replenishBy : Url.GetParam("replenishBy")

        if (productId) {

            let replenishStoreResponse = await StoreProductService.replenishSearch({ productId: productId, replenishBy: replenishBy });

            if (replenishStoreResponse && replenishStoreResponse.data) {

                setAllStoreList(replenishStoreResponse.data.allStoreList);

                setReplenishedStoreList(replenishStoreResponse.data.replenishedStoreList);

                setReplenishStoreList(replenishStoreResponse.data.replenishStoreList);

                setNoReplenishStoreList(replenishStoreResponse.data.noReplenishStoreList);

                setTotalReplenishQuantity(replenishStoreResponse?.data?.totalReplenishQuantity);

                if (replenishStoreResponse?.data?.distributionCenterStoreProducDetail) {
                    setDistributionStoreProductDetail(replenishStoreResponse?.data?.distributionCenterStoreProducDetail);
                }

                if (replenishStoreResponse?.data?.distributionCenterQuantity >= 0) {
                    setDistributionStoreQuantity(replenishStoreResponse?.data?.distributionCenterQuantity);
                }

            }
        }

    }

    const updateUrl = (params) => {

        params.productId = params.productId ? params.productId : "";

        params.search = params.search ? params.search : "";

        params.replenishBy = params.replenishBy != undefined ? params.replenishBy : "";

        Url.UpdateUrl(params, props);
    }

    const handleReplenish = async (values, resetSelectedQuantity) => {

        let quantity = values && values.quantity;

        if (selectedRow) {

            let bodyData = { toLocationId: selectedRow?.store_id, quantity: quantity, productId: selectedRow?.productId };

            await TransferService.replenish(bodyData, () => {

                toggleQuantitySelectModal();

                getReplenishStoreList(selectedRow.productId);

                resetSelectedQuantity(null);

            });
        }
    }

    const replenishAll = async () => {

        let replenishBody = new Array();

        if (replenishStoreList && replenishStoreList.length > 0) {

            for (let i = 0; i < replenishStoreList.length; i++) {
                replenishBody.push({
                    toLocationId: replenishStoreList[i].store_id,
                    quantity: replenishStoreList[i].replenishQuantity,
                    productId: replenishStoreList[i].productId,
                })
            }

            await TransferService.bulkReplenish({ replenishList: replenishBody }, () => {

                toggleReplenishAll();

                getReplenishStoreList(selectedRow.productId);

            });


        }

    }

    const toggleQuantitySelectModal = () => {
        setOpenQuantityModal(false);
        setSelectedRow("");
    }

    const handleSearch = async (event) => {
        if (event && event.target && event.target.value) {
            setSearchTerm(event.target.value);
            updateUrl({ search: event.target.value, productId: selectedProductId, replenishBy: replenishBy });
        } else {
            setSearchTerm("");
            updateUrl({ search: "", productId: selectedProductId, replenishBy: replenishBy });
        }
    }

    const clearState = () => {
        setSelectedProduct("");
        setReplenishStoreList([]);
        setDistributionStoreProductDetail("");
        setDistributionStoreQuantity("");
        setAllStoreList([]);
        setReplenishedStoreList([]);
        setNoReplenishStoreList([]);
        setSelectedProductId("");
        setReplenishBy(false);
        setTotalReplenishQuantity(0);
        updateUrl({ search: "", productId: "", replenishBy: "" });
    }

    const onSearchClick = async (search, productId) => {
        try {
            let searchText = search ? search : searchTerm;

            if (searchText) {

                let response = await ProductService.search({ search: searchText });

                if (response && response.data) {

                    let productList = response.data;

                    if (productList && productList.length == 1) {

                        setSelectedProduct(productList[0]);

                        setSelectedProductId(productList[0].id);

                        updateUrl({ search: searchTerm, productId: productList[0].id, replenishBy: replenishBy });

                        getReplenishStoreList(productList[0].id);

                    } else if (productList && productList.length > 1) {

                        if (productId) {

                            let selectedProduct = productList.find((data) => data.id == productId);

                            if (selectedProduct) {

                                setSelectedProduct(selectedProduct);

                                setSelectedProductId(selectedProduct.id);

                                updateUrl({ search: searchTerm, productId: selectedProduct.id, replenishBy: replenishBy });

                                getReplenishStoreList(selectedProduct.id);
                            }
                        } else {
                            setSearchProducts(productList);
                            setProductSelectModalOpen(true);
                        }
                    }
                } else {
                    clearState();
                }
            } else {
                clearState();

            }
        } catch (err) {
            console.log(err);
        }
    }

    const onStoreClickHandle = (data) => {
        setSelectedRow(data)
        setOpenQuantityModal(true);
    }

    const handleToggle = (event) => {
        if (event && event.target) {
            setReplenishBy(event.target.checked ? "order" : "stock");

            if (event.target.checked) {
                getReplenishStoreList(selectedProductId, "order");
                updateUrl({ search: searchTerm, productId: selectedProductId, replenishBy: "order" });
            } else {
                getReplenishStoreList(selectedProductId, "stock");
                updateUrl({ search: searchTerm, productId: selectedProductId, replenishBy: "stock" });
            }
        }
    }


    const closeQuantityEditModal = () => {
        setQuantityEditModelOpen(false);
        setSelectedRow("");
        setIsWareHouseQuantityUpdate(false);
    };

    const editModelFooter = (
        <Button type="submit" label="Update" className="h6-5-important" />
    );

    const editModelBody = (
        <>
            <Quantity name="quantity" label="Quantity" />

            {!isWareHouseQuantityUpdate && (
                <>
                    <Quantity name="min_quantity" label="Min Quantity" />

                    <Quantity name="max_quantity" label="Max Quantity" />
                </>
            )}
        </>
    );

    const EditStoreProductQuantity = async (values) => {

        const data = new Object();

        let storeProductId = isWareHouseQuantityUpdate ? distributionStoreProductDetail?.id : selectedRow?.store_product_id

        let productId = isWareHouseQuantityUpdate ? distributionStoreProductDetail?.product_id : selectedRow?.productId;

        data.quantity = values.quantity.value;

        if (!isWareHouseQuantityUpdate) {

            data.min_quantity = values.min_quantity.value;

            data.max_quantity = values.max_quantity.value;
        }

        if (storeProductId) {

            StoreProductService.updateReplenishQuantity(storeProductId, data, (err, response) => {
                if (response && response.data) {
                    getReplenishStoreList(productId);
                    closeQuantityEditModal();
                }
            });
        }
    };

    const onKeyUp = (event) => {
        if (event.keyCode == 13) {
            setSearchTerm(event.target.value);
            onSearchClick(event.target.value)
        }
    }

    const toggle = () => {
        setProductSelectModalOpen(!productSelectModalOpen);
        setSearchProducts([]);
    }

    const onProductClick = (product) => {
        if (product) {
            setSelectedProduct(product);

            setSelectedProductId(product.id);

            updateUrl({ search: searchTerm, productId: product.id, replenishBy: replenishBy });

            getReplenishStoreList(product.id);

            toggle();
        }
    }

    const toggleReplenishAll = () => {
        setReplenishAllModalOpen(false);
    }

    const editInitialValue = {
        quantity: {
            label: selectedRow?.quantity >= 0 ? selectedRow?.quantity : "",
            value: selectedRow?.quantity >= 0 ? selectedRow?.quantity : "",
        },
        min_quantity: {
            label: selectedRow?.min_quantity > 0 ? selectedRow?.min_quantity : "",
            value: selectedRow?.min_quantity > 0 ? selectedRow?.min_quantity : "",
        },
        max_quantity: {
            label: selectedRow?.max_quantity >= 0 ? selectedRow?.max_quantity : "",
            value: selectedRow?.max_quantity >= 0 ? selectedRow?.max_quantity : "",
        },
    };

    const ReplenishCard = ({ replenishArray, quantityAttribute, title }) => {

        return (
            <>
                {replenishArray && replenishArray.length > 0 && (
                    <div className={"row page-heading  cover  py-2"} title={title}>
                        {replenishArray.map((data) => {
                            return (
                                <div className="px-3 py-2 cursor-pointer">
                                    <div className="card" style={{ width: "250px", height: "120px", backgroundColor: data.replenishQuantity > 0 ? data.storeColorCode ? data.storeColorCode : "#dc3545" : "#D3D3D3" }}>
                                        <h6 className="card-header text-white text-uppercase border-bottom">
                                            <div className="d-flex flex-row justify-content-between">
                                                <div onClick={() => onStoreClickHandle(data)} className="w-100  text-truncate">
                                                    {data.locationName}
                                                </div>
                                                <div
                                                    title="Location Quantity"
                                                    onClick={() => {
                                                        setQuantityEditModelOpen(true);
                                                        setSelectedRow(data)
                                                    }}>
                                                    <CountBadge noValidateCount={true} count={data.tempQuantity} badgeColor="#007bff" />
                                                </div>
                                            </div>
                                        </h6>
                                        <div className="card-body text-white d-flex flex-row align-items-center justify-content-between" onClick={() => onStoreClickHandle(data)}>
                                            <div className="d-flex flex-column justify-content-center align-items-start">
                                                <div style={{ fontSize: "12px" }}>Min : {replenishBy == "order" ? data.minOrderQuantity : data.min_quantity}</div>
                                                <div style={{ fontSize: "12px" }}>Max : {replenishBy == "order" ? data.maxOrderQuantity : data.max_quantity} </div>
                                            </div>
                                            <div className="align-self-center">
                                                <h1 title="Replenish Quantity">{data[quantityAttribute]}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </>
        )
    }

    const deleteBody = (
        <p className="text-center mb-4">
            Are you sure you want to Replenish ? <br />
        </p>
    );
    const deleteFooter = (
        <>
            <Button type="button" label="Replenish" onClick={() => {
                replenishAll();
            }} />
        </>
    );


    return (
        <>
            <div className="row page-heading  cover py-3 align-items-center">

                <div className="col-lg-1 col-sm-12">
                    <h5>Replenish</h5>
                </div>

                <Modal
                    isOpen={openQuantityEditModal}
                    toggleModalClose={closeQuantityEditModal}
                    modalTitle="Edit Quantity"
                    modalBody={editModelBody}
                    modalFooter={editModelFooter}
                    initialValues={editInitialValue}
                    onSubmit={EditStoreProductQuantity}
                    hideDefaultButtons
                />

                <Modal
                    isOpen={replenishAllModalOpen}
                    toggleModalClose={toggleReplenishAll}
                    modalTitle="Replenish"
                    modalBody={deleteBody}
                    modalFooter={deleteFooter}
                    hideDefaultButtons
                />
                <ProductSelectModal
                    modalOpen={productSelectModalOpen}
                    toggleModalClose={toggle}
                    toggle={toggle}
                    productList={searchProducts}
                    onProductClick={onProductClick}
                    bulkSelect={false}
                    showFooter={false}
                />

                <QuantityEditModal
                    handleSubmit={handleReplenish}
                    toggle={openQuantityModal}
                    onModalClose={toggleQuantitySelectModal}
                    modalTitle={`${selectedRow.locationName}`}
                    confirmLabel={"Add"}
                    quantity={selectedRow && selectedRow.replenishQuantity ? selectedRow.replenishQuantity : selectedRow.replenishedQuantity}
                    fieldlabel={"Replenish Quantity: "}
                />

                <div className="col-lg-3 col-sm-12">
                    <PageSearch
                        classnames="page-search"
                        placeholder={"Search Product"}
                        onChange={handleSearch.bind(this)}
                        onSearchClick={onSearchClick}
                        onKeyUp={onKeyUp}
                        value={searchTerm}
                    />
                </div>

                <div className="col-lg-5 col-sm-12 align-items-center">
                    <div className="d-flex flex-row justify-content-around align-items-center">
                        {selectedProduct && (
                            <>
                                <ProductCard
                                    id={selectedProduct.id}
                                    productImageIcon
                                    square
                                    productName={selectedProduct.name}
                                    brandName={selectedProduct.brand}
                                    size={selectedProduct.size != "null" ? selectedProduct.size : ""}
                                    unit={selectedProduct.unit != "null" ? selectedProduct.unit : ""}
                                    salePrice={selectedProduct.sale_price != "null" ? selectedProduct.sale_price : ""}
                                    mrp={selectedProduct.mrp != "null" ? selectedProduct.mrp : ""}
                                    url={selectedProduct.image}
                                    status={selectedProduct.status}
                                    packSize={selectedProduct.pack_size}
                                    brand_id={selectedProduct.brand_id}
                                />
                                <div>
                                </div>
                            </>
                        )}
                        {distributionStoreQuanity >= 0 && distributionStoreProductDetail && (
                            <div
                                className="d-flex justify-content-end cursor-pointer"
                                onClick={() => {
                                    setQuantityEditModelOpen(true);
                                    setSelectedRow(distributionStoreProductDetail);
                                    setIsWareHouseQuantityUpdate(true);
                                }} >
                                <div class="circle-container">
                                    <div class="circle"></div>
                                    <div class="line"></div>
                                    <div class="top-number">{totalReplenishQuantity}</div>
                                    <div class="bottom-number">{distributionStoreQuanity}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {allStoreList && allStoreList.length > 0 && (
                    <div className="col-md-1 col-lg-1 col-sm-12">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <ToggleButton
                                toggleOnLabel={"Order"}
                                toggleOffLabel={"Stock"}
                                handleToggle={handleToggle}
                                toggled={replenishBy == "order" ? true : false}
                            />
                        </div>

                    </div>
                )}

                {replenishStoreList && replenishStoreList.length > 0 && (
                    <div className="col-md-2 col-lg-2 col-sm-12">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <Button type="button" label="Replenish All" onClick={() => setReplenishAllModalOpen(true)} />
                        </div>
                    </div>
                )}
            </div>

            <ReplenishCard
                replenishArray={replenishStoreList}
                quantityAttribute={"replenishQuantity"}
                title={"Replenish Location"}
            />

            <ReplenishCard
                replenishArray={replenishedStoreList}
                quantityAttribute={"replenishedQuantity"}
                title={"Replenished Location"}
            />

            <ReplenishCard
                replenishArray={noReplenishStoreList}
                quantityAttribute={"replenishQuantity"}
                title={"No Replenish Location"}
            />

            {replenishStoreList && replenishedStoreList && replenishStoreList.length == 0 && replenishedStoreList.length == 0 && (
                <NoRecordsFound hideCard={true} />
            )}
            <div>
            </div>
        </>
    );
};


export default Replenish;
