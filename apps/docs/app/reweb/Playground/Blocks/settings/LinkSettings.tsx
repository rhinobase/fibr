import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { CommanSettings } from "./CommanSettings";

export function LinkSettings() {
  const { register } = useFormContext();

  return (
    <>
      <CommanSettings />
      <InputField {...register("data.link")} />
    </>
  );
}
