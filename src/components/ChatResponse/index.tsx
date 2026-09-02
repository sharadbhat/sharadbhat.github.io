import type { ChatResponseBlock } from "../../types/chat";
import { LoadingResponse } from "../LoadingResponse";
import { ResponseRenderer } from "../ResponseRenderer";
import "./index.css";

type ChatResponseProps = {
  blocks?: ChatResponseBlock[];
  isLoading?: boolean;
  isVisible?: boolean;
};

export function ChatResponse({
  blocks = [],
  isLoading = false,
  isVisible = false,
}: ChatResponseProps) {
  if (!isVisible) return null;

  return (
    <section className="chat-response" aria-label="Response">
      <div className="chat-response__inner">
        <div
          className={`chat-response__content ${
            isLoading ? "chat-response__content--loading" : ""
          }`.trim()}
        >
          {isLoading ? <LoadingResponse /> : null}
          {!isLoading && blocks.length > 0 ? <ResponseRenderer blocks={blocks} /> : null}
        </div>
      </div>
    </section>
  );
}
