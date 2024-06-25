import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { HeroPattern } from "../components/HeroPattern";

export default function NotFound() {
  return (
    <>
      <HeroPattern />
      <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center py-16 text-center">
        <p className="text-secondary-900  text-[0.875rem] font-semibold leading-[1.5rem] dark:text-white">
          404
        </p>
        <h1 className="text-secondary-900 mt-2 text-[1.5rem] font-bold leading-[2rem]  dark:text-white">
          Page not found
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-2 text-[1rem] leading-[1.75rem]">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="text-primary-500 hover:text-primary-500/90 mt-8 flex w-max items-center gap-1.5 font-semibold"
        >
          <p>Back to docs</p>
          <ArrowRightIcon width={16} height={16} className="stroke-2" />
        </Link>
      </div>
    </>
  );
}
