// SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, password: password }),
      });
      if (response.ok) {
        const user = await response.json();
        navigate(`/Dashboard/${user._id}`, { state: { userId: user._id } });
      } else {
        const errorMsg = await response.json();
        setError(errorMsg.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-xl bg-lime-200 border border-black border-solid max-w-[480px]">
      <div className="flex flex-col px-3 pt-9 pb-20 mt-40 w-full bg-white">
        <div className="self-center text-5xl italic font-black text-black">
          Sign In
        </div>
        <div className="flex gap-5 self-center mt-28">
          <label className="italic font-bold text-black">Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="flex-auto italic text-zinc-600 border border-black border-solid rounded px-2"
          />
        </div>
        <div className="shrink-0 h-0.5 bg-black border border-black border-solid" />
        <div className="flex gap-5 mt-11">
          <label className="italic font-bold text-black">Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="flex-auto italic text-zinc-600 border border-black border-solid rounded px-2"
          />
        </div>
        <div className="shrink-0 mt-1 h-0.5 bg-black border border-black border-solid" />
        <button
          className="justify-center items-center self-center p-2.5 mt-16 mb-5 max-w-full italic font-bold bg-violet-300 rounded-xl border border-black border-solid text-neutral-900 w-[207px]"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default SignIn;

