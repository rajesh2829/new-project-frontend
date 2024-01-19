import React, { useState } from 'react';
import ProductCard from '../product/components/productCard';
import Pagination from '../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';


const ProductWiseStoreReport = ({ detail, detailValue, setPage, page, storeList }) => {
    const start = (page - 1) * detailValue?.pageSize;
    const end = start + detailValue?.pageSize;
    const currentDetail = detail.slice(start, end);
    const totalCounts = detailValue?.totalCount;

    // Create an object to store the expanded state of each product
    const [expanded, setExpanded] = useState({});
    const handleExpandClick = (productId) => {
        // Toggle the expanded state of the clicked product
        setExpanded(prevState => ({ ...prevState, [productId]: !prevState[productId] }));
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className='table table-bordered'>
                <thead className='bg-dark text-white'>
                    <tr className='text-center'>
                        <th className='align-middle'>Product</th>
                        <th className='align-middle'>Total Order Quantity</th>
                        <th className='align-middle'>Total Available Quantity</th>
                        <th className='align-middle'>Total Required Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDetail.map((product) => (
                        <>
                            <tr className='border-bottom' key={product.product_id}>
                                <td className=' align-middle text-primary product-name'>
                                    <ProductCard
                                        square
                                        productName={product.product_name}
                                        brandName={product.brand}
                                        size={product.size}
                                        unit={product.unit}
                                        salePrice={product.sale_price}
                                        mrp={product.mrp}
                                        url={product.image}
                                        status={product.status}
                                        packSize={product.pack_size}
                                        id={product.product_id}
                                        brand_id={product.brand_id}
                                    />
                                    <FontAwesomeIcon
                                        className='text-danger pull-right'
                                        icon={
                                            expanded[product.product_id]
                                                ? faAngleDoubleUp
                                                : faAngleDoubleDown
                                        }
                                        onClick={() => handleExpandClick(product.product_id)} />
                                </td>

                                <td className='align-middle text-center'>
                                    {product.total_order_quantity}
                                </td>
                                <td className='align-middle text-center'>
                                    {product.available_quantity}
                                </td>
                                <td className='align-middle text-center'>
                                    {product.required_quantity}
                                </td>
                            </tr>
                            <>
                                {expanded[product.product_id] && (
                                    <tr key={`${product.product_id}-store`} style={{ width: "100%", padding: "-12px" }}>
                                        <td colSpan='4' style={{ padding: "0px" }}>
                                            <div className='card mb-0 pb-0' style={{ border: "none" }}>
                                                {storeList.map((store, index) => (
                                                    <tr style={{ width: "100%" }}>
                                                        <div className="card">
                                                            <div className="d-inline-flex justify-content-around mt-3 mb-0 pb-0">
                                                                <b className='col-4 px-4 my-1'>{store} </b>
                                                                <div className='col-4 text-center '>
                                                                    <p className='mb-0 pb-0 text-muted' style={{ marginBottom: "-10px" }}>Stock Quantity</p>
                                                                    <h5 className='text-danger' >{product?.storeProduct[index]?.quantity}</h5>
                                                                    <p className='text-muted'>{product?.storeProduct[index]?.last_stock_entry_date} </p>
                                                                </div>
                                                                <div className='col-4 mb-0 pb-0 text-center'>
                                                                    <p className='mb-0 pb-0 text-muted' style={{ marginBottom: "-10px" }}>Order Quantity</p>
                                                                    <h5 className='text-danger'>{product?.storeProduct[index]?.order_quantity} </h5>
                                                                    <p className='text-muted'>{product?.storeProduct[index]?.last_order_date} </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </tr>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        </>
                    ))}
                </tbody>
            </table>
            <div className='d-flex justify-content-between'>
                <div>
                    Showing {start + 1} to {end > totalCounts ? totalCounts : end} of{' '}
                    {totalCounts} entries
                </div>
                <Pagination
                    currentPage={page}
                    totalCount={totalCounts}
                    pageSize={detailValue?.pageSize}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default ProductWiseStoreReport;
