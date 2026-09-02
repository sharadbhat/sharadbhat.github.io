import { useMemo } from "react";
import { TextType } from "../TextType";
import "./index.css";

const loadingPhrases = [
  "Reading between the commits...",
  "Checking for deploy scars...",
  "Searching for tasteful bragging rights...",
  "Negotiating with the context window...",
  "Finding the least boring answer...",
  "Polishing the humblebrag...",
];

function shufflePhrases(phrases: string[]) {
  const shuffled = [...phrases];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function LoadingResponse() {
  const phrases = useMemo(() => shufflePhrases(loadingPhrases), []);

  return (
    <div className="loading-response" aria-live="polite">
      <TextType
        as="p"
        className="loading-response__text"
        cursorCharacter="▎"
        deletingSpeed={25}
        pauseDuration={1000}
        text={phrases}
        typingSpeed={40}
      />
    </div>
  );
}
