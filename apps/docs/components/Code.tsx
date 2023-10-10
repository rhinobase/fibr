"use client";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Tab,
  TabContent,
  TabList,
  TabTrigger,
  classNames,
} from "@rafty/ui";
import { create } from "zustand";
import { Tag } from "../components/Tag";
import { HiCheck, HiOutlineDocumentDuplicate } from "react-icons/hi";

const languageNames: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  javascript: "JavaScript",
  typescript: "TypeScript",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  go: "Go",
};

function getPanelTitle({
  title,
  language,
}: {
  title?: string;
  language?: string;
}) {
  if (title) {
    return title;
  }
  if (language && language in languageNames) {
    return languageNames[language];
  }
  return "Code";
}

function CopyButton({ code }: { code: string }) {
  const [copyCount, setCopyCount] = useState(0);
  const copied = copyCount > 0;

  useEffect(() => {
    if (copyCount > 0) {
      const timeout = setTimeout(() => setCopyCount(0), 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  return (
    <div className="invisible absolute right-4 top-3.5 !rounded-full bg-black/20 backdrop-blur transition-all group-hover:visible">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="!text-secondary-100 invisible !rounded-full group-hover:visible"
        onClick={() => {
          window.navigator.clipboard.writeText(code).then(() => {
            setCopyCount((count) => count + 1);
          });
        }}
        leftIcon={
          copied ? (
            <HiCheck className="text-primary-400" size={15} />
          ) : (
            <HiOutlineDocumentDuplicate size={15} />
          )
        }
      >
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

function CodePanelHeader({ tag, label }: { tag?: string; label?: string }) {
  if (!tag && !label) {
    return null;
  }

  return (
    <div className="border-b-white/7.5 bg-white/2.5 dark:bg-white/1 bg-secondary-900 flex h-9 items-center gap-2 border-y border-t-transparent px-4 dark:border-b-white/5">
      {tag && (
        <div className="dark flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && (
        <span className="bg-secondary-500 h-0.5 w-0.5 rounded-full" />
      )}
      {label && (
        <span className="text-secondary-400 font-mono text-xs">{label}</span>
      )}
    </div>
  );
}

function CodePanel({
  children,
  tag,
  label,
  code,
}: {
  children: React.ReactNode;
  tag?: string;
  label?: string;
  code?: string;
}) {
  const child = Children.only(children);

  if (isValidElement(child)) {
    tag = child.props.tag ?? tag;
    label = child.props.label ?? label;
    code = child.props.code ?? code;
  }

  if (!code) {
    throw new Error(
      "`CodePanel` requires a `code` prop, or a child with a `code` prop."
    );
  }

  return (
    <div className="dark:bg-white/2.5 group">
      <CodePanelHeader tag={tag} label={label} />
      <div className="relative">
        <pre className="overflow-x-auto   p-4 text-xs text-white">
          {children}
        </pre>
        <CopyButton code={code} />
      </div>
    </div>
  );
}

function CodeGroupHeader({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const hasTabs = Children.count(children) > 1;

  if (!title && !hasTabs) {
    return null;
  }

  return (
    <div className="border-secondary-700 bg-secondary-800 dark:border-secondary-800 flex border-b px-4 dark:bg-transparent">
      {title && (
        <h3
          className={classNames(
            "dark:text my-auto mr-auto text-xs font-semibold text-white",
            !hasTabs ? "py-3" : "py-0"
          )}
        >
          {title}
        </h3>
      )}
      {hasTabs && (
        <TabList className="!border-none">
          {Children.map(children, (child) => (
            <TabTrigger
              value={getPanelTitle(isValidElement(child) ? child.props : {})}
              className="hover:text-secondary-400 data-[state='active']:!text-primary-400 data-[state='active']:dark:!border-b-primary-500 py-3"
            >
              {isValidElement(child)
                ? getPanelTitle(child.props || {})
                : getPanelTitle({})}
            </TabTrigger>
          ))}
        </TabList>
      )}
    </div>
  );
}

function CodeGroupPanels({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodePanel>) {
  const hasTabs = Children.count(children) > 1;

  if (hasTabs) {
    return (
      <>
        {Children.map(children, (child) => (
          <TabContent
            value={getPanelTitle(isValidElement(child) ? child.props : {})}
          >
            <CodePanel {...props}>{child}</CodePanel>
          </TabContent>
        ))}
      </>
    );
  }

  return <CodePanel {...props}>{children}</CodePanel>;
}

function usePreventLayoutShift() {
  const positionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (typeof rafRef.current !== "undefined") {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    positionRef,
    preventLayoutShift(callback: () => void) {
      if (!positionRef.current) {
        return;
      }

      const initialTop = positionRef.current.getBoundingClientRect().top;

      callback();

      rafRef.current = window.requestAnimationFrame(() => {
        const newTop =
          positionRef.current?.getBoundingClientRect().top ?? initialTop;
        window.scrollBy(0, newTop - initialTop);
      });
    },
  };
}

const usePreferredLanguageStore = create<{
  preferredLanguages: Array<string>;
  addPreferredLanguage: (language: string) => void;
}>()((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
          (preferredLanguage) => preferredLanguage !== language
        ),
        language,
      ],
    })),
}));

function useTabGroupProps(availableLanguages: Array<string>) {
  const { preferredLanguages, addPreferredLanguage } =
    usePreferredLanguageStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeLanguage = [...availableLanguages].sort(
    (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a)
  )[0];
  const languageIndex = availableLanguages.indexOf(activeLanguage);
  const newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex;
  if (newSelectedIndex !== selectedIndex) {
    setSelectedIndex(newSelectedIndex);
  }

  const { positionRef, preventLayoutShift } = usePreventLayoutShift();

  return {
    as: "div" as const,
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex: number) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex])
      );
    },
  };
}

const CodeGroupContext = createContext(false);

export function CodeGroup({
  children,
  title,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeGroupPanels> & { title: string }) {
  const languages =
    Children.map(children, (child) => {
      const title = getPanelTitle(isValidElement(child) ? child.props : {});
      return title;
    }) ?? [];
  const tabGroupProps = useTabGroupProps(languages);
  const hasTabs = Children.count(children) > 1;

  const containerClassName =
    "not-prose my-6 overflow-hidden rounded-2xl bg-secondary-900 shadow-md dark:ring-1 dark:ring-white/10";
  const header = <CodeGroupHeader title={title}>{children}</CodeGroupHeader>;
  const panels = <CodeGroupPanels {...props}>{children}</CodeGroupPanels>;

  return (
    <CodeGroupContext.Provider value={true}>
      {hasTabs ? (
        <Tab
          size="sm"
          defaultValue={languages[tabGroupProps.selectedIndex]}
          className={containerClassName}
        >
          {header}
          {panels}
        </Tab>
      ) : (
        <div className={containerClassName}>
          {header}
          {panels}
        </div>
      )}
    </CodeGroupContext.Provider>
  );
}

export function Code({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  const isGrouped = useContext(CodeGroupContext);

  if (isGrouped) {
    if (typeof children !== "string") {
      throw new Error(
        "`Code` children must be a string when nested inside a `CodeGroup`."
      );
    }
    return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />;
  }

  return <code {...props}>{children}</code>;
}

export function Pre({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeGroup>) {
  const isGrouped = useContext(CodeGroupContext);

  if (isGrouped) {
    return children;
  }

  return <CodeGroup {...props}>{children}</CodeGroup>;
}
