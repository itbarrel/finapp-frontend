import combineReducers from "./reducer";
import { HYDRATE } from "next-redux-wrapper";

// eslint-disable-next-line default-param-last
const reducer = (state = {}, action) => {
  if (action.type === HYDRATE) {
    // xPOINT:: Attention! This will overwrite client state! Real apps should use proper reconciliation.
    const appStore = { ...state, ...action.payload };
    // xPOINT:: need to re-conciliation - preserve count value on client side navigation
    if (state.count) {
      appStore.count = state.count;
    }
    return appStore;
  } else {
    return combineReducers(state, action);
  }
};

export default reducer;
