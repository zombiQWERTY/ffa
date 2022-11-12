import { Navigate, Outlet } from "react-router-dom";
import { PrivateLayout } from "../../layouts/privateLayout";
import { ProtectedRouteProps } from "./types";

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}: ProtectedRouteProps): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <PrivateLayout>{children || <Outlet />}</PrivateLayout>;
};
