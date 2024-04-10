// import React from 'react'
import { FormEvent, useContext, useState } from "react";
import {
  PageTitle,
  AuthForm,
  FormHeader,
  FormInstructionText,
} from "../CommonUI.tsx";
import { AuthContext } from "../../context/AuthContext.tsx";

type LoginCredentials = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { login } = useContext(AuthContext);
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials | null>(null);
  // const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
  //   email: "",
  //   password: "",
  // });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // console.log("event.target.value", event.target.name, event.target.value);
    setLoginCredentials({
      ...(loginCredentials as LoginCredentials),
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log("Login Credentials", loginCredentials);
    if (loginCredentials) {
      await login(loginCredentials.email, loginCredentials.password);
    }
  }

  function handleReset() {
    setLoginCredentials({
      email: "",
      password: "",
    });
  }

  return (
    <>
      <FormHeader>
        <PageTitle>Login</PageTitle>
        <FormInstructionText>
          Enter your email address and password associated with your account.
        </FormInstructionText>
      </FormHeader>
      <AuthForm onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-stone-700 mt-8 text-[0.95rem]">
          Email*
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          value={loginCredentials?.email}
          onChange={handleInputChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          required
        />
        <label
          htmlFor="password"
          className="text-stone-700 mt-4 text-[0.95rem]"
        >
          Password*
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          value={loginCredentials?.password}
          onChange={handleInputChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
          required
        />

        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="w-full rounded-md py-2.5 px-4 mt-4 border text-sm bg-gray-800 text-gray-50"
          >
            Login
          </button>
          <button
            // onClick={() => console.log("Button clicked")}
            onClick={handleReset}
            type="reset"
            className="w-full rounded-md py-2.5 px-4 mt-3 mb-5 border text-sm bg-gray-300"
          >
            Reset all fields
          </button>
        </div>
        {/* INFOTEXT: Required fields =========== */}
        <p className="italic text-sm text-stone-600 mb-4">* required fields</p>
      </AuthForm>
    </>
  );
}
