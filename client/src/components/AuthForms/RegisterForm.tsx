// import React from 'react'

import { useContext, useState } from "react";
import {
  PageTitleAuth,
  AuthForm,
  FormHeader,
  FormInstructionText,
} from "../CommonUI.tsx";
import { AuthContext } from "../../context/AuthContext.tsx";

export function RegisterForm() {
  const { signup } = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({
    userName: "",
    email: "",
    password: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userName = inputValues.userName.trim();
    const email = inputValues.email.trim();
    const password = inputValues.password.trim();

    if (!email || !password) return alert("Please fill out all fields.");

    signup(userName, email, password);
    // navigate to login
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(
      "event.target.name::event.target.value",
      event.target.name,
      event.target.value
    );
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  }

  function handleReset() {
    setInputValues({
      userName: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <FormHeader>
        <PageTitleAuth>Register</PageTitleAuth>
        <FormInstructionText>
          Enter your email address and a password to create an account.
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
          value={inputValues.email}
          onChange={handleChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55"
          autoComplete="email"
          required
        />
        <label
          htmlFor="password"
          className="text-stone-700 mt-4 text-[.9rem] md:text-base"
        >
          Password*
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          value={inputValues.password}
          onChange={handleChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55"
          autoComplete="new-password"
          required
        />
        <label
          htmlFor="userName"
          className="text-stone-700 mt-4 text-[.9rem] md:text-base"
        >
          User Name*
        </label>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="Your username"
          value={inputValues.userName}
          onChange={handleChange}
          className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55"
          autoComplete="username"
          required
        />

        {/* -- SUBMIT & RESET BUTTONS -- */}
        <div className="flex flex-col justify-center items-center mt-8 mb-6">
          <button
            type="submit"
            className="flex justify-center items-center w-full rounded-md py-2.5 px-4 border text-sm text-gray-800 tracking-[0.01rem] bg-[#c78290]/75"
          >
            Register
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
