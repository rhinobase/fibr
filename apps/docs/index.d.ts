/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const content: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export const ReactComponent: any;
  export default content;
}
