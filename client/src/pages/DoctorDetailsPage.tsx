// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Doctor } from "../@types/doctors";
import DoctorDetails from "../components/DoctorDetails";
import styled from "styled-components";

const apiUrl = "http://localhost:5000/api/doctors";

export default function DoctorDetailsPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id);

  async function fetchData() {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setDoctor(data);
      } else {
        console.error("Bad response");
      }
    } catch (error) {
      console.error("An error occurred");
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {doctor && <DoctorDetails doctor={doctor} />}
      <ButtonContainer>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </ButtonContainer>
    </>
  );
}

// STYLING

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin: 2em 0;
  width: 40%;
  background-color: whitesmoke;
  padding: 0.5em 0;
  border-radius: 1em;
`;
