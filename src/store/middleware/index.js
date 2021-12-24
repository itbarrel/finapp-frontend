import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./api";
import DynamicFormApi from "./dynamic-form-api";
import toast from "./toast";
import { ReduxApiClient } from "../rtk-query";

const middleware = () => {
  return [
    ...getDefaultMiddleware({
      serializableCheck: false
      // serializableCheck: {
      //   /* ignore persistance actions */
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
    toast,
    api,
    DynamicFormApi,
    ReduxApiClient.middleware,
  ];
};

export default middleware;
