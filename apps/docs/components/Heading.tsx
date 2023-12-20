"use client";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { HiLink } from "react-icons/hi2";
import { useSectionStore } from "../components/SectionProvider";
import { Tag } from "../components/Tag";
import { remToPx } from "../lib/remToPx";

function Eyebrow({ tag, label }: { tag?: string; label?: string }) {
  if (!tag && !label) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-3">
      {tag && <Tag>{tag}</Tag>}
      {tag && label && (
        <span className="bg-secondary-300 dark:bg-secondary-600 h-0.5 w-0.5 rounded-full" />
      )}
      {label && (
        <span className="text-secondary-400 font-mono text-xs">{label}</span>
      )}
    </div>
  );
}

function Anchor({
  id,
  inView,
  children,
}: {
  id: string;
  inView: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`#${id}`}
      className="group text-inherit no-underline hover:text-inherit"
    >
      {inView && (
        <div className="absolute ml-[calc(-1*var(--width))] mt-1 hidden w-[var(--width)] opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]">
          <div className="group/anchor bg-secondary-50 ring-secondary-300 hover:ring-secondary-500 dark:bg-secondary-800 dark:ring-secondary-700 dark:hover:bg-secondary-700 dark:hover:ring-secondary-600 flex h-5 w-5 items-center rounded-lg p-1 ring-1 ring-inset transition">
            <HiLink />
          </div>
        </div>
      )}
      {children}
    </Link>
  );
}

export function Heading<Level extends 2 | 3>({
  children,
  tag,
  label,
  level,
  anchor = true,
  ...props
}: React.ComponentPropsWithoutRef<`h${Level}`> & {
  id: string;
  tag?: string;
  label?: string;
  level?: Level;
  anchor?: boolean;
}) {
  level = level ?? (2 as Level);
  const Component = `h${level}` as "h2" | "h3";
  const ref = useRef<HTMLHeadingElement>(null);
  const registerHeading = useSectionStore((s) => s.registerHeading);

  const inView = useInView(ref, {
    margin: `${remToPx(-3.5)}px 0px 0px 0px`,
    amount: "all",
  });

  useEffect(() => {
    if (level === 2) {
      registerHeading({ id: props.id, ref, offsetRem: tag || label ? 8 : 6 });
    }
  });

  return (
    <>
      <Eyebrow tag={tag} label={label} />
      <Component
        ref={ref}
        className={tag || label ? "mt-2 scroll-mt-32" : "scroll-mt-24"}
        {...props}
      >
        {anchor ? (
          <Anchor id={props.id} inView={inView}>
            {children}
          </Anchor>
        ) : (
          children
        )}
      </Component>
    </>
  );
}
