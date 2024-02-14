import { createThread } from "@fibr/react";

export type Page = { id: string };

export function Page() {
  return (
    <div className="bg-secondary-50 h-[1080px] w-[1920px] border">
      Page Canvas
    </div>
  );
}

export const page = createThread<Page>("page");
