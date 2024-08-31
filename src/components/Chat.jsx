import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/astraLogo.svg";
import { marked } from "marked";

const Chat = () => {
  const {
    recentPrompt,

    loading,
    resultData,
  } = useSelector((state) => state.prompt);
  const { currentUser } = useSelector((state) => state.user);

  const MarkdownRenderer = ({ text }) => {
    const htmlContent = marked(text);

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  return (
    <div className="m-4 w-full lg:max-w-[50%] lg:mx-auto mb-[7em] text-[0.8em] flex flex-col space-y-4">
      <div className="flex items-center p-1 space-x-3">
        <img
          className="w-8 h-8 rounded-full aspect-auto"
          src={currentUser?.photoURL}
          alt="profile"
        />
        <div className="text-start bg-gray-200 p-2 rounded-lg w-auto">
          <MarkdownRenderer text={recentPrompt} />
        </div>
      </div>

      <div className={`flex items-start space-x-2`}>
        <img
          className="w-10 h-10 align-top aspect-auto"
          src={logo}
          alt="logo"
        />
        {loading ? (
          <div className="w-full mt-3  opacity-50 space-y-2">
            <div className="w-full rounded-lg h-4 animate-pulse bg-gradient-to-r from-violet-400 via-red-400 to-blue-500"></div>
            <div className="w-[75%] rounded-lg  h-4 animate-pulse bg-gradient-to-r from-violet-400 via-red-400 to-blue-500"></div>
            <div className="w-full rounded-lg  h-4 animate-pulse bg-gradient-to-r from-violet-400 via-red-400 to-blue-500"></div>
            <div className="w-[55%] rounded-lg  h-4 animate-pulse bg-gradient-to-r from-violet-400 via-red-400 to-blue-500"></div>
            <div className="w-[75%] rounded-lg  h-4 animate-pulse bg-gradient-to-r from-violet-400 via-red-400 to-blue-500"></div>
          </div>
        ) : (
          <div className="text-start mt-2.5">
            <MarkdownRenderer text={resultData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
