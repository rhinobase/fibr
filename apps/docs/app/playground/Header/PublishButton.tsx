import { Button } from "@rafty/ui";
import { HiOutlineChevronDown } from "react-icons/hi";

export function PublishButton() {
  return (
    <Button
      colorScheme="primary"
      size="sm"
      rightIcon={<HiOutlineChevronDown size={14} className="stroke-2" />}
    >
      Publish
    </Button>
  );
}
