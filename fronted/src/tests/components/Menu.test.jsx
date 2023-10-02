import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "../../components/Menu";

describe("Menu component test", () => {
   it("Should render correctly", () => {
      getElements();
      
      expect(screen.getByRole("button", { name: "First" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Second" })).toBeInTheDocument();
   });

   it("Should some functions have called after interact with the button", () => {
      const { mockSetValue, mockSetIsChange, mockSetIsClicked } = getElements();

      fireEvent.click(screen.getByRole("button", { name: "Second" }));
      fireEvent.focus(screen.getByRole("button", { name: "Second" }));

      expect(mockSetValue).toHaveBeenCalledTimes(1);
      expect(mockSetValue).toHaveBeenCalledWith("Second");
      expect(mockSetIsChange).toHaveBeenCalledTimes(1);
      expect(mockSetIsClicked).toHaveBeenCalledTimes(2);
      expect(mockSetIsClicked).toHaveBeenCalledWith(true);
   });

   it("Should leave of the menu with the hidden button", () => {
      const { mockSetIsShowMenu, mockSetIsClicked } = getElements();
   
      fireEvent.blur(screen.getByRole("button", { name: "Tab for exit" }));
   
      expect(mockSetIsShowMenu).toHaveBeenCalledTimes(1);
      expect(mockSetIsShowMenu).toHaveBeenCalledWith(false);
      expect(mockSetIsClicked).toHaveBeenCalledTimes(1);
      expect(mockSetIsClicked).toHaveBeenCalledWith(false);
   });
});

const getElements = () => {
   const mockSetValue = vi.fn();
   const mockHandleClick = vi.fn();
   const mockSetIsClicked = vi.fn();
   const mockSetIsChange = vi.fn();
   const mockSetIsShowMenu = vi.fn();

   render(<Menu 
      parameters={["First", "Second"]} 
      setValue={mockSetValue}
      handleClickOutside={mockHandleClick}
      setIsClicked={mockSetIsClicked}
      setIsChange={mockSetIsChange}
      setIsShowMenu={mockSetIsShowMenu}
   />);

   return {
      mockSetValue,
      mockHandleClick,
      mockSetIsClicked,
      mockSetIsChange,
      mockSetIsShowMenu
   };
};