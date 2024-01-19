import React, { Fragment, useEffect, useState } from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import ProductCard from "../../product/components/productCard";
import Currency from "../../../lib/Currency";
import StatusText from "../../../components/StatusText";
import OrderService from "../../../services/OrderService";
import Select from "../../../components/Select";
import Quantity from "../../../components/Quantity";
import OrderProductService from "../../../services/OrderProductService";
import { fetchList } from "../../../actions/table";
import Url from "../../../lib/Url";
import { useDispatch } from "react-redux";
import Toast from "../../../components/Toast";
import Permission from "../../../helpers/Permission";
import { hasPermission } from "../../../services/UserRolePermissionService";
import Form from "../../../components/Form";



const ProductTab = (props) => {
    const { id, history, params,apiURL,showStatusColumn, bulkSelect, showBulkSelect, orderId } = props;

    const [totalAmount, setAmount] = useState("")
    const [upiAmount, setUpiAmount] = useState("")
    const [ cashAmount, setCashAmount] = useState("")
    let enableOrderProductEdit = hasPermission(Permission.ORDER_PRODUCT_EDIT);
    const dispatch = useDispatch()

    useEffect(()=>{
        getOrder()
    },[orderId])

    const getOrder=async ()=>{
      
          const response=await OrderService.search({orderId : orderId})
          if(response && response.data){
            let orderDetail = response.data
            orderDetail.forEach((detail)=>{
                setAmount(detail?.total_amount)
                setCashAmount(detail?.cash_amount)
                setUpiAmount(detail?.upi_amount)

            })
          }
        
      }



    const sortOptions = [
        {
          value: "id:DESC",
          label: "Most Recent",
        },
        {
          value: "product_display_name:ASC",
          label: "Name",
        },
      ];


      const handleQuantityChange=async (e,orderProductId)=>{
        let param ={
            quantity: e && e?.values && e?.values?.quantity ? e?.values?.quantity?.value : "",
            orderId:orderId,
            orderProductId: orderProductId
        }
       let responce = await OrderProductService.update(orderProductId,param)
       if(responce){
          Toast.success(responce && responce?.data && responce?.data?.message)
           dispatch(
               fetchList(id, `${endpoints().orderProductAPI}/search`, 1, 25, {
                 orderId: orderId,
                 isWeb: orderId ? true : false,
                 sort: Url.GetParam("sort"),
                 sortDir: Url.GetParam("sortDir"),
               })
             );
       }
      }


    return (
        <Fragment className=" card card-body ">
            <ReduxTable
                id={id}
                searchPlaceholder="Search"
                apiURL={apiURL}
                paramsToUrl={true}
                sortByOptions={sortOptions}
                params={params}
                history={history}
                OrderTotalAmount={totalAmount}
                bulkSelect={showBulkSelect}
                onBulkSelect={bulkSelect}
            >
                <ReduxColumn
                    field="product_name"
                    sortBy="product_display_name"
                    renderField={(row) => (
                        <ProductCard
                            productImageIcon
                            square
                            productName={row.product_name}
                            brandName={row.brand_name}
                            url={row.image}
                            size={row.size}
                            id={row.product_id}
                            brand_id={row.brand_id}
                        />
                    )}
                >
                    Product Name
                </ReduxColumn>
                <ReduxColumn
                    field="unit_price"
                    className="text-center"
                    renderField={(row) => (
                        <span>{Currency.Format(row.unit_price)}</span>
                    )}
                >
                    Unit Price
                </ReduxColumn>
                <ReduxColumn
                    field="quantity"
                    className="text-center"
                    renderField={(row) => (
                        <Form
                        initialValues={{
                            quantity: row.quantity ? {
                                label: row.quantity,
                                value: row.quantity
                            } : ""
                        }}
                        enableReinitialize
                        >
                        <Quantity 
                         onChange={(e) => handleQuantityChange(e, row?.id)}
                         isDisabled={!enableOrderProductEdit}
                         />
                        </Form>
                    )}
                >
                    Quantity
                </ReduxColumn>
                <ReduxColumn
                    field="amount"
                    className="text-center"
                    renderField={(row) => (
                        <span>{Currency.Format(row.amount)}</span>
                    )}
                >
                    Amount
                </ReduxColumn>
                {showStatusColumn &&
                    <ReduxColumn
                    field="status"
                    className="text-center"
                    renderField={(row) => (
                        <StatusText backgroundColor={row?.colourCode} status={row?.status} />
                      )}
                >
                    Status
                </ReduxColumn>}

            </ReduxTable>
        </Fragment>
    )

}

export default ProductTab;