import useAxiosAuth from "../hooks/useAuth";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const axiosInstance = useAxiosAuth();
  const { accessToken, setAccessToken } = useAuth(); // Get accessToken from context
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);
  async function handleLogout() {
    try {
      await axiosInstance.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send token in header
          },
        }
      );

      setAccessToken(null);
      navigate("/login");
      // Clear auth state after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
