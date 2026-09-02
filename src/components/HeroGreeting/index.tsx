import { useEffect, useState } from "react";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconFileTextFilled,
  IconMailFilled,
  type TablerIcon,
} from "@tabler/icons-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import "./index.css";

const profileButtons = [
  {
    label: "Resume",
    Icon: IconFileTextFilled,
    type: "file",
    href: "/SharadBhat_Resume.pdf",
  },
  {
    label: "LinkedIn",
    Icon: IconBrandLinkedinFilled,
    type: "link",
    href: "https://www.linkedin.com/in/sharadmbhat/",
  },
  {
    label: "GitHub",
    Icon: IconBrandGithubFilled,
    type: "link",
    href: "https://github.com/sharadbhat",
  },
  {
    label: "Email",
    Icon: IconMailFilled,
    type: "link",
    href: "mailto:sharad.mbhat@gmail.com",
  },
] satisfies Array<{
  label: string;
  Icon: TablerIcon;
  type: "file" | "link";
  href: string;
}>;

type HeroGreetingProps = {
  isCompact?: boolean;
};

export function HeroGreeting({ isCompact = false }: HeroGreetingProps) {
  const [showCompactTitle, setShowCompactTitle] = useState(isCompact);

  useEffect(() => {
    if (!isCompact) {
      setShowCompactTitle(false);
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setShowCompactTitle(true);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [isCompact]);

  return (
    <section
      className={`hero-greeting ${isCompact ? "hero-greeting--compact" : ""}`}
    >
      <div className="hero-greeting__content">
        <h1 className="hero-greeting__title">
          <LayoutGroup>
            <motion.span className="hero-greeting__title-line" layout>
              <AnimatePresence mode="popLayout" initial={false}>
                {!showCompactTitle ? (
                  <motion.span
                    className="hero-greeting__title-piece"
                    key="intro-prefix"
                    initial={{ opacity: 0, x: -18, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -22, filter: "blur(8px)" }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Hi, I'm
                  </motion.span>
                ) : null}
              </AnimatePresence>
              <motion.span
                className="hero-greeting__title-piece"
                layout
                transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
              >
                Sharad
              </motion.span>
              <AnimatePresence mode="popLayout" initial={false}>
                {showCompactTitle ? (
                  <motion.span
                    className="hero-greeting__title-piece"
                    key="compact-suffix"
                    initial={{ opacity: 0, x: 22, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 18, filter: "blur(8px)" }}
                    transition={{
                      duration: 0.32,
                      delay: 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    Bhat
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </motion.span>
          </LayoutGroup>
        </h1>
        <p className="hero-greeting__subtitle">Software engineer</p>
        <nav className="hero-greeting__links" aria-label="Profile links">
          {profileButtons.map((button) => {
            const Icon = button.Icon;

            if (button.type === "file") {
              return (
                <a
                  className="hero-greeting__link-card"
                  href={button.href}
                  key={button.label}
                  download
                >
                  <span className="hero-greeting__link-icon">
                    <Icon size={22} />
                  </span>
                  <span className="hero-greeting__link-label">
                    {button.label}
                  </span>
                </a>
              );
            }

            return (
              <a
                className="hero-greeting__link-card"
                href={button.href}
                key={button.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hero-greeting__link-icon">
                  <Icon size={22} />
                </span>
                <span className="hero-greeting__link-label">
                  {button.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
