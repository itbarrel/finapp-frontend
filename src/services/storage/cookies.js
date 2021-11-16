// auth :: tokens :: cookies.
// need to set the attributes for the cookies
import Cookie from "js-cookie";
import { TOKEN_KEY, COOKIE, DYNAMIC_FORM_TOKEN } from "../../constants/local-forage";

const CookieService = {
  acceptCookies() {
    Cookie.set(COOKIE, true);
  },

  isCookiesAccepted() {
    return Cookie.get(COOKIE);
  },

  getToken() {
    return Cookie.get(TOKEN_KEY);
  },

  getDynamicToken() {
    return Cookie.get(DYNAMIC_FORM_TOKEN);
  },

  saveToken(accessToken, options) {
    Cookie.set(TOKEN_KEY, accessToken, options);
  },

  saveDynamicToken(dynamicFormToken, options) {
    Cookie.set(DYNAMIC_FORM_TOKEN, dynamicFormToken, options);
  },

  removeToken() {
    Cookie.remove(TOKEN_KEY);
  },
};

export default CookieService;
