export type Empty = { title: string; description: string };

export function Empty({ title, description }: Empty) {
  return (
    <div className="text-secondary-500 flex w-full select-none flex-col items-center justify-center gap-1 p-3 text-center font-medium">
      <p className="text-lg">{title}</p>
      <p className="text-sm leading-tight">{description}</p>
    </div>
  );
}
