/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable indent */
import fetch from "unfetch";
import withQuery from "with-query";
import Router from "next/router";

import { CookieService } from "../storage.service";
import { logout } from "../Auth";

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
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
    Router.push("/secure/dashboard/main");
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

  doRequest(method, path, data, getToken) {
    const token = getToken
    const dynamicFormToken = CookieService.getDynamicToken();

    switch (method) {
      case "get":
      case "GET":
        return this.get(path, data, token, dynamicFormToken);

      case "post":
      case "POST":
        return this.post(path, data, token, dynamicFormToken);

      case "postFormData":
        return this.postFormData(path, data, token, dynamicFormToken);

      case "patch":
      case "PATCH":
        // request;
        return this.patch(path, data, token, dynamicFormToken);

      case "put":
      case "PUT":
        return this.put(path, data, token, dynamicFormToken);

      case "delete":
      case "DELETE":
        return this.delete(path, data, token, dynamicFormToken);

      default:
        return this.get(path, data, token, dynamicFormToken);
    }
  }

  get(path, data, token, dynamicFormToken) {
    const url = withQuery(this.apiUrl + path, data);
    const config = { ...this.config, method: "GET" };
    return this.makeRequest(url, config, token, dynamicFormToken);
  }

  post(path, data, token, dynamicFormToken) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "POST", body: json };
    return this.makeRequest(url, config, token, dynamicFormToken);
  }

  delete(path, data, token, dynamicFormToken) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "DELETE", body: json };
    return this.makeRequest(url, config, token, dynamicFormToken);
  }

  patch(path, data, token, dynamicFormToken) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "PATCH", body: json };
    return this.makeRequest(url, config, token, dynamicFormToken);
  }

  put(path, data, token, dynamicFormToken) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "PUT", body: json };
    return this.makeRequest(url, config, token, dynamicFormToken);
  }

  postFormData(path, data, token, dynamicFormToken) {
    const url = this.apiUrl + path;
    const config = { method: "POST", body: data };
    return this.makeRequest(url, config, token, dynamicFormToken);
  }

  makeRequest(url, config, token, dynamicFormToken) {
    const { headers } = config;

    const configuration = token
      ? { ...config, headers: { ...headers, token: token, authorization: dynamicFormToken } }
      : config;

    return fetch(url, configuration).then(checkStatus).catch(handleError);
  }
}
