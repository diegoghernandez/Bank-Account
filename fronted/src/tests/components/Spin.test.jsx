import { render, screen } from "@testing-library/react";
import { Spin } from "../../components/Loader/Spin";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";

describe("Spin component tests", () => {
   it("Should render correctly", () => {
      render(<Spin />);
      const { title } = getTraduction(Traduction.LOADER);

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveAttribute("title", title);
   });
});