import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Callback = () => {
  const { isAuthenticated } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  return <div>Loading...</div>;
};

export default Callback;
