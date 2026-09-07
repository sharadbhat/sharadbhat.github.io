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
  "Searching for the perfect quote...",
  "Searching for the most impressive answer...",
  "Begging the AI for a better answer...",
  "Pretending to think deeply...",
  "Over-analyzing your prompt...",
  "Drafting, deleting, and redrafting...",
  "Trying not to hallucinate a fake framework...",
  "Arguing with its own neural nodes...",
  "Second-guessing its first response...",
  "Staring at the prompt in mild panic...",
  "Hoping you don't ask a follow-up question...",
  "Wondering if this answer makes it look smart...",
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
