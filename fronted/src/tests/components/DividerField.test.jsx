import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DividerField } from "../../components/Divider/DividerField/DividerField";

describe("DividerField component tests", () => {
   it("Should render correctly", () => {
      render(<DividerField label="Label" />);

      expect(screen.getByRole("button")).toBeInTheDocument();
   });

   it("Should have the modal characteristic", () => {
      render(<DividerField 
         label="Label" 
         modalUtils={{
            messageUtils: {
               message: "Do you want to close session?",
            }
         }}
      />);

      fireEvent.click(screen.getByRole("button", { name: "Label" }));

      expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
   });
});