// import React from 'react'
import styled from "styled-components";
import { Doctor } from "../@types/doctors";
import { useNavigate } from "react-router-dom";

type Props = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: Props) {
  const navigate = useNavigate();

  function handleClick() {
    const id = doctor._id;
    // console.log("Button clicked");
    navigate(`/doctors/${id}`, {
      state: { name: doctor.name },
    });
  }

  return (
    <>
      <CardContainer>
        <p>{doctor.name}</p>
        <p>{doctor.medical_specialty}</p>
        <p>{doctor.city_district}</p>
        <Button onClick={handleClick}>Show more</Button>
      </CardContainer>
    </>
  );
}

// STYLING

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em 1em 1em 3em;
  margin: 1em 2em;

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

const Button = styled.button`
  margin-top: 1em;
  margin-bottom: 0.5em;
  padding: 0.3em;
  border-radius: 0.4em;
  width: 50%;
  background-color: lightpink;
  background-color: plum;
`;
