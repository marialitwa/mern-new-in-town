// // import React from 'react'

import styled from "styled-components";
import { Doctor } from "../@types/doctors";

type Props = {
  doctor: Doctor;
};

export default function DoctorDetails({ doctor }: Props) {
  return (
    <>
      <CardContainer>
        <Card>
          <p>{doctor.medical_specialty}</p>
          <p>{doctor.name}</p>
          <p>{doctor.city_district}</p>
          <p>{doctor.address}</p>
          <p>{doctor.phone_number}</p>
        </Card>
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
