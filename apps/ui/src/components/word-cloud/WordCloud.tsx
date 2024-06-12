import { useState } from "react";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { wordFreq } from "../../utils/wordFreq";
import { getRotationDegree } from "../../utils/getRotationDegree";
import useViewportSize from "../../hooks/useViewportSize";
import { generateColor } from "../../utils/generaterColor";
import { Text } from "@visx/text";

import "./WordCloud.css";

export type WordData = {
  text: string;
  value: number;
};

type WordCloudProps = {
  concatedWords: string;
};

type SpiralType = "archimedean" | "rectangular";

const WordCloud = ({ concatedWords }: WordCloudProps) => {
  const [spiralType] = useState<SpiralType>("rectangular");
  const [withRotation] = useState(false);

  const words = wordFreq(concatedWords);

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });

  const viewportSize = useViewportSize();
  const { width, height } = viewportSize;

  return (
    <Wordcloud
      words={words}
      width={width}
      height={height}
      fontSize={(datum: WordData) => fontScale(datum.value)}
      font="Impact"
      padding={2}
      spiral={spiralType}
      rotate={withRotation ? getRotationDegree : 0}
      random={() => 0.5}
    >
      {(cloudWords) => {
        return cloudWords.map((w) => (
          <Text
            key={w.text}
            fill={generateColor(w.text)}
            textAnchor={"middle"}
            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
            fontSize={w.size}
            fontFamily={w.font}
          >
            {w.text}
          </Text>
        ));
      }}
    </Wordcloud>
  );
};

export default WordCloud;
