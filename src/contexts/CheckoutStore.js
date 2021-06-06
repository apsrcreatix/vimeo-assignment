import createStore from "utils/createStore";

//actions
export const CHECKOUT_STORE_ACTIONS = Object.freeze({
  ADD_TO_CART: "ADD_TO_CART",
  RESET: "RESET",
});

// initial state for the checkout store
const INIT_CHECKOUT_STATE = {
  products: [],
};

const checkoutReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHECKOUT_STORE_ACTIONS.ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, ...payload],
      };
    case CHECKOUT_STORE_ACTIONS.RESET:
      return INIT_CHECKOUT_STATE;
    default:
      throw new Error("Unknown action dispatched:", action);
  }
};

// creating a new store by using create store's instance
const [CheckoutStoreProvier, useCheckoutDispatcher, useCheckoutStore] =
  createStore(checkoutReducer, INIT_CHECKOUT_STATE);

export { CheckoutStoreProvier, useCheckoutDispatcher, useCheckoutStore };
