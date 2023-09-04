import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { AuthProvider } from '../src/hooks/useAuth';
import "../src/index.css"

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <AuthProvider theme="default">
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;