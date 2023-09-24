import { composeStories, } from "@storybook/react";
import { describe, expect, it } from "vitest";

import * as stories from "../../components/Card/Card.stories";
import { render, screen } from "@testing-library/react";

const { Default, Disable } = composeStories(stories);

describe("Card component test", () => {
   it("Should render the Default card correctly", () => {
      render(<Default />);
   
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("$43254.00")).toBeInTheDocument();
      expect(screen.getByText("Missing 7 days/14 hours/32 minutes")).toBeInTheDocument();
   });

   it("Should render the Disabled card correctly", () => {
      render(<Disable />);
   
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("$43254.00")).toBeInTheDocument();
      expect(screen.getByText("Missing 7 days/14 hours/32 minutes")).toBeInTheDocument();
   });
});