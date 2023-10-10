import { forwardRef } from "react";
import Link from "next/link";
import { classNames } from "@rafty/ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "../components/Logo";
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from "../components/MobileNavigation";
import { MobileSearch, Search } from "../components/Search";
import { ThemeToggle } from "../components/ThemeToggle";
import { useDrawerDialog } from "./store";
import ButtonClass from "./Button";

function TopLevelNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 text-sm leading-5 transition dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export const Header = forwardRef<
  React.ElementRef<"div">,
  { className?: string }
>(function Header({ className }, ref) {
  const { isOpen: mobileNavIsOpen } = useDrawerDialog();
  const isInsideMobileNavigation = useIsInsideMobileNavigation();

  const { scrollY } = useScroll();
  const bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9]);
  const bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={classNames(
        className,
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80",
        !isInsideMobileNavigation &&
          "backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80",
        isInsideMobileNavigation
          ? "dark:bg-secondary-900 bg-white"
          : "dark:bg-secondary-900/[var(--bg-opacity-dark)] bg-white/[var(--bg-opacity-light)]",
      )}
      style={
        {
          "--bg-opacity-light": bgOpacityLight,
          "--bg-opacity-dark": bgOpacityDark,
        } as React.CSSProperties
      }
    >
      <div
        className={classNames(
          "absolute inset-x-0 top-full h-px transition",
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            "bg-secondary-900/7.5 dark:bg-white/7.5",
        )}
      />
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <TopLevelNavItem href="/">API</TopLevelNavItem>
            <TopLevelNavItem href="#">Documentation</TopLevelNavItem>
            <TopLevelNavItem href="#">Support</TopLevelNavItem>
          </ul>
        </nav>
        <div className="dark:bg-white/15 bg-secondary-900/10 hidden h-5 w-px md:block" />
        <div className="flex gap-4">
          <MobileSearch />
          <ThemeToggle />
        </div>
        <div className="hidden min-[416px]:contents">
          <Link href="#">
            <ButtonClass name="Sign in" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
});
