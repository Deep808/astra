import React, { useEffect } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, setRecentPrompt } from "../slices/promptSlice";
import { useSubmitPrompt } from "../hooks/useSubmitPrompt";

const Prompt = () => {
  const { inputValue } = useSelector((state) => state.prompt);

  const dispatch = useDispatch();
  const { handleSubmit } = useSubmitPrompt();

  const handleChange = (e) => {
    dispatch(setInputValue(e.target.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitPrompt();
    }
  };

  const submitPrompt = () => {
    if (inputValue.trim() === "") return;
    handleSubmit();
    dispatch(setRecentPrompt(inputValue));
    dispatch(setInputValue(""));
  };

  useEffect(() => {
    document.getElementById("promptInput").focus();
  }, [inputValue]);

  return (
    <>
      <div className="fixed bg-white bottom-0 left-0 w-full pb-8 px-4">
        <div className="bg-gray-200 py-2 flex items-center justify-between px-4 text-sm rounded-full w-full lg:max-w-[50%] lg:mx-auto">
          <input
            id="promptInput"
            className="outline-none bg-transparent flex-grow"
            placeholder="Enter your prompt here...."
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <RiSendPlaneLine onClick={submitPrompt} className="cursor-pointer" />
        </div>
      </div>
      <p className="text-[0.7em] w-full fixed bottom-2 left-1/2 -translate-x-1/2">
        Astra can be inaccurate in some results.
      </p>
    </>
  );
};

export default Prompt;
