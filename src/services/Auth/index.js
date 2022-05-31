import Router from "next/router";
import { CookieService } from "../../services/storage.service";

export const login = (token, dynamicFormToken) => {
  CookieService.saveToken(token, { expires: 100 });
  CookieService.saveDynamicToken(dynamicFormToken, { expires: 100 })
  Router.push("/secure/dashboard/main");
};

export const logout = () => {
  CookieService.removeToken();
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};
