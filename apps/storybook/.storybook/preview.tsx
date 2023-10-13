import "../styles.css";
import React from "react";
import type { Preview } from "@storybook/react";
import { FibrProvider } from "@fibr/react";
import raftyPlugin from "@fibr/rafty";

const DEFAULT_THEME = "light";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    toolbar: {
      icon: "paintbrush",
      // Array of plain string values or MenuItem shape
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      React.useEffect(() => {
        const htmlTag = document.documentElement;

        const tmp = theme || DEFAULT_THEME;
        if (tmp === "dark") htmlTag.classList.add("dark");
        else htmlTag.classList.remove("dark");
      }, [theme]);

      return (
        <div className="dark:bg-secondary-900 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-5">
          <FibrProvider plugins={[raftyPlugin]}>
            <Story />
          </FibrProvider>
        </div>
      );
    },
  ],
};

export default preview;
