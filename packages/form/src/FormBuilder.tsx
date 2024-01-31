import { Workspace } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { ContainerPanel } from "./ContainerPanel";
import { Header } from "./panels";
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
        <Workspace>
          <BlueprintProvider>
            <Header />
            <ContainerPanel />
          </BlueprintProvider>
        </Workspace>
      </FibrProvider>
    </SourceProvider>
  );
}
