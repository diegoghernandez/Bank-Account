import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../../components/Modal";
import userEvent from "@testing-library/user-event";
import { TextFieldTypes } from "../../constants/TextFieldType";

describe("Modal component test", () => {
   describe("List modal", () => {
      it("Should render correctly", () => {
         getListElements();

         fireEvent.click(screen.getByRole("button", { name: "Modal" }));

         expect(screen.getByRole("heading", { hidden: true })).toBeInTheDocument();
         expect(screen.getByLabelText("year")).toBeInTheDocument();
         expect(screen.getByLabelText("month")).toBeInTheDocument();
         expect(screen.getByRole("button", { name: "Cancel", hidden: true })).toBeInTheDocument();
         expect(screen.getByRole("button", { name: "Accept", hidden: true })).toBeInTheDocument();
      });

      it("Should all functions have called after interact with the button", async () => {
         const { mockSetValue, mockSetIsChange, mockSetIsClicked } = getListElements();

         fireEvent.click(screen.getByRole("button", { name: "Modal" }));

         await userEvent.click(screen.getByLabelText("year"));
         await userEvent.click(screen.getByRole("menuitem", { name: "2015", hidden: true }));
         await userEvent.click(screen.getByLabelText("month"));
         await userEvent.click(screen.getByRole("menuitem", { name: "December", hidden: true }));
         fireEvent.click(screen.getByRole("button", { name: "Accept", hidden: true }));

         expect(mockSetValue).toHaveBeenCalledTimes(1);
         expect(mockSetValue).toHaveBeenCalledWith("2015 December");
         expect(mockSetIsChange).toHaveBeenCalledTimes(1);
         expect(mockSetIsClicked).toHaveBeenCalledTimes(1);
      });
   });

   describe("Form modal", () => {
      it("Should render correctly", () => {
         getFormElements();
         
         fireEvent.click(screen.getByRole("button", { name: "Modal" }));

         expect(screen.getByRole("heading", { hidden: true })).toBeInTheDocument();
         expect(screen.getByLabelText("First parameter")).toBeInTheDocument();
         expect(screen.getByLabelText("Second parameter")).toBeInTheDocument();
         expect(screen.getByRole("button", { name: "Cancel", hidden: true })).toBeInTheDocument();
         expect(screen.getByRole("button", { name: "Accept", hidden: true })).toBeInTheDocument();
      });

      it("Should show the the load state after interact with the button", () => {
         render(<Modal 
            title="Testing Form"
            formUtils={{
               inputs: ["First parameter", "Second parameter"],
               isLoading: true
         }}/>);

         const acceptButton = screen.getByRole("button", { name: "Accept", hidden: true });
         
         fireEvent.click(screen.getByRole("button", { name: "Modal" }));
         fireEvent.click(acceptButton);

         expect(screen.getByLabelText("First parameter")).toBeDisabled();
         expect(screen.getByLabelText("Second parameter")).toBeDisabled();
         expect(screen.getByRole("button", { name: "Cancel", hidden: true })).toBeDisabled();
         expect(acceptButton).toBeDisabled();
      });

      it("Should show the an error after interact with the button", () => {
         render(<Modal 
            title="Testing Form"
            formUtils={{
               inputs: ["First parameter", "Second parameter"],
               errorParameters: {
                  first: "First error",
                  second: "Second error"
               }
         }}/>);
         
         fireEvent.click(screen.getByRole("button", { name: "Modal" }));
         fireEvent.click(screen.getByRole("button", { name: "Accept", hidden: true }));

         expect(screen.getByLabelText("First parameter")).toHaveAccessibleDescription("First error");
         expect(screen.getByLabelText("Second parameter")).toHaveAccessibleDescription("Second error");
      });

      it("Should the mockHandle have called after interact with the button and with the inputs with value", async () => {
         const { mockHandle } = getFormElements();
         const user = userEvent.setup();

         await user.click(screen.getByRole("button", { name: "Modal" }));

         await user.type(screen.getByLabelText("First parameter"), "Parameter");
         await user.type(screen.getByLabelText("Second parameter"), "Parameter");
         await user.click(screen.getByRole("button", { name: "Accept", hidden: true }));

         expect(mockHandle).toHaveBeenCalledTimes(1);
      });

      it("Should show the success message", () => {
         const success = render(<Modal 
            title="Testing Form"
            formUtils={{
               inputs: ["First parameter", "Second parameter"],
               successMessage: "Logic applied successfully"
            }}
         />);

         expect(success.getByRole("heading", { hidden: true })).toBeInTheDocument();
         expect(success.getByText("Logic applied successfully")).toBeInTheDocument();
         expect(success.getByRole("button", { name: "Accept", hidden: true })).toBeInTheDocument();
      });
   });

   describe("Message modal", () => {
      it("Should render correctly", () => {
         getMessageElements();

         expect(screen.getByRole("heading", { hidden: true })).toBeInTheDocument();
         expect(screen.getByText("Logic applied successfully")).toBeInTheDocument();
         expect(screen.getByRole("button", { name: "Cancel", hidden: true})).toBeInTheDocument();
         expect(screen.getByRole("button", { name: "Accept", hidden: true})).toBeInTheDocument();
      });
   });
});

const getListElements = () => {
   const mockSetValue = vi.fn();
   const mockSetIsChange = vi.fn();
   const mockSetIsClicked = vi.fn();

   render(<Modal 
      title="Testing List"
      listUtils={{
         parameters: [{
            label: "year",
            textFieldType: TextFieldTypes.MENU,
            menuParameters: [2015, 2016, 2017]
         }, {
            label: "month",
            textFieldType: TextFieldTypes.MENU,
            menuParameters: ["December", "January", "February"]
         }],
         setValue: mockSetValue,
         setIsChange: mockSetIsChange,
         setIsClicked: mockSetIsClicked
      }}
   />);

   return {
      mockSetValue,
      mockSetIsChange,
      mockSetIsClicked
   };
};

const getFormElements = () => {
   const mockHandle = vi.fn();

   render(<Modal 
      title="Testing Form"
      formUtils={{
         inputs: ["First parameter", "Second parameter"],
         handle: mockHandle,
      }}
   />);

   return {
      mockHandle,
   };
};

const getMessageElements = () => {
   render(<Modal 
      title="Testing Message"
      messageUtils={{
         message: "Logic applied successfully"
      }}
   />);
};