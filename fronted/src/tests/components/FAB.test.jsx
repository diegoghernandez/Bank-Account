import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Fab } from "../../components/Buttons/FAB";

describe("FAB component tests", () => {
   it("Should render correctly", () => {
      render(<Fab label="TESTING" />);

      const fabs = screen.getAllByText("TESTING");

      expect(fabs[0]).not.toHaveAttribute("hidden");
      expect(fabs[1]).toHaveAttribute("hidden");
   });
});