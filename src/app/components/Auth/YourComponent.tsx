import React, { useEffect } from "react";
import { useAuthHttp } from "../Auth/useAuthHttp"; // Import the hook using the correct path

const YourComponent: React.FC = () => {
  const { http, signIn } = useAuthHttp();

  const handleLogin = async () => {
    try {
      const data = await signIn('trmthanhpro@gmail.com', '159753');
      console.log("Logged in successfully:", data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    if (http) {
      // Example of using the Axios instance for authenticated requests
      http.get('/your-endpoint')
        .then(({ data }) => console.log(data))
        .catch(console.error);
    }
  }, [http]);

  return (
    <div>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default YourComponent;