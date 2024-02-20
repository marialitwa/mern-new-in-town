// // import React from 'react'

import styled from "styled-components";
import { Doctor } from "../@types/doctors";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  doctor: Doctor;
};

export default function DoctorDetails({ doctor }: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([doctor]);

  const navigate = useNavigate();

  async function handleDeleteCard(getCurrentId: string) {
    // console.log("CURRENT ID", getCurrentId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/delete/${getCurrentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Card deleted successfully");
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== getCurrentId)
        );
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
            <p>{doctor.name}</p>
            <p>{doctor.medical_specialty}</p>
            <p>{doctor.city_district}</p>
            {/* <p>{doctor.medical_practice}</p> */}
            <p>{doctor.address}</p>
            <p>{doctor.phone_number}</p>
            <p>{doctor.website}</p>
            <div>
              <FaTrash onClick={() => handleDeleteCard(doctor._id)} size={20} />
            </div>
          </Card>
        ))}
      </CardContainer>
    </>
  );
}

// STYLING

const CardContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  margin-top: 6em;
  padding: 2em;

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
