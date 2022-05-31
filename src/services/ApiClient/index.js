import ApiClient from "./client";
import env from "../../configs/";

const apiUrl = env.baseURL;

// const apiUrl = process.env.NEXT_PUBLIC_HOST_URL;

const apiClient = new ApiClient(apiUrl);

export default apiClient;
