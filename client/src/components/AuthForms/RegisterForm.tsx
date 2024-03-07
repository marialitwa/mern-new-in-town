// import React from 'react'

import { useContext, useState } from "react";
import {
  PageTitle,
  AuthForm,
  FormHeader,
  FromInstructionText,
} from "../CommonUI.tsx";
import { AuthContext } from "../../context/AuthContext.tsx";

export function RegisterForm() {
  const { signup } = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = inputValues.email.trim();
    const password = inputValues.password.trim();

    if (!email || !password) return alert("Please fill out all fields.");

    signup(email, password);
    // navigate to login
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValues({
      ...inputValues,
      [event.target.type]: event.target.value,
    });
  }

  function handleReset() {
    setInputValues({
      email: "",
      password: "",
    });
  }

  return (
    <>
      <FormHeader>
        <PageTitle>Register</PageTitle>
        <FromInstructionText>
          Enter your email address and a password to create an account.
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
          value={inputValues.email}
          onChange={handleChange}
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
          value={inputValues.password}
          onChange={handleChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
          required
        />

        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="w-1/2 rounded-md py-2.5 px-4 mt-8 border text-sm bg-pink-400"
          >
            Register
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
