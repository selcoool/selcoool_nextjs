// src/hooks/useAuthHttp.ts
import axios, { AxiosInstance } from "axios";
import { useEffect, useState } from "react";

// Define types for the request and response data
interface SignInResponse {
  token: string;
  [key: string]: any; // Additional fields in the response can be included
}

export const useAuthHttp = () => {
  const [http, setHttp] = useState<AxiosInstance | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Function to handle sign-in
  const signIn = async (email: string, pass_word: string): Promise<SignInResponse> => {
    try {
      const response = await axios.post<SignInResponse>("https://api.selcoool.com/api/auth/signin", {
        email,
        pass_word,
      });

      const retrievedToken = response.data?.token;
      if (retrievedToken) {
        localStorage.setItem('USER', JSON.stringify({ token: retrievedToken }));
        setToken(retrievedToken); // Set token in state
      }

      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // Initialize token from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('USER');
    const storedToken = userData ? JSON.parse(userData)?.token : '';

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Create Axios instance when the token is set
  useEffect(() => {
    if (token) {
      // Create Axios instance
      const instance = axios.create({
        baseURL: "https://api.selcoool.com/api/booking",
        headers: {
          authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });

      setHttp(instance);
    }
  }, [token]);

  return { http, signIn };
};
