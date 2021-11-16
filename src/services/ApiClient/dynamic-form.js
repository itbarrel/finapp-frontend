import ApiClient from "./dynamic-form-client";
import env from "../../configs";

const apiUrl = env.dynamicFormBaseURL;

const apiClient = new ApiClient(apiUrl);

export default apiClient;
