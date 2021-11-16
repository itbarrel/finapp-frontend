import * as actions from "../apiActions";
import dynamicFormApiClient from "../../services/ApiClient/dynamic-form";
import { log } from "../../utils/console-log";
import { notification } from "antd";
import { onLogOut } from "../slices/auth";
import { loading } from "../slices/loader";

const DynamicFormApis =
  ({ dispatch }) => (next) => (action) => {
    if (action.type !== actions.dynamicFormApiCallBegan.type) {
      return next(action);
    }

    const {
      url,
      method,
      data,
      token,
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
    dynamicFormApiClient
      .doRequest(method, url, data, token)
      .then((response) => {
        // General
        log("API Call == Response ", response);
        if (notify) {
          notification.success({
            message: "Operation Successful",
            description: response.message,
          });
        }
        dispatch(actions.dynamicFormApiCallSuccess());

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
          dispatch(actions.dynamicFormApiCallFailed(error.message));
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

export default DynamicFormApis;
