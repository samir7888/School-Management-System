import { useAuth } from "../context/AuthProvider";
import Logout from "../components/Logout";
import Login from "../components/Login";

export const Home = () => {
  const { accessToken } = useAuth();
  return <div>{accessToken ? <Logout /> : <Login />}</div>;
};
