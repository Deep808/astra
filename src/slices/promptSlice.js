import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
  recentPrompt: "",
  prevPrompts: [],
  showResult: false,
  loading: false,
  resultData: "",
};

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },

    setRecentPrompt: (state, action) => {
      state.recentPrompt = action.payload;
    },

    setPrevPrompts: (state, action) => {
      if (!state.prevPrompts.includes(action.payload)) {
        state.prevPrompts = [action.payload, ...state.prevPrompts];
      }
    },

    setShowResults: (state, action) => {
      state.showResult = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },

    clearUserData: (state) => {
      // state.inputValue = "";
      state.recentPrompt = "";
      state.prevPrompts = [];
      state.resultData = "";
      state.showResult = false;
      state.loading = false;
    },
  },
});

export const {
  setInputValue,
  setRecentPrompt,
  setPrevPrompts,
  setShowResults,
  setLoading,
  setResultData,
  clearUserData,
} = promptSlice.actions;

export default promptSlice.reducer;
