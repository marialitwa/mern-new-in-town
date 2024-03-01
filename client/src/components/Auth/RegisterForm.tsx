// import React from 'react'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type RegisterFormProps = {
  submit: (email: string, password: string) => Promise<void>;
};

export function RegisterForm({ submit }: RegisterFormProps) {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = inputValues.email.trim();
    const password = inputValues.password.trim();

    if (!email || !password) return alert("Please fill out all fields.");

    submit(email, password);
    alert("Welcome! You are now registered with our wonderful app.");
    navigate("/");
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
      {/* <h1>Registere here</h1> */}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-stone-700 text-base mt-8">
          Email
        </label>
        <input
          type="email"
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
            Submit
          </button>
          <button
            // onClick={() => console.log("Button clicked")}
            onClick={handleReset}
            type="reset"
            className="w-1/2 rounded-md py-2.5 px-4 mt-4 mb-40 border text-sm bg-gray-300"
          >
            Reset all fields
          </button>
        </div>
      </Form>
    </>
  );
}

// STYLING

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
