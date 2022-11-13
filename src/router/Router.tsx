import { Navigate, Route, Routes } from "react-router-dom";
import { Details } from "../pages/Details";
import { Home } from "../pages/Home";
import { Auth } from "../pages/Auth";
import { useAppSelector } from "../app/hooks";
import { GuardedRoute } from "./GuardedRoute";
import { isUserAuthenticated } from "../store/Auth/utils";

export const Router = () => {
  const { user, token } = useAppSelector(({ auth }) => auth);
  const isAuthenticated = isUserAuthenticated(user, token);

  return (
    <Routes>
      <Route
        index
        element={
          <GuardedRoute isAllowed={isAuthenticated}>
            <Home />
          </GuardedRoute>
        }
      />
      <Route
        path="/details/:alphaCode"
        element={
          <GuardedRoute isAllowed={isAuthenticated}>
            <Details />
          </GuardedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuardedRoute isAllowed={!isAuthenticated} redirectPath="/" isPublic>
            <Auth isLogin />
          </GuardedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
