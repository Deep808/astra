import { useDispatch, useSelector } from "react-redux";
import {
  setInputValue,
  setLoading,
  setRecentPrompt,
  setResultData,
  setShowResults,
  setPrevPrompts,
} from "../slices/promptSlice";
import run from "../config/gemini";

export const useSubmitPrompt = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.prompt.inputValue);

  const handleSubmit = async (prompt) => {
    dispatch(setResultData(""));
    dispatch(setLoading(true));
    dispatch(setShowResults(true));

    let response;
    if (prompt !== undefined) {
      dispatch(setRecentPrompt(prompt));
      dispatch(setPrevPrompts(prompt));
      response = await run(prompt);
    } else {
      dispatch(setRecentPrompt(inputValue));
      dispatch(setPrevPrompts(inputValue));
      response = await run(inputValue);
    }

    dispatch(setResultData(response));
    dispatch(setLoading(false));
    dispatch(setInputValue(""));
  };

  return { handleSubmit };
};
