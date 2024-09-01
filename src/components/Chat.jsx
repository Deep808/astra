import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/astraLogo.svg";
import { marked } from "marked";
import { useSubmitPrompt } from "../hooks/useSubmitPrompt";
import { MdOutlineModeEdit, MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Chat = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState("");

  const { recentPrompt, loading, resultData } = useSelector(
    (state) => state.prompt
  );
  const { currentUser } = useSelector((state) => state.user);
  const { handleSubmit } = useSubmitPrompt();

  const MarkdownRenderer = ({ text }) => {
    const htmlContent = marked(text);
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedPrompt(recentPrompt);

    setTimeout(() => {
      const inputField = document.querySelector(".inputBar");
      if (inputField) {
        inputField.focus();
      }
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveClick();
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleSubmit(editedPrompt);
  };

  return (
    <div className="m-4 w-full lg:max-w-[50%] lg:mx-auto mb-[7em] text-[0.8em] flex flex-col space-y-4">
      <div className="flex items-center p-1 space-x-3">
        <img
          loading="lazy"
          className="w-8 h-8 rounded-full aspect-auto"
          src={currentUser?.photoURL}
          alt="profile"
        />
        <div className="text-start bg-gray-200 p-2 rounded-lg w-auto flex items-center">
          {isEditing ? (
            <input
              className="inputBar bg-gray-200 p-1 rounded-md outline-none"
              type="text"
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <MarkdownRenderer text={recentPrompt} />
          )}
          <button className="ml-2">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <MdDone
                  onClick={handleSaveClick}
                  className="w-6 h-6 hover:bg-black/10 rounded-full p-1"
                />
                <IoMdClose
                  onClick={() => setIsEditing(false)}
                  className="w-6 h-6 hover:bg-black/10 rounded-full p-1"
                />
              </div>
            ) : (
              <MdOutlineModeEdit
                onClick={handleEditClick}
                className="w-6 h-6 hover:bg-black/10 rounded-full p-1"
              />
            )}
          </button>
        </div>
      </div>

      <div className={`flex items-start space-x-2`}>
        <img
          loading="lazy"
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
          <div className="text-start lg:max-w-[80%] mt-2.5">
            <MarkdownRenderer text={resultData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
