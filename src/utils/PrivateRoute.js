import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

//... => rest parameters

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route {...rest}>
      {localStorage.getItem('user') ?
        <Component />
      :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  );
};

export default PrivateRoute;