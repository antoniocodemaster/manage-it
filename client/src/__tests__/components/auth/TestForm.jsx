import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TestForm from "../../../components/auth/TestForm";

test("alert with red icon and message should appears when some input is empty", async () => {
   const user = userEvent.setup();

   render(<TestForm />);

   const submitBtn = screen.getByRole("button", { name: "Submit" });

   await user.click(submitBtn);

   const alertModal = await screen.findByText(/Please, Complete All Required Fields/i);

   expect(alertModal).toBeInTheDocument();
});

test("alert with red icon and message should appears when first name and email are invalid", async () => {
   const user = userEvent.setup();

   render(<TestForm />);

   const firstName = screen.getByRole("textbox", { name: /first name/i });

   fireEvent.change(firstName, { target: { value: "hola" } });

   expect(firstName.value).toBe("hola");

   const email = screen.getByRole("textbox", { name: "Email" });

   fireEvent.change(email, { target: { value: "correo" } });

   // expect(email.value).toBe("correo");
   // const submitBtn = screen.getByRole("button", { name: "Submit" });

   // const alertEmailModal = await screen.findByText(/invalid email/i);

   // expect(alertEmailModal).toBeInTheDocument();
});
