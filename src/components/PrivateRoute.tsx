import React from 'react';
import { Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath = '/login',
  children,
}) => {

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
