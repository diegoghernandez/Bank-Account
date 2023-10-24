import { vi } from "vitest";
import { Traduction } from "../../constants/Traduction";
import { Token } from "../../pages/Token";
import { getTraduction } from "../../utils/getTraduction";
import { customRender } from "../../utils/renderTest";
import { waitForElementToBeRemoved } from "@testing-library/dom";

const t = getTraduction(Traduction.TOKEN_REGISTER);

const mocks = vi.hoisted(() => {
   return {
      useSearchParams: vi.fn(),
   };
});

vi.mock("react-router-dom", async () => {
   const actual = await vi.importActual("react-router-dom");
   return {
      ...actual,
      useSearchParams: mocks.useSearchParams,
   };
});

describe("Token page tests", () => {
   it("Should render the Token expire page correctly", async () =>  {
      mocks.useSearchParams.mockReturnValue([new URLSearchParams({ 
         id: 45325324,
         token: "er143ge8-9b58-41ae-8723-29d7ff675a30",
         traduction: "TOKEN_REGISTER"
      })]);
      const page = customRender(<Token />);
   
      await waitForElementToBeRemoved(() => 
         page.getAllByRole("progressbar")
      );
   
      expect(page.getByRole("heading")).toBeInTheDocument();
      expect(page.getByText(t.description.expired)).toBeInTheDocument();      
   });

   it("Should render the Token valid page correctly", async () =>  {
      mocks.useSearchParams.mockReturnValue([new URLSearchParams({ 
         id: 45325324,
         token: "nu3v3-9b58-41ae-8723-29d7ff675a30",
         traduction: "TOKEN_REGISTER"
      })]);
      
      const page = customRender(<Token />);
   
      await waitForElementToBeRemoved(() => 
         page.getAllByRole("progressbar")
      );
   
      expect(page.getByRole("heading")).toBeInTheDocument();
      expect(page.getByText(t.description.valid)).toBeInTheDocument();      
   });
});