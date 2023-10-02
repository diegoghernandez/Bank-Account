import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { AuthProvider } from "../src/hooks/useAuth";
import "../src/index.css"
import { initialize, mswDecorator } from "msw-storybook-addon";
import { rest } from "msw";
import { HelmetProvider } from "react-helmet-async";

initialize({
  onUnhandledRequest: "bypass"
});

/** @type { import("@storybook/react").Preview } */
const preview = {
  decorators: [
    mswDecorator,
    (Story) => (
      <HelmetProvider theme="default">
        <AuthProvider theme="default">
          <Story />
        </AuthProvider>
      </HelmetProvider>
    ),
  ],
  loaders: [
    () => {
      localStorage.setItem("account", '{"idAccount":238589851,"accountName":"juan","email":"juan@names.com","currentBalance":54}');
    }
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: [
      rest.get("http://localhost:8090/accounts/email/:email", (req, res, ctx) => {
        return res(ctx.json({
            "idAccount": 238589851,
            "accountName": "juan",
            "email": "juan@names.com",
            "currentBalance": 22677.00
        }));
      }),
    ]
  },
};

export default preview;