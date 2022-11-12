import { Navigate, Route, Routes } from "react-router-dom";
import { Details } from "../pages/Details/Details";
import { Home } from "../pages/Home/Home";
import { Auth, Login } from "../pages/Auth";
import { useAppSelector } from "../app/hooks";
import { ProtectedRoute } from "./routeGuards/protectedRoute";
import { PublicRoute } from "./routeGuards/publicRoute";

export const Router = () => {
  const user = useAppSelector(({ auth }) => auth.user);
  const isAuthenticated = Boolean(user);

  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/details/:alphaCode"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <Details />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute isAllowed={!isAuthenticated}>
            <Auth>
              <Login />
            </Auth>
          </PublicRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
