import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [shadow, setShadow] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shadow]);

  return (
    <>
      <Sidebar />
      <div
        className={`bg-white ${shadow && "drop-shadow-md"} w-full fixed p-4`}
      >
        <div className="flex justify-between mx-auto">
          <h1 className="text-[1.3em] mx-auto pl-4">Astra</h1>
          <div className="group">
            <img
              onClick={handleSignOut}
              className="w-8 h-8 rounded-full relative"
              src={currentUser?.photoURL}
              alt="profile"
            />
            <p className="absolute invisible right-4 top-14 bg-black/10 text-sm p-2 rounded-lg group-hover:visible">
              Click to Log out!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
