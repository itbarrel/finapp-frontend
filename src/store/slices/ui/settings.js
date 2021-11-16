import { createSlice } from "@reduxjs/toolkit";

import {
  LAYOUT_TYPE_FULL,
  NAV_STYLE_FIXED,
  THEME_COLOR_SELECTION_PRESET,
  THEME_TYPE_SEMI_DARK,
} from "../../../constants/ThemeSetting";

const slice = createSlice({
  name: "ui-settings",
  initialState: {
    navCollapsed: true,
    navStyle: NAV_STYLE_FIXED,
    layoutType: LAYOUT_TYPE_FULL,
    themeType: THEME_TYPE_SEMI_DARK,
    colorSelection: THEME_COLOR_SELECTION_PRESET,
    themeColor: "#8A2BE2",

    pathname: "",
    // width: "WINDOW_WIDTH",
    width: 1367,
    isDirectionRTL: false,
    locale: {
      languageId: "english",
      locale: "en",
      name: "English",
      icon: "us",
    },
  },
  reducers: {
    loading: (state) => {
      state.loader = true;
    },
    toggleCollapsedNav: (state, action) => {
      const { payload } = action;
      state.navCollapsed = payload;
    },
    setPathName: (state, action) => {
      const { payload } = action;
      state.pathname = payload;
    },
    windowWidth: (state, action) => {
      const { payload } = action;
      state.width = payload;
    },
    themeType: (state, action) => {
      const { payload } = action;
      state.themeType = payload;
    },
    navStyle: (state, action) => {
      const { payload } = action;
      state.navStyle = payload;
    },
    layoutType: (state, action) => {
      const { payload } = action;
      state.layoutType = payload;
    },
    themeColor: (state, action) => {
      const { payload } = action;
      state.themeColor = payload;
    },
    themeColorSelected: (state, action) => {
      const { payload } = action;
      state.colorSelection = payload;
    },
    switchLanguage: (state, action) => {
      const { payload } = action;
      state.locale = payload;
    },
    failed: (state) => {
      state.loader = false;
      state.hasErrors = true;
    },
  },
});

export const {
  loading,
  toggleCollapsedNav,
  setPathName,
  windowWidth,
  themeType,
  themeColor,
  navStyle,
  layoutType,
  themeColorSelected,
  switchLanguage,
  failed,
} = slice.actions;

export const toggleCollapsedSideNav = (navCollapsed) => (dispatch) => {
  return dispatch(toggleCollapsedNav(navCollapsed));
};
export const updateWindowWidth = (width) => (dispatch) => {
  return dispatch(windowWidth(width));
};
export const setThemeType = (data) => (dispatch) => {
  return dispatch(themeType(data));
};
export const setThemeColor = (data) => (dispatch) => {
  return dispatch(themeColor(data));
};
export const onNavStyleChange = (data) => (dispatch) => {
  return dispatch(navStyle(data));
};
export const settingPathName = (data) => (dispatch) => {
  return dispatch(setPathName(data));
};
export const onLayoutTypeChange = (data) => (dispatch) => {
  return dispatch(layoutType(data));
};

export default slice.reducer;
