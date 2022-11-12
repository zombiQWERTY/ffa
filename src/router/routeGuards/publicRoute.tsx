import { Navigate, Outlet } from "react-router-dom";
import { PublicLayout } from "../../layouts/publicLayout";
import { ProtectedRouteProps } from "./types";

export const PublicRoute = ({
  isAllowed,
  redirectPath = "/",
  children,
}: ProtectedRouteProps): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <PublicLayout>{children || <Outlet />}</PublicLayout>;
};
