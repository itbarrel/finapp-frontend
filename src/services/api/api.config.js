import axios from "axios";
import ENV from "../../configs/dev";
import { CookieService } from "../storage.service";

// axios instance
export const api = axios.create({
  baseURL: ENV.baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Device: "web",
    timeout: 2,
  },
});

export const secureapi = axios.create({
  baseURL: ENV.baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${CookieService.getToken()}`, // when it initialize found cookies undefined at that time.
    Device: "web",
  },
});

const ApiService = {
  // for axios instance
  // setAuthorization() {
  //   api.defaults.headers.Authorization = `Bearer ${CookieService.getToken()}`;
  // },

  setAuthorization(token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  },

  removeAuthorization() {
    // can keep one ;)
    api.defaults.headers.Authorization = ``;
    // eslint-disable-next-line prefer-reflect
    delete api.defaults.headers.common.Authorization;
  },

  // complete exposed axios request
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${CookieService.getToken()}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  // Perform a custom Axios request.
  //
  // data is an object containing the following properties:
  //  - method
  //  - url
  //  - data ... request payload
  //  - auth (optional)
  //    - username
  //    - password

  customRequest(data) {
    return axios(data);
  },
};

export default ApiService;
