// import React from 'react'
import { FormEvent, useContext, useState } from "react";
import {
  PageTitleAuth,
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
        <PageTitleAuth>Login</PageTitleAuth>
        <FormInstructionText>
          Enter your email address and password associated with your account.
        </FormInstructionText>
      </FormHeader>
      <AuthForm onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className=" text-stone-700 mt-6 text-[.9rem] md:text-base"
        >
          Email*
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          value={loginCredentials?.email}
          onChange={handleInputChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55"
          required
        />
        <label
          htmlFor="password"
          className=" text-stone-700 mt-6 text-[.9rem] md:text-base"
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
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55"
          required
        />

        {/* -- SUBMIT & RESET BUTTONS -- */}
        <div className="flex flex-col justify-center items-center mt-8 mb-6">
          <button
            type="submit"
            className="flex justify-center items-center w-full rounded-md py-2.5 px-4 border text-sm text-gray-800 tracking-[0.01rem] bg-[#c78290]/75"
          >
            Login
          </button>
          <button
            onClick={handleReset}
            type="reset"
            className="flex justify-center items-center w-full rounded-md py-2.5 px-4 mt-2 border text-sm bg-gray-100 text-gray-600 tracking-[0.01rem]"
          >
            Reset all fields
          </button>
        </div>
        {/* -- REQUIRED FIELDS -- */}
        <p className="italic text-sm text-stone-600 mb-4">*required fields</p>
      </AuthForm>
    </>
  );
}
