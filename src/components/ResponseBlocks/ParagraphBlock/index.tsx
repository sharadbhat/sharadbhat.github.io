import type { ParagraphResponseBlock } from "../../../types/chat";
import "./index.css";

type ParagraphBlockProps = {
  block: ParagraphResponseBlock;
};

export function ParagraphBlock({ block }: ParagraphBlockProps) {
  return <p className="paragraph-block">{block.text}</p>;
}
