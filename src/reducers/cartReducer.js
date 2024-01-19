// Constant
import { cartConstants } from "../helpers/OrderList"
import ArrayList from "../lib/ArrayList";

// Cart reducer
export const cartReducer = (state, action) => {
    switch (action.type) {
        case cartConstants.UPDATE_PRODUCT_LIST:
            return { ...state, products: action.payload };

        case cartConstants.ADD_TO_CART:
            if (state.cart?.length == 0) {
                state.cart.push(action.payload)
            } else if (ArrayList.isNotEmpty(state.cart)) {
                let isItemExist = false;
                state.cart.map((item, key) => {
                    if (item.id == action.payload.id) {
                        state.cart[key].qty++;
                        isItemExist = true;
                    }
                });

                if (!isItemExist) {
                    state.cart.push(action.payload);
                }
            }
            return { ...state, cartItem: state.cartItem + 1 };

        case cartConstants.REMOVE_FROM_CART:
            let qty = action.payload.qty;
            return {
                ...state,
                cart: state.cart.filter((c) => c.id !== action.payload.id),
                cartItem: state.cartItem - qty
            };

        case cartConstants.CHANGE_CART_QTY:
            return {
                ...state,
                cart: state.cart.filter((c) =>
                    c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
                ),
            };

        case cartConstants.PLACE_ORDER:
            return {
                ...state,
                orderPlaced: true,
                orderId: action.orderId
            };


        case cartConstants.ADD_TOTAL_COST:
            return {
                ...state,
                totalCost: action.totalCost,
            };

        case cartConstants.UPDATE_CART:
            let cartIndex;

            state.cart.forEach((data, index) => {
                if (data.id == action.payload.productId) {
                    cartIndex = index;
                }
            });

            if (cartIndex > -1) {
                state.cart[cartIndex].orderProductId = action.payload.orderProductId;
            }

            return {
                ...state,
            };
        case cartConstants.UPDATE_STATE:
            let stateData = action.payload;
            return { 
                cart: stateData.cart,
                cartItem: stateData.cartItem,
                orderId: stateData.orderId,
                orderPlaced: stateData.orderPlaced,
                products: stateData.products,
                totalCost: stateData.totalCost
            };
        default:
            return state;
    }
}