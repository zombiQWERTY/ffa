import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { AuthSlice } from "../store/Auth/Auth.slice";
import { RootState } from "./store";

export const localStorageMiddleware: Middleware<object, object> =
  (store) => (next) => (action: AnyAction) => {
    const result = next(action);

    if (action.type === `${AuthSlice.name}/setAuthData`) {
      const rootState = store.getState() as RootState;
      const { remember, ...authState } = rootState.auth;

      if (remember) {
        localStorage.setItem(
          "applicationState",
          JSON.stringify({ auth: authState })
        );
      }
    } else if (action.type === "auth/logout") {
      localStorage.removeItem("applicationState");
    }

    return result;
  };

export const reHydrateStore = () => {
  const state = localStorage.getItem("applicationState");

  if (state) {
    try {
      return JSON.parse(state);
    } catch (e) {
      console.error("Can't reHydrate store");
      return {};
    }
  }
};
