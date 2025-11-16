// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useEffect } from "react";

function ProtectedRoute({ children }) {
  //to protect the app from users not authenticated
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  //let the componet know if the user is authenticated or not
  //the effect is execute after the component has been rendered
  // useEffect(
  //   function () {
  //     if (!isAuthenticated) navigate("/");
  //   },
  //   [isAuthenticated, navigate]
  // );
  //if the user is authenticated return the children. else, return null
  return children;
}

export default ProtectedRoute;
