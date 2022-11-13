import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { AuthSlice } from "../store/Auth/Auth.slice";
import { AppStorage, RootState } from "./store";

const AUTH_ACTION_TYPE = "setAuthData";
const LOGOUT_ACTION_TYPE = "logout";

export const storageMiddleware: Middleware<object, object> =
  (store) => (next) => (action: AnyAction) => {
    const result = next(action);

    if (action.type === `${AuthSlice.name}/${AUTH_ACTION_TYPE}`) {
      const rootState = store.getState() as RootState;
      const { remember, ...authState } = rootState.auth;

      AppStorage.setItem<Pick<RootState, "auth">>(
        { auth: authState },
        { persistent: remember }
      );
    } else if (action.type === `${AuthSlice.name}/${LOGOUT_ACTION_TYPE}`) {
      AppStorage.removeItem();
    }

    return result;
  };

export const reHydrateStore = () =>
  AppStorage.getItem<Pick<RootState, "auth">>();
