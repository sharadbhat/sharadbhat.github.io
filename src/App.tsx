import { useState } from "react";
import "./App.css";
import type { ChatResponseBlock } from "./types/chat";
import { ChatResponse } from "./components/ChatResponse";
import { HeroGreeting } from "./components/HeroGreeting";
import { PortfolioChat } from "./components/PortfolioChat";
import { PortfolioBackground } from "./components/PortfolioBackground";
import { useViewport } from "./hooks/useViewport";

function App() {
  const viewportRef = useViewport();
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [responseBlocks, setResponseBlocks] = useState<ChatResponseBlock[]>([]);

  return (
    <main ref={viewportRef} className={`app ${hasAskedQuestion ? "app--chat-active" : ""}`}>
      <PortfolioBackground />
      <HeroGreeting isCompact={hasAskedQuestion} />
      <ChatResponse
        blocks={responseBlocks}
        isLoading={isLoadingResponse}
        isVisible={hasAskedQuestion}
      />
      <PortfolioChat
        onQuestionAsked={() => {
          setHasAskedQuestion(true);
          setIsLoadingResponse(true);
          setResponseBlocks([]);
        }}
        onResponse={(blocks) => {
          setResponseBlocks(blocks);
          setIsLoadingResponse(false);
        }}
      />
    </main>
  );
}

export default App;
