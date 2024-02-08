import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@rafty/ui";
import { HiQuestionMarkCircle } from "react-icons/hi";

export default function HelpMenu() {
  return (
    <Menu size="sm">
      <MenuTrigger variant="outline" size="icon">
        <HiQuestionMarkCircle size={18} />
      </MenuTrigger>
      <MenuContent side="top" align="end" alignOffset={3}>
        <MenuItem>Release Notes</MenuItem>
        <MenuItem>Documentation</MenuItem>
        <MenuItem>Security</MenuItem>
        <MenuItem>Support</MenuItem>
        <a
          href="https://x.com/rhinobaseio?t=MTZd3YxH577j_Lx5gyIQjA&s=33"
          target="_blank"
          rel="noreferrer"
        >
          <MenuItem>@rhinobaseio</MenuItem>
        </a>
        <MenuSeparator />
        <MenuItem>Keyboard Shortcuts</MenuItem>
        <MenuItem>Command Palette</MenuItem>
      </MenuContent>
    </Menu>
  );
}
