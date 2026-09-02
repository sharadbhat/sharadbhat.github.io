import type { TimelineResponseBlock } from "../../../types/chat";
import "./index.css";

type TimelineBlockProps = {
  block: TimelineResponseBlock;
};

export function TimelineBlock({ block }: TimelineBlockProps) {
  if (!Array.isArray(block.items) || block.items.length === 0) return null;

  return (
    <ol className="timeline-block">
      {block.items.map((item, index) => (
        <li className="timeline-block__item" key={`${item.date}-${item.title}-${index}`}>
          <time className="timeline-block__date">{item.date}</time>
          <div className="timeline-block__content">
            <h3 className="timeline-block__title">{item.title}</h3>
            {item.description ? (
              <p className="timeline-block__description">{item.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
