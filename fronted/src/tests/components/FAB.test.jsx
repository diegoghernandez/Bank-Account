import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Fab } from "../../components/Buttons/FAB/FAB";

describe("FAB component tests", () => {
   it("Should render correctly", () => {
      render(<Fab label="TESTING" />);

      expect(screen.getByText("TESTING")).toBeInTheDocument();
   });
});