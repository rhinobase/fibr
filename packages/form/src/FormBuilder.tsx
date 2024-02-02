import { FibrProvider } from "@fibr/react";
import { Container } from "./panels";
import {
  BlueprintProvider,
  SourceProvider,
  useSourceManagerProps,
} from "./providers";
import type { ReactNode } from "react";
import { plugin } from "@fibr/blocks";

export function FormBuilder(props: useSourceManagerProps) {
  const userDefinedComponents: Record<string, () => ReactNode> = {
    form: plugin.form,
  };

  Object.values(props.blocks).map((category) =>
    category.map(({ type, builder }) => {
      if (builder) userDefinedComponents[type] = builder;
    }),
  );

  return (
    <SourceProvider blocks={props.blocks}>
      <FibrProvider plugins={userDefinedComponents}>
        <BlueprintProvider>
          <Container />
        </BlueprintProvider>
      </FibrProvider>
    </SourceProvider>
  );
}
