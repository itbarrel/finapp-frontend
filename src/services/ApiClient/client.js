/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable indent */
import fetch from "unfetch";
import withQuery from "with-query";
import Router from "next/router";

import { CookieService } from "../../services/storage.service";
import { logout } from "../Auth";

const checkStatus = (response) => {
  const contentType = response.headers.get('content-type')

  if (response.ok) {
    if (contentType.search('application/pdf') >= 0) {
      return response.blob()
    } else {
      return response.json();
    }
  } else {
    const error = new Error(response.status);
    error.response = response;
    return Promise.reject(error);
  }
};

const handleError = (error) => {
  if (error.response.status === 401) {
    logout();
  }
  if (error.response.status === 403) {
    Router.push("/secure/dashboard");
  }
  return Promise.reject(error);
};

export default class ApiClient {
  constructor(apiUrl) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    this.config = config;
    this.apiUrl = apiUrl;
  }

  doRequest(method, path, data, headers = {}) {
    const token = CookieService.getToken();

    switch (method) {
      case "get":
      case "GET":
        return this.get(path, data, token, headers);

      case "post":
      case "POST":
        return this.post(path, data, token, headers);

      case "postFormData":
        return this.postFormData(path, data, token, headers);

      case "putFormData":
        return this.putFormData(path, data, token, headers);

      case "patch":
      case "PATCH":
        // request;
        return this.patch(path, data, token, headers);

      case "put":
      case "PUT":
        return this.put(path, data, token, headers);

      case "delete":
      case "DELETE":
        return this.delete(path, data, token, headers);

      default:
        return this.get(path, data, token, headers);
    }
  }

  get(path, data, token, headers = {}) {

    console.log("12345678");
    const url = withQuery(this.apiUrl + path, data);
    const updatedHeaders = { ...this.config.headers, ...headers }
    const config = { ...this.config, method: "GET", headers: updatedHeaders };
    return this.makeRequest(url, config, token);
  }

  post(path, data, token, headers = {}) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const updatedHeaders = { ...this.config.headers, ...headers }
    const config = { ...this.config, method: "POST", body: json, headers: updatedHeaders };
    return this.makeRequest(url, config, token);
  }

  delete(path, data, token, headers = {}) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const updatedHeaders = { ...this.config.headers, ...headers }
    const config = { ...this.config, method: "DELETE", body: json, headers: updatedHeaders };
    return this.makeRequest(url, config, token);
  }

  patch(path, data, token, headers = {}) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const updatedHeaders = { ...this.config.headers, ...headers }
    const config = { ...this.config, method: "PATCH", body: json, headers: updatedHeaders };
    return this.makeRequest(url, config, token);
  }

  put(path, data, token, headers = {}) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const updatedHeaders = { ...this.config.headers, ...headers }
    const config = { ...this.config, method: "PUT", body: json, headers: updatedHeaders };
    return this.makeRequest(url, config, token);
  }
  putFormData(path, data, token, headers = {}) {
    console.log("987654321");
    const url = this.apiUrl + path;
    const updatedHeaders = { ...this.config.headers, ...{ "Content-Type": "application/form-data" } }

    var formData = new FormData()
    console.log('>>>>>..111', data);
    Object.keys(data).map(key => {
      console.log('>>>>>..', key);
      formData.append(key, data[key])
    })
    console.log(">>>>>>>>>>>>>>>>.....", formData)

    const config = { method: "PUT", body: formData };
    return this.makeRequest(url, config, token);
  }

  postFormData(path, data, token, headers = {}) {
    const url = this.apiUrl + path;
    const updatedHeaders = { ...this.config.headers, ...{ "Content-Type": "application/form-data" } }

    var formData = new FormData()
    console.log('>>>>>..', data);
    Object.keys(data).map(key => {
      console.log('>>>>>..', key);
      formData.append(key, data[key])
    })
    console.log(">>>>>>>>>>>>>>>>.....", formData)

    const config = { method: "POST", body: formData };
    return this.makeRequest(url, config, token);
  }



  makeRequest(url, config, token) {
    const { headers } = config;

    const configuration = token
      ? { ...config, headers: { ...headers, token: token } }
      : config;

    return fetch(url, configuration)
      .then(checkStatus)
      .catch(handleError);
  }
}
