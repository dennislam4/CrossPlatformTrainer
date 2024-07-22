// SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email_address: email, password }),
      });
      if (response.ok) {
        console.log("User created successfully");
        navigate("/dashboard");
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
      <div className="flex flex-col px-3 pt-9 pb-20 mt-32 w-full bg-white">
        <div className="self-center text-5xl italic font-black text-black">
          Sign Up
        </div>
        <div className="flex gap-4 self-start mt-11 ml-3">
          <label className="italic font-bold text-black">Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="flex-auto italic text-zinc-600 border border-black border-solid rounded px-2"
          />
        </div>
        <div className="shrink-0 h-0.5 bg-black border border-black border-solid" />
        <div className="flex gap-5 self-center mt-10">
          <label className="italic font-bold text-black">Email:</label>
          <input
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
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="flex-auto italic text-zinc-600 border border-black border-solid rounded px-2"
          />
        </div>
        <div className="shrink-0 mt-1 h-0.5 bg-black border border-black border-solid" />
        <button
          onClick={handleSignUp}
          className="justify-center self-center p-2.5 mt-16 mb-5 italic font-bold bg-violet-300 rounded-xl border border-black border-solid text-neutral-900"
        >
          Sign Up
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default SignUp;
