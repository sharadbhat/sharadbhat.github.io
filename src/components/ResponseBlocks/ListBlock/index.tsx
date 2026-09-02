import type { ListResponseBlock } from "../../../types/chat";
import "./index.css";

type ListBlockProps = {
  block: ListResponseBlock;
};

export function ListBlock({ block }: ListBlockProps) {
  if (!Array.isArray(block.items) || block.items.length === 0) return null;

  return (
    <ul className="list-block">
      {block.items.map((item, index) => (
        <li className="list-block__item" key={`${item}-${index}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}
