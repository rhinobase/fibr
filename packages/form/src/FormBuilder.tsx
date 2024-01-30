import { Workspace } from "@fibr/builder";
import { FibrProvider } from "@fibr/react";
import { ContainerPanel } from "./ContainerPanel";
import { Header } from "./panels";
import {
  BlueprintProvider,
  SourceProvider,
  useSourceManagerProps,
} from "./providers";

export function FormBuilder(props: useSourceManagerProps) {
  return (
    <SourceProvider blocks={props.blocks}>
      <FibrProvider plugins={[]}>
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
