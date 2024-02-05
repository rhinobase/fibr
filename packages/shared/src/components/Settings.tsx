import { Settings as BuilderSettings } from "@fibr/builder";
import { Thread, type ThreadWithIdType } from "@fibr/react";

export function Settings(props: ThreadWithIdType) {
  if (props.id)
    return (
      <BuilderSettings className="flex flex-col gap-3">
        <h4 className="font-medium">Settings</h4>
        <hr className="my-3" />
        <Thread {...props} />
      </BuilderSettings>
    );
}
