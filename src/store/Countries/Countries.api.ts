import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country } from "./types";

const API_URL = process.env.REACT_APP_COUNTRIES_API_URL;

export const CountriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCountryList: builder.query<Country[], void>({
      query: () => `/all`,
    }),
    getCountryByCode: builder.query<Country, string>({
      query: (code) => `/alpha/${code}`,
      transformResponse: (response: Country[]) => response[0],
    }),
  }),
});

export const { useGetCountryByCodeQuery, useGetCountryListQuery } =
  CountriesApi;
