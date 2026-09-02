import { useState } from "react";
import "./App.css";
import type { ChatResponseBlock } from "./types/chat";
import { ChatResponse } from "./components/ChatResponse";
import { HeroGreeting } from "./components/HeroGreeting";
import { PortfolioChat } from "./components/PortfolioChat";
import { PortfolioBackground } from "./components/PortfolioBackground";

function App() {
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [responseBlocks, setResponseBlocks] = useState<ChatResponseBlock[]>([]);

  return (
    <main className="app">
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
