import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

export type CodeHighlighter = { content: string; language: string };

export function CodeHighlighter({ content, language }: CodeHighlighter) {
  const [html, setHtml] = useState<string>();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const controller = new AbortController();
    try {
      new Promise((resolve, reject) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const abortListener = ({ target }: any) => {
          controller.signal.removeEventListener("abort", abortListener);
          reject(target.reason);
        };
        controller.signal.addEventListener("abort", abortListener);

        codeToHtml(content, {
          lang: language,
          theme: resolvedTheme === "light" ? "github-light" : "dracula",
        }).then((code) => {
          setHtml(code);
          resolve(code);
        });
      });
    } catch {}

    return () => {
      controller.abort();
    };
  }, [resolvedTheme, language, content]);

  if (!html) return <>Loading...</>;

  // biome-ignore lint/security/noDangerouslySetInnerHtml: Need this to show the highlighting
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
