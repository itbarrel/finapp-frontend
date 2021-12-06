import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../apiActions";
import { login as _login, logout as _logout, signup as _signup } from "../../services/Auth";
import { CHANGE_PASSWORD, UPDATE_PROFILE } from "../../constants/loaderKeys";

const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    permissions: {},
    loader: {},
    user: null,
    domain: {},
    token: null,
    dynamicFormToken: null,
    hasErrors: false,
  },
  reducers: {
    start: (state) => {
      return state;
    },
    signUp: (state) => {
      state.loader = false;
      state.hasErrors = false;
      _signup();
    },
    login: (state, action) => {
      const { token, user, permissions, domain } = action.payload;
      state.loader = false;
      state.token = token;
      state.isAuthenticated = !!token;
      state.permissions = permissions;
      state.user = user;
      state.domain = domain;
      state.hasErrors = false;
      _login(token, domain?.dynamicFormToken);
    },
    logout: (state) => {
      _logout();
      state.isAuthenticated = false;
      state.loader = false;
      state.user = null;
      state.token = null;
      state.permissions = {};
      state.hasErrors = false;
    },
    update: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    changePassword: (state) => {
      state.loader = false;
    },
    forgetPassword: (state) => {
      state.loader = false;
    },
    resetPassword: (state) => {
      state.loader = false;
    },
    setLoader: (state, action) => {
      const { key, value } = action.payload;
      state.loader = { [key]: value, ...state.loader };
    },
    failed: (state) => {
      state.loader = false;
      state.hasErrors = true;
    },
  },
});

export const {
  start,
  signUp,
  login,
  logout,
  update,
  changePassword,
  forgetPassword,
  resetPassword,
  setLoader,
  failed,
} = slice.actions;

export const onLogin = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/auth/login",
      method: "post",
      data: data,
      onSuccess: login.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateProfile = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/users/${id}`,
      method: "put",
      data,
      loadingKey: UPDATE_PROFILE,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updatePassword = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/auth/changepassword`,
      method: "post",
      data,
      loadingKey: CHANGE_PASSWORD,
      onSuccess: changePassword.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const onForgetPassword = (data) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `v1/auth/forgetpassword`,
      method: "post",
      data,
      onSuccess: forgetPassword.type,
      onError: failed.type,
      notify: true,
    })
  );
  return dispatch(setLoader({ key: "forget", value: false }));
};

export const onResetPassword = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/auth/resetpassword`,
      method: "post",
      data,
      onSuccess: changePassword.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const confirmLogin = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/auth/me",
      method: "post",
      data: {},
      onSuccess: login.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const onSignUp = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/customers",
      method: "post",
      data,
      onSuccess: signUp.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const onLogOut = () => (dispatch) => {
  dispatch(logout());
  return dispatch(resetAll());
};

export default slice.reducer;
