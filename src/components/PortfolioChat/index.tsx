import { useRef, useState, type FocusEvent } from "react";
import { chatApiUrl } from "../../config/backend";
import type { ChatApiResponse, ChatResponseBlock } from "../../types/chat";
import "./index.css";

const suggestedQuestions = [
  "What projects have you worked on?",
  "What are you best at?",
  "How can I contact you?",
  "What is your educational background?",
  "What are your hobbies?",
];

const questionRows = [
  suggestedQuestions.slice(0, Math.ceil(suggestedQuestions.length / 2)),
  suggestedQuestions.slice(Math.ceil(suggestedQuestions.length / 2)),
];

const fallbackErrorBlocks: ChatResponseBlock[] = [{ type: "error" }];

type PortfolioChatProps = {
  onQuestionAsked?: () => void;
  onResponse?: (blocks: ChatResponseBlock[]) => void;
};

export function PortfolioChat({ onQuestionAsked, onResponse }: PortfolioChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setIsOpen(message.trim().length > 0);
  };

  const selectQuestion = (question: string) => {
    setMessage(question);
    inputRef.current?.focus();
  };

  const submitQuestion = async () => {
    const question = message.trim();
    if (!question || isSubmitting) return;

    setIsSubmitting(true);
    setMessage("");
    setIsOpen(false);
    onQuestionAsked?.();

    try {
      const response = await fetch(chatApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const data = (await response.json()) as Partial<ChatApiResponse>;
      onResponse?.(Array.isArray(data.blocks) ? data.blocks : fallbackErrorBlocks);
    } catch {
      onResponse?.(fallbackErrorBlocks);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="portfolio-chat" aria-label="Ask about Sharad">
      <div
        className={`portfolio-chat__panel ${isOpen ? "portfolio-chat__panel--open" : ""}`}
        onBlur={handleBlur}
        onFocus={() => setIsOpen(true)}
      >
        <div className="portfolio-chat__suggestions">
          {questionRows.map((questions, index) => (
            <div className="portfolio-chat__suggestion-row" key={index}>
              {questions.map((question) => (
                <button
                  className="portfolio-chat__suggestion"
                  key={question}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectQuestion(question)}
                  type="button"
                >
                  {question}
                </button>
              ))}
            </div>
          ))}
        </div>
        <form
          className="portfolio-chat__form"
          onSubmit={(event) => {
            event.preventDefault();
            void submitQuestion();
          }}
        >
          <textarea
            ref={inputRef}
            className="portfolio-chat__input"
            placeholder="Ask me anything"
            rows={1}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" || event.shiftKey) return;

              event.preventDefault();
              void submitQuestion();
            }}
          />
          <button
            className="portfolio-chat__submit"
            disabled={!message.trim() || isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending" : "Send"}
          </button>
        </form>
      </div>
    </aside>
  );
}
