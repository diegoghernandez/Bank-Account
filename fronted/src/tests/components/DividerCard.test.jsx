import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DividerCard } from "../../components/Divider/DividerCard/DividerCard";

describe("DividerCard component tests", () => {
   it("Should render correctly", () => {
      const name = "Account";
      const amount = "$432003.00";
      const type = "Wire Transfer";
      const time = "2024/02/03 11:34:23";
      
      render(<DividerCard  
         name={name}
         amount={amount}
         type={type}
         time={time}
      />);

      const dividerCard = screen.getByRole("article");

      expect(dividerCard).toBeInTheDocument();
      expect(dividerCard).toContainElement(screen.getByText(name));
      expect(dividerCard).toContainElement(screen.getByText(amount));
      expect(dividerCard).toContainElement(screen.getByText(type));
      expect(dividerCard).toContainElement(screen.getByText(time));
   });
});