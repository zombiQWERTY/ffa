import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "../AppLayout";

interface GuardedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  isPrivate?: boolean;
  isPublic?: boolean;
  children?: React.ReactNode;
}

export const GuardedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
  isPrivate = true,
  isPublic = false,
}: GuardedRouteProps): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <AppLayout isPrivate={isPrivate} isPublic={isPublic}>
      {children || <Outlet />}
    </AppLayout>
  );
};
