// src/components/GoogleSignIn.js
import React from "react";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import logo from "../assets/astraLogo.svg";
import { FaGoogle } from "react-icons/fa6";

const SignIn = () => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="min-h-screen w-full my-auto">
      <div className=" flex flex-col h-screen items-center justify-center">
        <div className="group w-[90%] mx-auto relative">
          <img
            className="w-20 h-20 mx-auto"
            loading="lazy"
            src={logo}
            alt="logo"
          />
          <p className="absolute mx-auto left-1/2 -translate-x-1/2 bottom-20 invisible group-hover:visible transition-all duration-200 ease-linear">
            Namaste from Astra!
          </p>
        </div>
        <div
          onClick={handleSignIn}
          className="flex items-center my-8 bg-black/10 p-4 rounded-lg cursor-pointer hover:bg-black hover:text-white transition-all duration-100 ease-linear"
        >
          <FaGoogle className="mr-2" />
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default SignIn;
