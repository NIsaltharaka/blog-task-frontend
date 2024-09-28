import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Element, token, ...rest }) => {
  return !token ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PublicRoute;
