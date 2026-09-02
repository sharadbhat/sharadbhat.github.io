import type { ChatResponseBlock } from "../../types/chat";
import { ContactFormBlock } from "../ResponseBlocks/ContactFormBlock";
import { ErrorBlock } from "../ResponseBlocks/ErrorBlock";
import { HeadingBlock } from "../ResponseBlocks/HeadingBlock";
import { ListBlock } from "../ResponseBlocks/ListBlock";
import { ParagraphBlock } from "../ResponseBlocks/ParagraphBlock";
import { ProjectBlock } from "../ResponseBlocks/ProjectBlock";
import { TimelineBlock } from "../ResponseBlocks/TimelineBlock";
import "./index.css";

type ResponseRendererProps = {
  blocks: ChatResponseBlock[];
};

export function ResponseRenderer({ blocks }: ResponseRendererProps) {
  return (
    <div className="response-renderer">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "contactForm":
            return <ContactFormBlock key={index} />;
          case "error":
            return <ErrorBlock key={index} />;
          case "heading":
            return <HeadingBlock block={block} key={index} />;
          case "list":
            return <ListBlock block={block} key={index} />;
          case "paragraph":
            return <ParagraphBlock block={block} key={index} />;
          case "project":
            return <ProjectBlock block={block} key={index} />;
          case "timeline":
            return <TimelineBlock block={block} key={index} />;
        }
      })}
    </div>
  );
}
