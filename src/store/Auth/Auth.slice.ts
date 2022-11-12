import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "./types";

const initialState: AuthState = {
  user: null,
  token: null,
  remember: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    setRemember(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
    setAuthData: (state, action: PayloadAction<LoginResponse>) => {
      state.user = { email: action.payload.email };
      state.token = action.payload.token;
    },
  },
});
