import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

 function AuthChecker({
  children,
  authentication = true,
}) {

  

  const navigate = useNavigate();

  // getting login status from rtk
  const authStatus = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const loading = useSelector((state)=> state.auth.loading)

  useEffect(() => {

    // Page needs login
    if (authentication === true) {

      // user not logged in
      if (authStatus === false) {
        navigate("/login");
      }

    }

    // Page should be accessible only when logged OUT
    else {

      // user already logged in
      if (authStatus === true) {
        navigate("/");
      }

    }

  }, [authStatus, authentication, navigate]);

  return loading ? <h1>Loading</h1> :  <>{children}</>;
}


export default AuthChecker;