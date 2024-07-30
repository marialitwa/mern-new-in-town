import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import baseUrl from "../../utils/baseUrl.ts";
import { BtnNavigateBackContainer, BtnNavigateBack } from "../CommonUI.tsx";

type FormType = {
  name: string;
  medical_specialty?: string;
  medical_practice?: string;
  city_district?: string;
  address?: string;
  phone_number?: string;
  website?: string;
  notes?: string;
};

export default function DoctorForm() {
  const [inputValues, setInputValues] = useState<FormType>({} as FormType);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) {
    event.preventDefault();

    if (!inputValues.name) return alert("Name must be included.");

    // REVIEW WHY FORM TRIM DOES NOT WORK
    // console.log("EVENT", event);
    // const form = event.target;
    // console.log("FORM", form);
    // const input = form.elements.input.value.trim();
    // if (input === "") return alert("Please fill out the form");

    const body = new URLSearchParams();
    if (location.state) {
      body.append("_id", location.state.getCurrentDoctor._id);
    }

    for (const [key, value] of Object.entries(inputValues)) {
      // console.log("KEY", key, "VALUE", value);
      body.append(key, value);
    }

    const token = localStorage.getItem("token");

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    try {
      const response = isEdit
        ? await fetch(
            `${baseUrl}/api/doctors/update`,

            {
              method: "PUT",
              headers: headers,
              body: body,
            }
          )
        : await fetch(`${baseUrl}/api/doctors/new-entry`, {
            method: "POST",
            headers: headers,
            body: body,
          });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      console.log("Sending data successfull");
    } catch (error) {
      console.error("Data is not send to server", error);
    }
    navigate("/doctors");
  }

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    // console.log("event.target.value", event.target.value);
    // console.log("event", event);
    // console.log("event.target.type", event.target.type);
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  }

  function handleReset() {
    setInputValues({
      name: "",
      medical_specialty: "",
      medical_practice: "",
      city_district: "",
      address: "",
      phone_number: "",
      website: "",
      notes: "",
    });
  }

  useEffect(() => {
    // console.log(location);

    if (location.state) {
      const { getCurrentDoctor } = location.state;
      setIsEdit(true);
      setInputValues(getCurrentDoctor);
      // Equivalent to:
      // setInputValues({
      //   medical_specialty: getCurrentDoctor.medical_specialty,
      //   name: getCurrentDoctor.name,
      //   medical_practice: getCurrentDoctor.medical_practice,
      //   city_district: getCurrentDoctor.city_district,
      //   address: getCurrentDoctor.address,
      //   phone_number: getCurrentDoctor.phone_number,
      //   website: getCurrentDoctor.website,
      //   notes: getCurrentDoctor.notes,
      // });
    } else {
      setIsEdit(false);
    }
  }, [location]);

  return (
    <>
      <div>
        <BtnNavigateBackContainer>
          <BtnNavigateBack onClick={() => navigate(-1)}>Back</BtnNavigateBack>
        </BtnNavigateBackContainer>

        {/* -- FORM -- */}
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col min-w-[19.5rem] w-2/3 max-w-[33rem]"
          >
            <fieldset className="flex flex-col">
              <legend className="text-center font-light text-xl">
                {isEdit ? `Edit details.` : `Add a new doctor.`}
              </legend>

              {/* -- NAME -- */}
              <label
                htmlFor="name"
                className="text-stone-700 mt-6 text-[.9rem] md:text-base"
              >
                Name (required)*
              </label>
              <input
                type="text"
                // name property needs to be corresponding to model/database object-key naming!
                name="name"
                id="name"
                onChange={handleInputChange}
                value={inputValues.name}
                placeholder="Dr. Ada Lovelace"
                className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55 mb-5"
                autoComplete="name"
                required
              />

              {/* -- MEDICAL SPECIALTY -- */}
              <label
                htmlFor="medical_specialty"
                className="text-stone-700 text-[.9rem] md:text-base"
              >
                Medical Specialty
              </label>
              <input
                type="text"
                // name value needs to be corresponding to Model/database object-key naming!
                // must be medical_speciality, not medical-specialty!
                name="medical_specialty"
                id="medical_specialty"
                onChange={handleInputChange}
                value={inputValues.medical_specialty}
                placeholder="Dentist"
                className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55 mb-5"
                autoComplete="organization-title"
              />

              {/* -- MEDICAL PRACTICE -- */}
              {/* 
          <label
            htmlFor="medical_practice"
            className="text-stone-700 text-base"
          >
            Medical Practice
          </label>
          <input
            type="text"
            name="medical_practice"
            id="medical_practice"
            onChange={handleInputChange}
            placeholder="Arztpraxis Berlin"
            className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            autoComplete="organization"
          /> */}

              {/* -- CITY DISTRICT -- */}
              <label
                htmlFor="city_district"
                className="text-stone-700 text-[.9rem] md:text-base"
              >
                City District
              </label>
              <input
                type="text"
                name="city_district"
                id="city_district"
                onChange={handleInputChange}
                value={inputValues.city_district}
                placeholder="Mitte"
                className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55 mb-5"
                autoComplete="address-level4"
              />

              {/* -- ADDRESS -- */}
              <label
                htmlFor="address"
                className="text-stone-700 text-[.9rem] md:text-base"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleInputChange}
                value={inputValues.address}
                placeholder="Berliner Straße 44"
                className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55 mb-5"
                autoComplete="street-address postal-code address-level2"
              />

              {/* -- PHONE NUMBER -- */}
              <label
                htmlFor="phone_number"
                className="text-stone-700 text-[.9rem] md:text-base"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                onChange={handleInputChange}
                value={inputValues.phone_number}
                // RESEARCH: pattern=""
                placeholder="030-1234567"
                className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55 mb-5"
                autoComplete="tel"
              />

              {/* -- WEBSITE -- */}
              <label
                htmlFor="url"
                className="text-stone-700 text-[.9rem] md:text-base"
              >
                Website
              </label>
              <input
                type="url"
                name="website"
                id="url"
                onChange={handleInputChange}
                value={inputValues.website}
                placeholder="www.arztpraxis.berlin"
                className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#c78290]/55 mb-5"
                autoComplete="url"
              />

              {/* -- TEXTFIELD FOR NOTES --*/}
              <label
                htmlFor="notes"
                className="text-stone-700 text-[.9rem] md:text-base"
              >
                Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                onChange={handleInputChange}
                value={inputValues.notes}
                placeholder="Write your personal notes here ..."
                className="w-auto rounded-md py-2.5 px-4 mb-1 border text-sm outline-[#c78290]/55 resize-y min-h-[8rem] md:min-h-40"
                autoComplete="on"
              ></textarea>
            </fieldset>

            {/* -- SUBMIT & RESET BUTTONS -- */}
            <div className="flex flex-col justify-center items-center mt-8">
              <button
                type="submit"
                className="w-full rounded-md py-2.5 px-4 border text-sm  text-gray-800 tracking-[0.01rem] bg-[#c78290]/75"
              >
                {isEdit ? `Update` : `Add doctor`}
              </button>
              <button
                onClick={handleReset}
                type="reset"
                className="w-full rounded-md py-2.5 px-4 mt-3 border text-sm bg-gray-100 text-gray-600 tracking-[0.01rem]"
              >
                Reset all fields
              </button>
            </div>

            {/* -- REQUIRED FIELDS -- */}
            <p className="italic mt-14 text-sm text-stone-600 mb-[7rem]">
              * required fields
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
