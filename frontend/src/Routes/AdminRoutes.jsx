/*
Dont make any changes to this file
*/
// const AdminRoutes = ({ children }) => {

//   const location = useLocation();
//   const Navigate = useNavigate();

//   useEffect(() => {
//     if (isAuth !== false && user?.role !== "admin") {
//       console.log(isAuth, user?.role);
//       return Navigate("/login", { state: { from: location } });
//     }
//   }, []);

//   return <>{children}</>;
// };

//export default AdminRoutes;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDetails } from "../Redux/Authentication/action";

import Loader from "../Layouts/Loader";

const AdminRoutes = ({ children }) => {
  const { isAuth, loading, user } = useSelector(UserDetails);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      setIsAuthChecked(true);
    }
  }, [loading]);

  useEffect(() => {
    let redirectTimeout;

    if (isAuthChecked) {
      if (!isAuth) {
        redirectTimeout = setTimeout(() => {
          navigate("/login", { state: { from: location.pathname } });
        }, 500);
      } else if (isAuth && user?.role !== "admin") {
        redirectTimeout = setTimeout(() => {
          navigate("/", { state: { from: location.pathname } });
        }, 500);
      } else {
        const { state } = location;

        if (state && state.from) {
          redirectTimeout = setTimeout(() => {
            navigate(state.from);
          }, 500);
        }
      }
    }

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [isAuthChecked, isAuth, navigate, location.pathname]);

  if (isAuthChecked && isAuth) {
    return <>{children}</>;
  }

  return <Loader />;
};

export default AdminRoutes;
