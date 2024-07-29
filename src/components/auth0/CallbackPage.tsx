import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { isAuthenticated, handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleRedirectCallback();
        if (isAuthenticated) {
          navigate("/"); // Redirige a la página principal o a la deseada
        }
      } catch (error) {
        console.error("Error handling callback: ", error);
      }
    };

    if (!isAuthenticated) {
      processCallback();
    }
  }, [handleRedirectCallback, isAuthenticated, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
