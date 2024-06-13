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
  const [showSnackbarText, setShowSnackbarText] = useState<string>("");

  const mutation = useMutation<void, unknown, MyMutationFnParams>({
    mutationFn: () => {
      return axios.post(import.meta.env.VITE_WORD_CLOUD_API_URL, {
        message: inputValue,
      });
    },
    onSuccess: () => {
      setShowSnackbarText("The message has been successfully sent.");
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
    onError: () => {
      setShowSnackbarText("Error. The message cannot be sent.");
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
    <>
      {!!showSnackbarText && (
        <div className={`snackbar success ${showSnackbarText ? "show" : ""}`}>
          {showSnackbarText}
        </div>
      )}
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
    </>
  );
};

export default WordForm;
