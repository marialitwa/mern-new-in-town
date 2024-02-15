// import React from 'react'

import { useState } from "react";

type Props = {
  submit: (name: string) => Promise<void>;
};

const DoctorForm = ({ submit }: Props) => {
  const [inputValues, setInputValues] = useState({ name: "" });
  console.log("Input Values", inputValues);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValues.name) return alert("Name must be included");
    await submit(inputValues.name);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [event.target.type]: event.target.value });
  };

  return (
    <>
      <div>
        {/* DOCTOR FORM ============================== */}
        <form>
          <fieldset className="flex flex-col m-10">
            <legend className="text-center font-light text-xl">
              Add a new doctor.
            </legend>
            {/* NAME  =============== */}
            <label
              htmlFor="name"
              className="text-stone-700 text-base mt-8"
              // className="sm:text-yellow-500 md:text-blue-500 lg:text-red-500  xl:text-green-500 2xl:text-pink-500"
            >
              Name*
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={inputValues.name}
              placeholder="Dr. Anne Ärztin"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
              required
            />

            {/* MEDICAL SPECIALTY  =============== */}
            <label htmlFor="type" className="text-stone-700 text-base">
              Medical Specialty
            </label>
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Orthopädin"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* MEDICAL PRACTICE  =============== */}
            {/* 
          <label
            htmlFor="medical-practice"
            className="text-stone-700 text-base"
          >
            Medical Practice
          </label>
          <input
            type="text"
            name="medical-practice"
            id="medical-practice"
            placeholder="Arztpraxis Berlin"
            className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
          /> */}

            {/* CITY DISTRICT  =============== */}
            <label htmlFor="city-district" className="text-stone-700 text-base">
              City District
            </label>
            <input
              type="text"
              name="city-district"
              id="city-district"
              placeholder="Wedding"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* ADDRESS  =============== */}
            <label htmlFor="address" className="text-stone-700 text-base">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Straße usw."
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* PHONE NUMBER  =============== */}

            <label htmlFor="phone-number" className="text-stone-700 text-base">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone-number"
              id="phone-number"
              // RESEARCH: pattern=""
              placeholder="030-1234567"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* WEBSITE  =============== */}

            <label htmlFor="url" className="text-stone-700 text-base">
              Website
            </label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="www.arztpraxis.berlin"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* TEXTFIELD FOR NOTES  =============== */}
            <label htmlFor="notes" className="text-stone-700 text-base">
              Notes
            </label>
            <textarea
              name="notes"
              id="notes"
              placeholder="Write your personal notes here ..."
              className="w-auto rounded-md py-2.5 px-4 mb-3 border text-sm outline-[#007bff]"
            >
              Write your personal notes here
            </textarea>
            {/* INFOTEXT: Required fields */}
            <p className="italic mt-2 text-sm text-stone-600">
              * required fields
            </p>
          </fieldset>

          <div className="flex flex-col justify-center items-center">
            <button
              submit="{handleSubmit}"
              type="submit"
              className="w-1/2 rounded-md py-2.5 px-4 mt-8 border text-sm outline-[#007bff] bg-pink-200"
            >
              Submit
            </button>
            <button
              type="reset"
              className="w-1/2 rounded-md py-2.5 px-4 mt-4 mb-40 border text-sm outline-[#007bff] bg-gray-300"
            >
              Reset all fields
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DoctorForm;
