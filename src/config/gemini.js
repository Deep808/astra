import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import {
  setInputValue,
  setLoading,
  setRecentPrompt,
  setResultData,
  setShowResults,
  setPrevPrompts,
} from "../slices/promptSlice";
import { useDispatch } from "react-redux";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,

    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  //   console.log(result.response.text());
  const response = result.response;
  return response.text();
}

export default run;
