import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "./types";
import { createUser } from "./utils";

const initialState: AuthState = {
  user: null,
  token: null,
  remember: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setRemember(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
    setAuthData: (state, action: PayloadAction<LoginResponse>) => {
      state.user = createUser(action.payload);
      state.token = action.payload.token;
    },
  },
});
