import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const { isAuthenticated, handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleRedirectCallback();
        if (isAuthenticated) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error handling callback: ", error);
      }
    };

    processCallback();
  }, [handleRedirectCallback, isAuthenticated, navigate]);

  return <div>Loading...</div>;
};

export default CallbackPage;
