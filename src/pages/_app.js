import { wrapper } from "../store";
import store, { persistor } from "../store/configureStore";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
// import "../../public/vendors/style";
import "../assets/styles/style.css";

import { PersistGate } from "redux-persist/integration/react";
import { nprofress } from "../services/nprofress";

nprofress();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
