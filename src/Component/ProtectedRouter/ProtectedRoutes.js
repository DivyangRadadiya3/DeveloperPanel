import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const loginInfo = useSelector((state) => state.authConfig);

  const navigate = useNavigate();
  useEffect(() => {
    if (loginInfo.isLoggedIn !== true) {
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoutes;
