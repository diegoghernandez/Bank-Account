import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar } from "../../components/Navbar";
import { customRender } from "../../utils/renderTest";

describe("Navbar component test", () => {
   it("Should render correctly", () => {
      customRender(<Navbar />);

      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
      expect(screen.getByRole("link", { name: /^Transac[-\s]*tions$/ })).toHaveAttribute("href", "/transactions");
      expect(screen.getByRole("link", { name: /^Automa[-\s]*tions$/ })).toHaveAttribute("href", "/automations");
      expect(screen.getByRole("link", { name: "Account" })).toHaveAttribute("href", "/account");
   });
});