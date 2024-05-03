import { useTheme } from "next-themes";
import { useShiki } from "../../providers";

export type CodeHighlighter = { content: string; language: string };

export function CodeHighlighter({ content, language }: CodeHighlighter) {
  const highlighter = useShiki();
  const { resolvedTheme } = useTheme();

  if (!highlighter) return <>Loading...</>;

  const html = highlighter.codeToHtml(content, {
    lang: language,
    theme:
      resolvedTheme === "light"
        ? "github-light-default"
        : "github-dark-default",
  });

  // biome-ignore lint/security/noDangerouslySetInnerHtml: Need this to show the highlighting
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
