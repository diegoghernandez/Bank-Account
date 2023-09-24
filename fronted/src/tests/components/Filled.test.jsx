import { composeStories } from "@storybook/react";
import { describe, expect, it } from "vitest";
import * as stories from "../../components/Buttons/Filled/Filled.stories";
import { render, screen } from "@testing-library/react";

const { Default, Disable} = composeStories(stories);

describe("Filled component tests", () => {
   it("Should render correctly the Default state", () =>{
      render(<Default />);

      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Button")).not.toBeDisabled();
   });

   it("Should render correctly the Disable state", () =>{
      render(<Disable />);

      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Button")).toBeDisabled();
   });
});