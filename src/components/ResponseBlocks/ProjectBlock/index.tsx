import type { ProjectResponseBlock } from "../../../types/chat";
import "./index.css";

type ProjectBlockProps = {
  block: ProjectResponseBlock;
};

function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

export function ProjectBlock({ block }: ProjectBlockProps) {
  const tags = Array.isArray(block.tags) ? block.tags : [];
  const links = Array.isArray(block.links) ? block.links : [];

  return (
    <article className="project-block">
      <div className="project-block__copy">
        <h3 className="project-block__title">{block.title}</h3>
        <p className="project-block__description">{block.description}</p>
      </div>

      {tags.length > 0 ? (
        <ul className="project-block__tags" aria-label={`${block.title} technologies`}>
          {tags.map((tag) => (
            <li className="project-block__tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {links.length > 0 ? (
        <div className="project-block__links">
          {links.map((link) => (
            <a
              className="project-block__link"
              href={link.href}
              key={`${link.label}-${link.href}`}
              rel={isExternalUrl(link.href) ? "noopener noreferrer" : undefined}
              target={isExternalUrl(link.href) ? "_blank" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
