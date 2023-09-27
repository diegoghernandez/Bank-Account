import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { composeStories } from "@storybook/react";
import * as stories from "../../components/TextField/TextField.stories";
import userEvent from "@testing-library/user-event";
import { TextField } from "../../components/TextField/TextField";

const { Default, Menu, Modal } = composeStories(stories);

describe("TextField component tests", () => {
   describe("Default type", () => {
      it("Should render correctly", async () => {
         render(<Default />);
         const textField = screen.getByLabelText("Default");

         await userEvent.type(textField, "new value");

         expect(textField).toBeInTheDocument();
         expect(textField).toHaveValue("new value");
         expect(textField).toHaveAttribute("type", "text");
         expect(textField).not.toHaveAttribute("readOnly");
         expect(textField).toHaveAccessibleDescription("Supportive");
      });

      it("Should show the error status", async () => {
         render(<TextField 
            {...Default.args}
            supportiveText="Show error"
            isError={true}
         />);
         const textField = screen.getByLabelText("Default");

         await userEvent.type(textField, "new value");

         expect(textField).toBeInTheDocument();
         expect(textField).toHaveValue("new value");
         expect(textField).toHaveAttribute("aria-invalid", "true");
         expect(textField).toHaveAccessibleDescription("Show error");
      });

      it("Should show the disable status", async () => {
         render(<TextField 
            {...Default.args}
            isDisable={true}
         />);
         const textField = screen.getByLabelText("Default");

         await userEvent.type(textField, "new value");

         expect(textField).toBeInTheDocument();
         expect(textField).toBeDisabled();
         expect(textField).not.toHaveValue("new value");
      });
   });

   describe("Menu type", () => {
      it("Should render correctly", () => {
         render(<Menu />);
         const textField = screen.getByLabelText("Menu");

         fireEvent.click(textField);

         expect(textField).toBeInTheDocument();
         expect(textField).toHaveAttribute("readOnly");
         expect(textField).toHaveAttribute("type", "text");
         expect(textField).toHaveAccessibleDescription("Supportive");
         expect(screen.getAllByRole("button")).length(4);
      });

      it("Should be able to choose some", () => {
         render(<Menu />);
         const textField = screen.getByLabelText("Menu");

         fireEvent.click(textField);
         fireEvent.click(screen.getAllByRole("button")[0]);

         expect(textField).toBeInTheDocument();
         expect(textField).toHaveValue("Deposit");
      });

      it("Should show the error status", () => {
         render(<TextField 
            {...Menu.args}
            supportiveText="Show error"
            isError={true}
         />);
         const textField = screen.getByLabelText("Menu");

         expect(textField).toBeInTheDocument();
         expect(textField).toHaveAttribute("aria-invalid", "true");
         expect(textField).toHaveAttribute("readOnly");
         expect(textField).toHaveAccessibleDescription("Show error");
      });

      it("Should show the disable status", () => {
         render(<TextField 
            {...Menu.args}
            isDisable={true}
         />);
         const textField = screen.getByLabelText("Menu");

         expect(textField).toBeInTheDocument();
         expect(textField).toBeDisabled();
         expect(textField).toHaveAttribute("readOnly");
      });
   });

   describe("Modal type", () => {
      it("Should render correctly", () => {
         render(<Modal />);
         const textField = screen.getByLabelText("Modal");

         fireEvent.click(textField);

         expect(textField).toBeInTheDocument();
         expect(textField).toHaveAttribute("readOnly");
         expect(textField).toHaveAttribute("type", "text");
         expect(textField).toHaveAccessibleDescription("Supportive");
         expect(screen.getByRole("heading", { hidden: true })).toBeInTheDocument();
         expect(screen.getAllByRole("combobox", { hidden: true })).length(2);
      });

      it("Should be able to choose some", () => {
         render(<Modal />);
         const textField = screen.getByLabelText("Modal");

         fireEvent.click(textField);
         userEvent.selectOptions(screen.getByRole("combobox", { name: "weeks", hidden: true }), "1");
         fireEvent.click(screen.getByRole("button", { name: "Accept", hidden: true }));

         expect(textField).toBeInTheDocument();
         expect(textField.value).toMatch("Each");
      });

      it("Should show the error status", () => {
         render(<TextField 
            {...Modal.args}
            supportiveText="Show error"
            isError={true}
         />);
         const textField = screen.getByLabelText("Modal");

         expect(textField).toBeInTheDocument();
         expect(textField).toHaveAttribute("aria-invalid", "true");
         expect(textField).toHaveAttribute("readOnly");
         expect(textField).toHaveAccessibleDescription("Show error");
      });

      it("Should show the disable status", () => {
         render(<TextField 
            {...Modal.args}
            isDisable={true}
         />);
         const textField = screen.getByLabelText("Modal");

         expect(textField).toBeInTheDocument();
         expect(textField).toBeDisabled();
         expect(textField).toHaveAttribute("readOnly");
      });
   });
});