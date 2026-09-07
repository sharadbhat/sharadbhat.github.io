import { useRef, useState, type FocusEvent } from "react";
import { IconArrowUp, IconLoader2 } from "@tabler/icons-react";
import { chatApiUrl } from "../../config/backend";
import type { ChatApiResponse, ChatResponseBlock } from "../../types/chat";
import "./index.css";

const suggestedQuestions = [
  "What have you built?",
  "Your strongest skills?",
  "What projects have you done at Adobe?",
  "Any open-source projects?",
  "What are you building with AI?",
  "How can I reach you?",
  "Where did you study?",
];

const questionRows = [
  suggestedQuestions.slice(0, Math.floor(suggestedQuestions.length / 2)),
  suggestedQuestions.slice(Math.floor(suggestedQuestions.length / 2)),
];

const fallbackErrorBlocks: ChatResponseBlock[] = [{ type: "error" }];

type PortfolioChatProps = {
  onQuestionAsked?: () => void;
  onResponse?: (blocks: ChatResponseBlock[]) => void;
};

export function PortfolioChat({
  onQuestionAsked,
  onResponse,
}: PortfolioChatProps) {
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
    inputRef.current?.blur();
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
      onResponse?.(
        Array.isArray(data.blocks) ? data.blocks : fallbackErrorBlocks,
      );
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
        <div
          className="portfolio-chat__suggestions"
          inert={!isOpen}
          aria-hidden={!isOpen}
        >
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
            placeholder="Ask me something..."
            aria-label="Ask a question about Sharad"
            rows={1}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              if (
                event.key !== "Enter" ||
                event.shiftKey ||
                event.nativeEvent.isComposing
              )
                return;

              event.preventDefault();
              void submitQuestion();
            }}
          />
          <button
            className="portfolio-chat__submit"
            disabled={!message.trim() || isSubmitting}
            type="submit"
            aria-label={isSubmitting ? "Sending question" : "Send question"}
            title={isSubmitting ? "Sending question" : "Send question"}
          >
            {isSubmitting ? (
              <IconLoader2
                className="portfolio-chat__spinner"
                size={20}
                aria-hidden="true"
              />
            ) : (
              <IconArrowUp size={20} stroke={2.2} aria-hidden="true" />
            )}
          </button>
        </form>
      </div>
    </aside>
  );
}
