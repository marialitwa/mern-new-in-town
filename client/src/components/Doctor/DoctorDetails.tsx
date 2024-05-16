import styled from "styled-components";
import { Doctor } from "../../@types/doctors";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/baseUrl.ts";

type Props = {
  doctor: Doctor;
};

export default function DoctorDetails({ doctor }: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([doctor]);

  const navigate = useNavigate();

  function handleEdit(getCurrentDoctor: Doctor) {
    // console.log(getCurrentDoctor);

    navigate("/form", { state: { getCurrentDoctor } });
  }

  async function handleDeleteCard(getCurrentId: string) {
    // console.log("CURRENT ID", getCurrentId);

    // For Authorization to use this function: 1.st get the token from local storage
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const body = new URLSearchParams();
    body.append("id", getCurrentId);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/doctors/delete`,
        requestOptions
      );

      if (response.ok) {
        console.log("Card deleted successfully");

        const result = await response.json();

        console.log("result", result);
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== getCurrentId)
        );
        // (prevDoctors) => ... : Funktion, die den vorherigen Zustand prevDoctors als Argument nimmt.
        // Der vorherige Zustand ist das vorherige Array von Ärzten, das durch doctors repräsentiert wird.
        // prevDoctors.filter((doctor) => doctor._id !== getCurrentId): prevDoctors wird gefiltert und erstellt ein neues Array,
        // das nur die Elemente enthält, für die die Bedingung   "doctor._id !== getCurrentId" wahr ist.
        // doctor._id !== getCurrentId: diese Bedingung überprüft, ob die id des aktuellen Arztes NICHT mit der übergebenen Id
        // "getCurrentId" übereinstimmt. Heißt: Wenn die Id's übereinstimmen, wird das Element/der Arzt gelöscht, wenn nicht
        // wird das Element im neuen Array behalten.
        alert(
          "This Card is deleted now. You will be redirected to your doctors list."
        );
        navigate("/doctors");
      } else {
        console.log("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card", error);
    }
  }

  return (
    <>
      <CardContainer>
        {doctors.map((doctor) => (
          <Card key={doctor._id}>
            <IconsContainer>
              <FaEdit onClick={() => handleEdit(doctor)} size={20} />
              <FaTrash onClick={() => handleDeleteCard(doctor._id)} size={20} />
            </IconsContainer>
            <p>{doctor.name}</p>
            <p>{doctor.medical_specialty}</p>
            <p>{doctor.city_district}</p>
            {/* <p>{doctor.medical_practice}</p> */}
            <p>{doctor.address}</p>
            <p>{doctor.phone_number}</p>
            <p>{doctor.website}</p>
            <p>{doctor.notes}</p>
          </Card>
        ))}
      </CardContainer>
    </>
  );
}
// STYLING

const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
  margin-top: 0;
`;

const CardContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  margin-top: 6em;
  padding: 1.5em 2em 2em;

  //glass effect
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;
