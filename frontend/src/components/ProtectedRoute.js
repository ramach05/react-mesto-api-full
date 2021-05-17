import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { IsLoggedInContext } from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const isLoggedInContext = useContext(IsLoggedInContext);

  return (
    <Route>
      {() =>
        isLoggedInContext ? <Component {...props} /> : <Redirect to="/signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;
