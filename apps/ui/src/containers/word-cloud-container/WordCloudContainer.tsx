import { Triangle } from "react-loader-spinner";
import WordCloud from "../../components/word-cloud/WordCloud";
import useGetWordsQuery from "../../queries/useGetWordsQuery";

import "./WordCloudContainer.css";
import WordForm from "../../components/word-form/WordForm";

type Message = {
  messageId: string;
  messageText: string;
  timestamp: number;
};

const WordCloudContainer = () => {
  const { data, error, isPending } = useGetWordsQuery();

  if (isPending) {
    return (
      <div className="loader">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#FFF"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (error) return "An error has occurred: " + error.message;

  const concatenatedMessages: string = data
    .map((message: Message) => message.messageText)
    .join(" ");

  return (
    <div className="wordcloud-container">
      <WordCloud concatedWords={concatenatedMessages} />
      <WordForm />
    </div>
  );
};

export default WordCloudContainer;
