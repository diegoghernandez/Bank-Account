import { describe, expect, it } from "vitest";
import * as stories from "../../components/Switch/Switch.stories";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

const { DefaultFalse, DisabledFalse, DefaultTrue, DisabledTrue } = composeStories(stories);

describe("Switch component tests", () => {
   it("Should Default False have the right attributes", () => {
      render(<DefaultFalse />);

      expect(screen.getByRole("checkbox")).not.toBeDisabled();
      expect(screen.getByRole("checkbox")).not.toBeChecked();
   });

   it("Should Disabled False have the right attributes", () => {
      render(<DisabledFalse />);

      expect(screen.getByRole("checkbox")).toBeDisabled();
      expect(screen.getByRole("checkbox")).not.toBeChecked();
   });

   it("Should Default True have the right attributes", () => {
      render(<DefaultTrue />);

      expect(screen.getByRole("checkbox")).not.toBeDisabled();
      expect(screen.getByRole("checkbox")).toBeChecked();
   });
   
   it("Should Disabled False have the right attributes", () => {
      render(<DisabledTrue />);

      expect(screen.getByRole("checkbox")).toBeDisabled();
      expect(screen.getByRole("checkbox")).toBeChecked();
   });
});