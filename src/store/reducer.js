import { combineReducers } from "@reduxjs/toolkit";
import { ui, resources } from "./entities";

// slices and entities
import auth from "./slices/auth";
import notification from "./slices/notification";
import { ReduxApiClient } from "./rtk-query";
import loader from "../store/slices/loader";

// combine entities and slices
export default combineReducers({
  auth,
  notification,
  resources,
  ui,
  loader,
  [ReduxApiClient.reducerPath]: ReduxApiClient.reducer,
});
