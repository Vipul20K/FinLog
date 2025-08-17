import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const useAuth = (setError) => {
  const [user, setUser] = useState(null);

  const signupUser = async (formData) => {
    try {
      const res = await axiosInstance.post("/signup", formData);
      const { token, user: userData } = res.data;
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const loginUser = async (formData) => {
    try {
      const res = await axiosInstance.post("/signin", formData);
      const { token, user: userData } = res.data;
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

    const logoutUser = () => {
    // Remove both token and user from localStorage
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    // Restore auth state from localStorage when the app loads
    const token = localStorage.getItem("jwt_token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  return { user, setUser, signupUser, loginUser, logoutUser };
};
