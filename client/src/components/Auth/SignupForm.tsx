// import React from 'react'

import styled from "styled-components";

type SignupFormProps = {
  submit: (email: string, password: string) => Promise<void>;
};

export function SignupForm({ submit }: SignupFormProps) {
  return (
    <>
      <h1>Registere here</h1>
      <Form>
        <label htmlFor="email" className="text-stone-700 text-base mt-8">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Your email"
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
            onClick={() => console.log("Button clicked")}
            // onClick={handleReset}
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
