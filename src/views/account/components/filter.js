import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import Form from "../../../components/Form";
import HorizontalSpace from "../../../components/HorizontalSpace";
import Select from "../../../components/Select";
import { Brand } from "../../../helpers/Brand";
import Url from "../../../lib/Url";
import { getBrands } from "../../../services/ProductBrandService";
import CategoryService from "../../../services/CategoryService";

const VendorProductFilter = (props) => {
    const { params } = props;
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [brandValue, setBrandValue] = useState(Url.GetParam("brand"));
    const [categoryValue, setCategoryValue] = useState(Url.GetParam("category"));
    const dispatch = useDispatch();

    useEffect(() => {
        getBrandDetail();
        getCategoryDetail();
    }, []);

    if (categoryValue) {
        params.category = categoryValue;
    }

    if (brandValue) {
        params.brand = brandValue;
    }

    const getBrandDetail = async () => {
        const response = await getBrands();
        const data = response.data;
        const brands = [];
        if (data && data.length > 0) {
            data.forEach((brand) => {
                brands.push({
                    value: brand.id,
                    label: brand.name,
                });
            });
        }
        setBrandList(brands);
    };

    const getCategoryDetail = async () => {
        const response = await CategoryService.list();
        const data = response.data;
        const categories = [];
        if (data && data.length > 0) {
            data.forEach((category) => {
                categories.push({
                    id: category.id,
                    value: category.id,
                    label: category.name,
                });
            });
        }
        setCategoryList(categories);
    };

    const brandChange = async (values) => {
        const id = values?.value ? values?.value : "";
        Url.UpdateUrl({ brand: id ? id : "", category: categoryValue ? categoryValue : "" }, props);
        setBrandValue(id)
        dispatch(
            fetchList(
                "publishedProducts",
                `${endpoints().accountAPI}/productList/search`,
                1,
                25,
                {
                    brand: id ? id : "",
                    status: Brand.STATUS_ACTIVE,
                    category: categoryValue ? categoryValue : "",
                    search: Url.GetParam("search") || "",
                    id: params?.id,
                    pagination: true,
                }
            )
        );
    }

    const categoryChange = async (values) => {
        const id = values?.value ? values?.value : "";
        Url.UpdateUrl({ category: id, brand: brandValue ? brandValue : "" }, props);
        setCategoryValue(id)
        dispatch(
            fetchList(
                "publishedProducts",
                `${endpoints().accountAPI}/productList/search`,
                1,
                25,
                {
                    category: id ? id : "",
                    brand: brandValue ? brandValue : "",
                    status: Brand.STATUS_ACTIVE,
                    search: Url.GetParam("search") || "",
                    id: params?.id,
                    pagination: true,
                }
            )
        );
    }

    const initialValues = {
        brand: brandList.find((x) => x?.value == brandValue),
        category: categoryList.find((data) => data?.value == categoryValue)
    }

    return (
        <>
            <div style={{ width: "100%" }}>
                <Form enableReinitialize initialValues={initialValues}>
                    <div className="d-flex">
                        <div>
                            <Select
                                name="brand"
                                options={brandList}
                                placeholder="Select Brand"
                                handleChange={brandChange}
                            />
                        </div>
                        <HorizontalSpace paddingleft="1" />
                        <div>
                            <Select
                                name="category"
                                options={categoryList}
                                placeholder="Select Category"
                                handleChange={categoryChange}
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default VendorProductFilter;
