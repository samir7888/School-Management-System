import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import useAxiosAuth from "../hooks/useAuth";

const Persist = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosAuth();
  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");

    const refreshAuth = async () => {
   

      setLoading(true);
      try {
        const res = await axiosInstance.post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAccessToken(res.data.access_token);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Only trigger refresh if rememberMe is true and accessToken is invalid
    if (rememberMe === "true" && !accessToken) {
      refreshAuth();
    }
  }, []); // Add dependencies to avoid unnecessary refresh calls

  if (loading) {
    return <div>loading.....</div>;
  }
  return children;
};

export default Persist;
