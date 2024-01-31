import { Workspace } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { ContainerPanel } from "./ContainerPanel";
import { Header } from "./panels";
import {
  BlueprintProvider,
  SourceProvider,
  useSourceManagerProps,
} from "./providers";
import { ReactNode } from "react";

export function FormBuilder(props: useSourceManagerProps) {
  const userDefinedComponents: Record<string, () => ReactNode> = {};

  Object.values(props.blocks).map((category) =>
    category.map(({ type, component }) => {
      if (component) userDefinedComponents[type] = component;
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
