import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineChat } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setRecentPrompt, setShowResults } from "../slices/promptSlice";
import { useSubmitPrompt } from "../hooks/useSubmitPrompt";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  const { prevPrompts } = useSelector((state) => state.prompt);
  const { handleSubmit } = useSubmitPrompt();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const loadPrompt = async (prompt) => {
    dispatch(setRecentPrompt(prompt));
    handleSubmit(prompt);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1150) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const newChat = () => {
    dispatch(setShowResults(false));
    if (window.innerWidth > 1150) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <HiMenuAlt2
        onClick={toggleSidebar}
        className="fixed left-5 top-5 z-[50] cursor-pointer w-6 h-6"
      />
      <div
        className={`fixed z-40 drop-shadow-lg h-screen flex flex-col p-6 text-[0.8em] ${
          isOpen && "bg-gray-100 w-56"
        } transition-all duration-200 ease-linear ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isOpen && (
          <div className="mt-[4em]">
            <div>
              <div
                onClick={newChat}
                className="flex w-fit font-semibold items-center space-x-2 bg-gray-200 py-2 px-3 my-4 rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-150 ease-linear"
              >
                <FaPlus />
                <p>New Chat</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="font-bold mb-4">Recent Prompts</p>
              {prevPrompts.length > 0 ? (
                prevPrompts?.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => loadPrompt(p)}
                    className="flex cursor-pointer items-center px-3 py-2 my-2 hover:bg-gray-200 rounded-full space-x-2"
                  >
                    <MdOutlineChat />
                    <p className="truncate w-32">{p}</p>
                  </div>
                ))
              ) : (
                <div className="text-black/50">No Recent Prompts!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
