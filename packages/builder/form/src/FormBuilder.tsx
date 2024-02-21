import { SharedWrapper } from "@fibr/shared";
import { Container } from "./Container";

export function FormBuilder(props: SharedWrapper) {
  return (
    <SharedWrapper {...props}>
      <Container />
    </SharedWrapper>
  );
}
