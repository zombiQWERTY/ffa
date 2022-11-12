import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { BaseAppQuery } from "../../app/storeUtils";
import { LoginResponse, LoginRequestData, LoginErrorResponse } from "./types";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: BaseAppQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequestData>({
      query: (credentials) => ({
        url: "/api/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse, meta, arg) => ({
        ...response,
        email: arg.email,
      }),
      transformErrorResponse: (response: FetchBaseQueryError): string => {
        if (response.status === "FETCH_ERROR") {
          return "Fetch Error. Check your connection";
        }

        return (response.data as LoginErrorResponse)?.error;
      },
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
