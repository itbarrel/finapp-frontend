import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../configs";

const apiUrl = env.baseURL;

// It is used to define our endpoints and allow to create the API slice
export const ReduxApiClient = createApi({
  // The unique key that defines where the Redux store will store our cache.
  reducerPath: "ReduxApiClient",

  // The base query to request data.
  // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://new.crisishub.co/",
    baseUrl: apiUrl,
  }),

  // The set of operations that we want to perform against the server.
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: () => ({
        url: "v1/departments",
        method: "GET",
      }),
    }),
    getAllDepartmentsList: builder.query({
      query: () => ({
        url: "v1/departments/sdf",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllDepartmentsQuery, useGetAllDepartmentsListQuery } =
  ReduxApiClient;
