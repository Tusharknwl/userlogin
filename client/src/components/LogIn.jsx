import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { login } from "../api/api";
import "../index.css";

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="flex w-full md:w-[60%] items-center border rounded-[1rem] bg-white px-5 shadow-md-dark">
    <Icon className="text-black mx-3" />
    <input
      type={type}
      className="w-full px-3 py-2 border-none outline-none rounded-[1rem]"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ email, password });
      if (result.success) {
        setSuccess("Login successful");
        setError("");
        setEmail("");
        setPassword("");
      } else {
        setSuccess("");
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setSuccess("");
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#27291e2d] px-5 py-20 rounded-[70px] w-full md:w-3/6 xl:w-2/6 m-3 shadow-xl">
        <h2 className="flex text-[48px] drop-shadow-lg mb-8 justify-center inter-extrabold">
          Login
        </h2>
        {error && (
          <p className="flex justify-center text-red-500 font-semibold drop-shadow-lg mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="flex justify-center text-[#00e71f] font-semibold drop-shadow-lg mb-4">
            {success}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-8 asap-semibold font-[24px]"
        >
          <InputField
            icon={FaEnvelope}
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={FaLock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="flex mt-5 px-10 py-1 bg-[#0078D4] text-white asap-semibold text-[32px] rounded-[20px] hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center asap-semibold text-[20px]">
          Don't have an account?{" "}
          <a href="/" className="text-[#E91010] underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
