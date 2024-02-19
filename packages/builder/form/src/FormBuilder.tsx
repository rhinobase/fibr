import { type BaseBlockType } from "@fibr/providers";
import { SharedWrapper } from "@fibr/shared";
import { Container } from "./Container";

export function FormBuilder<T extends BaseBlockType>(props: SharedWrapper<T>) {
  return (
    <SharedWrapper {...props}>
      <Container />
    </SharedWrapper>
  );
}
