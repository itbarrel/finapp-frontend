/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable indent */
import fetch from "unfetch";
import withQuery from "with-query";
import Router from "next/router";

import { CookieService } from "../../services/storage.service";
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

  doRequest(method, path, data, getToken) {
    const token = getToken || CookieService.getToken();

    switch (method) {
      case "get":
      case "GET":
        return this.get(path, data, token);

      case "post":
      case "POST":
        return this.post(path, data, token);

      case "postFormData":
        return this.postFormData(path, data, token);

      case "patch":
      case "PATCH":
        // request;
        return this.patch(path, data, token);

      case "put":
      case "PUT":
        return this.put(path, data, token);

      case "delete":
      case "DELETE":
        return this.delete(path, data, token);

      default:
        return this.get(path, data, token);
    }
  }

  get(path, data, token) {
    const url = withQuery(this.apiUrl + path, data);
    const config = { ...this.config, method: "GET" };
    return this.makeRequest(url, config, token);
  }

  post(path, data, token) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "POST", body: json };
    return this.makeRequest(url, config, token);
  }

  delete(path, data, token) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "DELETE", body: json };
    return this.makeRequest(url, config, token);
  }

  patch(path, data, token) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "PATCH", body: json };
    return this.makeRequest(url, config, token);
  }

  put(path, data, token) {
    const url = this.apiUrl + path;
    const json = JSON.stringify(data);
    const config = { ...this.config, method: "PUT", body: json };
    return this.makeRequest(url, config, token);
  }

  postFormData(path, data, token) {
    const url = this.apiUrl + path;
    const config = { method: "POST", body: data };
    return this.makeRequest(url, config, token);
  }

  makeRequest(url, config, token) {
    const { headers } = config;

    const configuration = token
      ? { ...config, headers: { ...headers, token: token } }
      : config;

    return fetch(url, configuration).then(checkStatus).catch(handleError);
  }
}
