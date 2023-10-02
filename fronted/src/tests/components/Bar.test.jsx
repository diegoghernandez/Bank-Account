import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Bar } from "../../components/Loader/Bar";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

describe("Bar component tests", () => {
   it("Should render correctly", () => {
      render(<Bar />);
      const { title } = getTraduction(Traduction.LOADER);

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveAttribute("title", title);
   });
});