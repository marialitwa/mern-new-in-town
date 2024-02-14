// import React from "react";
import { Doctor } from "../@types/doctors.ts";
import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import styled from "styled-components";

const apiUrl = "http://localhost:5000/api/doctors/all";

export default function DoctorsPage() {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  const fetchAllDoctors = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      // console.log("RESPONSE", response);

      if (!response.ok) {
        throw new Error("Network response is not ok");
      }

      const data = await response.json();
      console.log("DATA", data.allDoctors);

      const foundDoctors = data.allDoctors as Doctor[];
      // console.log(foundDoctors.allDoctors[0].name);

      setAllDoctors(foundDoctors);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  return (
    <>
      <HeadingContainer>
        <h1 className="text-3xl font-semibold">My New Doctors.</h1>
      </HeadingContainer>

      <div>
        {allDoctors.map((doctor) => {
          return <DoctorCard key={doctor._id} doctor={doctor} />;
        })}
      </div>
      <ButtonContainer>
        <Button>+</Button>
      </ButtonContainer>
    </>
  );
}

// STYLING

const HeadingContainer = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin-bottom: 1.5em;
  background-color: #eee;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin: 0 auto;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: olive;
`;
