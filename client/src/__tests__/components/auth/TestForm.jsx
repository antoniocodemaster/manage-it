import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestForm from "../../../components/auth/TestForm";

test("alert with red icon and message should appears when some input is empty", async () => {
   const user = userEvent.setup();

   render(<TestForm />);

   const submitBtn = screen.getByRole("button", { name: "Submit" });

   await user.click(submitBtn);

   const alertModal = await screen.findByText(/Please, Complete All Required Fields/i);

   expect(alertModal).toBeInTheDocument();
});

const testMsg =
   "alert with red icon and message should appears when all inputs are filled but some input is invalid";

test(testMsg, async () => {
   const user = userEvent.setup();

   render(<TestForm />);

   const firstName = screen.getByRole("textbox", { name: "First Name" });

   const email = screen.getByRole("textbox", { name: "Email" });

   const password = screen.getByRole("textbox", { name: "Password" });

   const city = screen.getByRole("textbox", { name: "City" });

   const state = screen.getByRole("textbox", { name: "State" });

   const zip = screen.getByRole("textbox", { name: "Zip" });

   const submitBtn = screen.getByRole("button", { name: "Submit" });

   await user.clear(email);
   await user.email();
});
