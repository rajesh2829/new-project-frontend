import React, { useEffect, useState } from 'react';
import Select from './Select';

const ProductSearch = (props) => {
    const { className, storeProductList, onSearch, onInputChange, label, name, } = props;

    const getProductList = storeProductList.sort((a, b) => (a.value > b.value) ? 1 : -1);

    return (
        <div className={className}>
            <Select
                fullWidth={true}
                label={ label ? label : "Product"}
                name={name ? name : "storeProduct"}
                onSearch={onSearch}
                required
                options={getProductList}
                showVirtualizedMenu={true}
                onInputChange={onInputChange}
            />
        </div>
    )
}

export default ProductSearch;