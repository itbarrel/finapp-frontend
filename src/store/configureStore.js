import reducer from "./hydrate";
import middleware from "./middleware";
import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

// stores that will not be persisted
const nonPersistReducers = [];

// Configuration for state persisting mechanism
const persistConfig = {
  key: "root",
  version: 2,
  blacklist: nonPersistReducers,
  stateReconciler: autoMergeLevel1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  preloadedState: {},
});

export const persistor = persistStore(store);

export default store;
