type Fn = (...args: unknown[]) => unknown;
export function getValue<
  Provided,
  T = Provided extends Fn ? ReturnType<Provided> : Provided,
>(valueOrFn?: Provided): T | undefined {
  if (valueOrFn == undefined) return undefined;
  return typeof valueOrFn === "function" ? valueOrFn() : valueOrFn;
}
