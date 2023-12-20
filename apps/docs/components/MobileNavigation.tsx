"use client";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
} from "@rafty/ui";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { Navigation } from "../components/Navigation";
import { useDrawerDialog } from "./store";

const IsInsideMobileNavigationContext = createContext(false);

export function MobileNavigationDialog() {
  const { isOpen, setOpen } = useDrawerDialog();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPathname = useRef(pathname).current;
  const initialSearchParams = useRef(searchParams).current;

  useEffect(() => {
    if (pathname !== initialPathname || searchParams !== initialSearchParams) {
      setOpen(false);
    }
  }, [pathname, searchParams, setOpen, initialPathname, initialSearchParams]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setOpen}
      aria-label="Navigation"
      side="left"
    >
      <DrawerOverlay />
      <DrawerContent className="!h-full !w-full !max-w-[70vw] !p-0 !py-6">
        <DrawerClose className="!z-[60]" />
        <Navigation className="h-full px-6 pb-6" />
      </DrawerContent>
    </Drawer>
  );
}

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext);
}

export function MobileNavigation() {
  const { setOpen } = useDrawerDialog();

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <HiMenu size={20} />
      </Button>
    </IsInsideMobileNavigationContext.Provider>
  );
}
