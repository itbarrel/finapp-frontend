import store from "./configureStore";
import { createWrapper } from "next-redux-wrapper";

// (context)  -or-  (initialState, options)
const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true }); //process.env.NODE_ENV !== 'production',
