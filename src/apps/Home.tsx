
import { useAuth } from "../context/AuthProvider";
import Logout from "../components/logout";
import Login from "../components/login";

export const Home = () => {
  const { accessToken } = useAuth();
  return (
    <div>
      {accessToken ? (
        <Logout/>
      ) : (
        <Login/>
      )}
    </div>
  );
};
