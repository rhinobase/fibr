import { HeroPattern } from "../components/HeroPattern";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function NotFound() {
  return (
    <>
      <HeroPattern />
      <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center py-16 text-center">
        <p className="text-secondary-900 text-sm font-semibold dark:text-white">
          404
        </p>
        <h1 className="text-secondary-900 mt-2 text-2xl font-bold dark:text-white">
          Page not found
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-2 text-base">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="text-primary-500 hover:text-primary-500/90 mt-8 flex w-max items-center gap-1.5 font-semibold"
        >
          <p>Back to docs</p>
          <HiArrowRight />
        </Link>
      </div>
    </>
  );
}
