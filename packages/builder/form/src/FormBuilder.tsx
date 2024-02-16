import { type CanvasType } from "@fibr/providers";
import { SharedWrapper } from "@fibr/shared";
import { Container } from "./Container";

export function FormBuilder<T extends CanvasType>(props: SharedWrapper<T>) {
  return (
    <SharedWrapper {...props}>
      <Container />
    </SharedWrapper>
  );
}
