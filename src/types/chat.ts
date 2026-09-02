export type ErrorResponseBlock = {
  type: "error";
};

export type ContactFormResponseBlock = {
  type: "contactForm";
};

export type HeadingResponseBlock = {
  type: "heading";
  text: string;
};

export type ParagraphResponseBlock = {
  type: "paragraph";
  text: string;
};

export type ListResponseBlock = {
  type: "list";
  items: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectResponseBlock = {
  type: "project";
  title: string;
  description: string;
  tags?: string[];
  links?: ProjectLink[];
};

export type TimelineItem = {
  date: string;
  title: string;
  description?: string;
};

export type TimelineResponseBlock = {
  type: "timeline";
  items: TimelineItem[];
};

export type ChatResponseBlock =
  | ContactFormResponseBlock
  | ErrorResponseBlock
  | HeadingResponseBlock
  | ListResponseBlock
  | ParagraphResponseBlock
  | ProjectResponseBlock
  | TimelineResponseBlock;

export type ChatApiResponse = {
  blocks: ChatResponseBlock[];
};
