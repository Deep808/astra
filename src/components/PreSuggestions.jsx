import React from "react";
import { suggestions } from "../utils/suggestionsData";
import { useSubmitPrompt } from "../hooks/useSubmitPrompt";

const PreSuggestions = () => {
  const { handleSubmit } = useSubmitPrompt();

  return (
    <div className="grid grid-cols-2 gap-2 mt-[4em] md:grid-cols-4 md:min-w-[70%]">
      {suggestions.map((data) => (
        <div
          onClick={() => handleSubmit(data.title)}
          key={data.id}
          className="relative group bg-gray-100 hover:bg-gray-200/70 border hover:border-black/50 transition-all duration-200 ease-linear p-4 rounded-xl"
        >
          <p className="my-10 text-sm md:text-base lg:text-[0.8em]">
            {data.title}
          </p>
          <span className="absolute group-hover:bg-black/10 p-2 rounded-full transition-all duration-200 ease-linear bottom-4 right-4">
            {data.icon}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PreSuggestions;
