// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { UserDetails } from "../Redux/Authentication/action";
// import Loader from "../Layouts/Loader";

// /*
// Dont make any changes to this file
// */
// const PrivateRoute = ({ children }) => {
//   const { isAuth, loading, user } = useSelector(UserDetails);
//   const [isAuthChecked, setIsAuthChecked] = useState(false);
//   const location = useLocation();
//   const Navigate = useNavigate();
//   useEffect(() => {
//     if (loading === false) {
//       setIsAuthChecked(true);
//     }
//   }, [loading]);

//   if (isAuthChecked && isAuth === false) {
//     return Navigate("/login", { state: { from: location } });
//   }

//   if (isAuthChecked) {
//     return <>{children}</>;
//   }
//   return <Loader />;
// };

// export default PrivateRoute;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDetails } from "../Redux/Authentication/action";
import Loader from "../Layouts/Loader";

const PrivateRoute = ({ children }) => {
  const { isAuth, loading } = useSelector(UserDetails);
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
        }, 500); // Delay for 500 milliseconds before redirection
      } else {
        const { state } = location;

        if (state && state.from) {
          redirectTimeout = setTimeout(() => {
            navigate(state.from);
          }, 500); // Delay for 500 milliseconds before redirection
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

export default PrivateRoute;
