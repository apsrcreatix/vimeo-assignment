import createStore from "utils/createStore";
import BUTTON_VARIANTS from "constants/button-variants";

//actions
export const GLOBAL_STORE_ACTIONS = Object.freeze({
  SET_BUTTON_VARIANT: "SET_BUTTON_VARIANT",
});

// initial state for the global store
const INIT_GLOBAL_STATE = {
  buttonVariant: BUTTON_VARIANTS.RED,
};

const globalReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GLOBAL_STORE_ACTIONS.SET_BUTTON_VARIANT:
      return {
        ...state,
        buttonVariant: payload,
      };
    default:
      throw new Error("Unknown action dispatched:", action);
  }
};

// creating a new store by using create store's instance
const [GlobalStoreProvider, useGlobalDispatcher, useGlobalStore] = createStore(
  globalReducer,
  INIT_GLOBAL_STATE
);

export { GlobalStoreProvider, useGlobalDispatcher, useGlobalStore };
