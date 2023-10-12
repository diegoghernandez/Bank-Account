import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "../../components/Menu";

describe("Menu component test", () => {
   it("Should render correctly", () => {
      getElements();
      
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
   });

   it("Should some functions have called after interact with the button", () => {
      const { mockSetValue } = getElements();

      fireEvent.click(screen.getByText("Second"));
      fireEvent.focus(screen.getByText("Second"));

      expect(mockSetValue).toHaveBeenCalledTimes(1);
      expect(mockSetValue).toHaveBeenCalledWith("Second");
   });
});

const getElements = () => {
   const mockSetValue = vi.fn();
   const mockHandleClick = vi.fn();
   render(<Menu 
      parameters={["First", "Second"]} 
      setValue={mockSetValue}
      handleClickOutside={mockHandleClick}
   />);

   return {
      mockSetValue,
      mockHandleClick,
   };
};