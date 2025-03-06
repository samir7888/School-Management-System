import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import useAxiosAuth from "../hooks/useAuth";

const Persist = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosAuth();
  const { accessToken, setAccessToken } = useAuth();
  const rememberme = localStorage.getItem("rememberme");

  useEffect(() => {
    const refreshAuth = async () => {
      if (rememberme === "true") {
        const res = await axiosInstance.post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Send token in header
            },
          }
        );
        setLoading(false);

        setAccessToken(res.data.access_token);
      }
    };

    refreshAuth();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  return children;
};

export default Persist;
