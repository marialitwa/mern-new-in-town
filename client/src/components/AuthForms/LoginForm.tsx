// import React from 'react'
import { FormEvent, useContext, useState } from "react";
import {
  PageTitle,
  AuthForm,
  FormHeader,
  FromInstructionText,
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
        <FromInstructionText>
          Enter your email address and password associated with your account.
        </FromInstructionText>
      </FormHeader>
      <AuthForm onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-stone-700 text-base mt-8">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          value={loginCredentials?.email}
          onChange={handleInputChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
          required
        />
        <label htmlFor="password" className="text-stone-700 text-base mt-8">
          Password
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
            className="w-1/2 rounded-md py-2.5 px-4 mt-8 border text-sm bg-gray-800 text-gray-50"
          >
            Login
          </button>
          <button
            // onClick={() => console.log("Button clicked")}
            onClick={handleReset}
            type="reset"
            className="w-1/2 rounded-md py-2.5 px-4 mt-4 mb-10 border text-sm bg-gray-300"
          >
            Reset all fields
          </button>
        </div>
      </AuthForm>
    </>
  );
}
