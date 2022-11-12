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
      } else {
        sessionStorage.setItem(
          "applicationState",
          JSON.stringify({ auth: authState })
        );
      }
    } else if (action.type === "auth/logout") {
      localStorage.removeItem("applicationState");
      sessionStorage.removeItem("applicationState");
    }

    return result;
  };

export const reHydrateStore = () => {
  const state = localStorage.getItem("applicationState");
  const sessionState = sessionStorage.getItem("applicationState");

  if (sessionState || state) {
    const rawState = sessionState || state;

    try {
      return JSON.parse(rawState || "");
    } catch (e) {
      console.error("Can't reHydrate store");
      return {};
    }
  }
};
