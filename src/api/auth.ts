import axios from "axios";

interface login {
  email: string;
  password: string;
  remember?: boolean;
}
import { BASEURL } from "../utils/constant";

export async function login({ email, password }: login) {
  try {
    const res = await axios.post(
      `${BASEURL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
