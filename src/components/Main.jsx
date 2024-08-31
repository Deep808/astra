import React from "react";
import Chats from "./Chats";
import Profile from "./Profile";

const Main = () => {
  return (
    <div className="flex-1 text-center w-full mx-auto">
      {/* <Profile /> */}
      <div className="p-4">
        <Chats />
      </div>
    </div>
  );
};

export default Main;
