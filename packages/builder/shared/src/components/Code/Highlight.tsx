import { classNames } from "@rafty/ui";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import { useId } from "react";

export type CodeHighlighter = { content: string; language: string };

export function CodeHighlighter({ content, language }: CodeHighlighter) {
  const id = useId();
  const { resolvedTheme } = useTheme();

  const highlightTheme =
    resolvedTheme === "light" ? themes.github : themes.dracula;

  return (
    <Highlight theme={highlightTheme} code={content} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={classNames(
            "h-full overflow-x-auto overflow-y-auto px-3",
            className,
          )}
        >
          {tokens.map((line, i) => (
            <div key={`${i}-${id}`} {...getLineProps({ line })}>
              <span className="mr-4">{i + 1}</span>
              {line.map((token, key) => (
                <span key={`${key}-${i}-${id}`} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
