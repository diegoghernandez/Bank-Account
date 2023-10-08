import { composeStories } from "@storybook/react";
import * as stories from "../../components/Buttons/Outline/Outline.stories";
import { render, screen } from "@testing-library/react";

const { Default, Disable } = composeStories(stories);

describe("Outline component tests", () => {
   it("Should render correctly the Default state", () =>{
      render(<Default />);

      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Button")).toHaveAttribute("aria-disabled", "false");
   });

   it("Should render correctly the Disable state", () =>{
      render(<Disable />);

      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Button")).toHaveAttribute("aria-disabled", "true");
   });
});