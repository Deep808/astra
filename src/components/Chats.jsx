import React from "react";
import PreSuggestions from "./PreSuggestions";
import Chat from "./Chat";
import Prompt from "./Prompt";
import { useSelector } from "react-redux";

const Chats = () => {
  const { showResult } = useSelector((state) => state.prompt);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!showResult ? (
        <>
          <div className="my-8 md:max-w-full lg:max-w-[70%] xl:max-w-[50%] flex flex-col justify-between lg:mx-auto">
            <div className="text-start text-[2.3em] font-bold">
              <h1 className="bg-gradient-to-r mt-12 from-violet-400 via-red-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                Hello, {currentUser?.displayName}.
              </h1>
              <p className="text-gray-300 mt-2 leading-tight">
                How can I help you today?
              </p>
            </div>

            <PreSuggestions />
          </div>
        </>
      ) : (
        <div className="flex mt-12 justify-start w-full">
          <Chat />
        </div>
      )}

      <Prompt />
    </>
  );
};

export default Chats;
