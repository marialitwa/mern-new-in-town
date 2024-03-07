import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

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
  // console.log("location>>>>", location);

  async function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) {
    event.preventDefault();

    if (!inputValues.name) return alert("Name must be included.");

    // RESEARCH WHY FORM TRIM DOES NOT WORK
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
    // console.log("token", token);

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    try {
      const response = isEdit
        ? await fetch(
            `http://localhost:5000/api/doctors/update`,

            {
              method: "PUT",
              headers: headers,
              body: body,
            }
          )
        : await fetch("http://localhost:5000/api/doctors/new-entry", {
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
    console.log(location);

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
        {/* DOCTOR FORM ============================== */}
        <ButtonContainer>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </ButtonContainer>
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col m-10">
            <legend className="text-center font-light text-xl">
              {isEdit ? `Edit details.` : `Add a new doctor.`}
            </legend>
            {/* NAME  =============== */}
            <label htmlFor="name" className="text-stone-700 text-base mt-8">
              Name*
            </label>
            <input
              type="text"
              // name property needs to be corresponding to model/database object-key naming!
              name="name"
              id="name"
              onChange={handleInputChange}
              value={inputValues.name}
              placeholder="Dr. Anne Ärztin"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
              required
            />

            {/* MEDICAL SPECIALTY  =============== */}
            <label
              htmlFor="medical_specialty"
              className="text-stone-700 text-base"
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
              placeholder="Orthopädin"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* MEDICAL PRACTICE  =============== */}
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
          /> */}

            {/* CITY DISTRICT  =============== */}
            <label htmlFor="city_district" className="text-stone-700 text-base">
              City District
            </label>
            <input
              type="text"
              name="city_district"
              id="city_district"
              onChange={handleInputChange}
              value={inputValues.city_district}
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
              onChange={handleInputChange}
              value={inputValues.address}
              placeholder="Straße usw."
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* PHONE NUMBER  =============== */}

            <label htmlFor="phone_number" className="text-stone-700 text-base">
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
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* WEBSITE  =============== */}

            <label htmlFor="url" className="text-stone-700 text-base">
              Website
            </label>
            <input
              type="url"
              name="website"
              id="url"
              onChange={handleInputChange}
              value={inputValues.website}
              placeholder="www.arztpraxis.berlin"
              className="w-auto rounded-md py-2.5 px-4 border text-sm outline-[#007bff] mb-5"
            />

            {/* UPADTE MODEL in server */}
            {/* TEXTFIELD FOR NOTES  =============== */}
            <label htmlFor="notes" className="text-stone-700 text-base">
              Notes
            </label>
            <textarea
              name="notes"
              id="notes"
              onChange={handleInputChange}
              value={inputValues.notes}
              placeholder="Write your personal notes here ..."
              className="w-auto rounded-md py-2.5 px-4 mb-3 border text-sm outline-[#007bff]"
            ></textarea>
            {/* INFOTEXT: Required fields =========== */}
            <p className="italic mt-2 text-sm text-stone-600">
              * required fields
            </p>
          </fieldset>

          <div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              className="w-1/2 rounded-md py-2.5 px-4 mt-8 border text-sm  bg-gray-800 text-gray-50"
            >
              {isEdit ? `Update` : `Add doctor`}
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
        </form>
      </div>
    </>
  );
}

// STYLING

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.button`
  margin: 1em;
  background-color: whitesmoke;
  padding: 1em;
  font-size: 1em;
  border-radius: 1em;
  line-height: 0;
  text-align: center;
`;
