import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit";
import { AuthApi, AuthSlice } from "../store/Auth";
import { CountriesApi } from "../store/Countries";
import { localStorageMiddleware } from "./localStorageMiddleware";

export const rootReducer = combineReducers({
  [AuthSlice.name]: AuthSlice.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [CountriesApi.reducerPath]: CountriesApi.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        localStorageMiddleware,
        AuthApi.middleware,
        CountriesApi.middleware,
      ]),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
