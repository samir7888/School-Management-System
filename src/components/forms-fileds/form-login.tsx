import { useAuth } from "@/context/AuthProvider";
import { BASEURL } from "@/utils/constant";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema } from "@/schemas/authSchema"; // Import Zod schema

const LoginForm = () => {
  const [email, setEmail] = useState<string>("prakashbanjade191@gmail.com");
  const [password, setPassword] = useState<string>("Prakash@122");
  const [rememberMe, setRememberMe] = useState<boolean>(
    localStorage.getItem("rememberMe") === "true"
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { setAccessToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // ✅ Validate using safeParse before API request
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(
        result.error.format().email?._errors[0] ||
          result.error.format().password?._errors[0] ||
          ""
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BASEURL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.data?.access_token) {
        setAccessToken(res.data.access_token);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message?.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => {
                setRememberMe((prev) => {
                  const newRememberMe = !prev;
                  localStorage.setItem("rememberMe", newRememberMe.toString());
                  return newRememberMe;
                });
              }}
              className="form-checkbox text-blue-600"
            />
            <span className="text-gray-700">Remember Me</span>
          </label>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
