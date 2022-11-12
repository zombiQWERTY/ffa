import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { RootState } from "./store";

const API_URL = process.env.REACT_APP_API_URL;

export const prepareHeaders: FetchBaseQueryArgs["prepareHeaders"] = (
  headers,
  { getState }
) => {
  const token = (getState() as RootState).auth.token;

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};

export const BaseAppQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders,
});
