import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import "./WordForm.css";

type MyMutationFnParams = {
  inputValue: string;
};

const WordForm = () => {
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");
  const [_, setMessage] = useState<string>("");

  const mutation = useMutation<void, unknown, MyMutationFnParams>({
    mutationFn: () => {
      return axios.post(import.meta.env.VITE_WORD_CLOUD_API_URL, {
        message: inputValue,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            required={true}
            onChange={handleInputChange}
          />
          <label>MESSAGE</label>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={() => {
            mutation.mutate({ inputValue });
          }}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default WordForm;
