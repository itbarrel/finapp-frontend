import * as actions from "../apiActions";
import apiClient from "../../services/ApiClient";
import { log } from "../../utils/console-log";
import { pdfDownloader } from "../../utils/pdfDownloader";
import { notification } from "antd";
import { onLogOut } from "../../store/slices/auth";
import { loading } from "../../store/slices/loader";

const api =
  ({ dispatch }) => (next) => (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    const {
      url,
      method,
      data,
      onStart,
      onSuccess,
      onError,
      loadingKey,
      notify = false,
    } = action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }
    if (loadingKey) {
      dispatch({
        type: loading.type,
        payload: loadingKey ? { [loadingKey]: true } : {},
      });
    }

    // eslint-disable-next-line callback-return
    next(action);
    apiClient
      .doRequest(method, url, data)
      .then((response) => {
        if (response.type == 'application/pdf') {
          pdfDownloader(response)
          response = { message: "Pdf ddownloaded successfully" }
        }
        // General
        log("API Call == Response ", response);
        if (notify) {
          notification.success({
            message: "Operation Successful",
            description: response.message,
          });
        }
        dispatch(actions.apiCallSuccess());

        // Specific
        if (onSuccess) {
          dispatch({ type: onSuccess, payload: response });
        }
        if (loadingKey) {
          dispatch({
            type: loading.type,
            payload: loadingKey ? { [loadingKey]: false } : {},
          });
        }
      })
      .catch((err) => {
        // General
        if (err.response && err.response.status === 401) {
          dispatch(onLogOut());
        }
        err?.response?.json().then((error) => {
          dispatch(actions.apiCallFailed(error.message));
          if (loadingKey) {
            dispatch({
              type: loading.type,
              payload: loadingKey ? { [loadingKey]: false } : {},
            });
          }
          notification.error({
            message: "Something went wrong",
            description: error.message,
          });
          // Specific
          if (onError) {
            dispatch({ type: onError, payload: error.message });
          }
        });
      });
  };

export default api;
