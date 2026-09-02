import type { HeadingResponseBlock } from "../../../types/chat";
import "./index.css";

type HeadingBlockProps = {
  block: HeadingResponseBlock;
};

export function HeadingBlock({ block }: HeadingBlockProps) {
  return <h2 className="heading-block">{block.text}</h2>;
}
