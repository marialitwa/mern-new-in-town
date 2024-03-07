// import React from "react";
import { Doctor } from "../@types/doctors.ts";
import { useEffect, useState } from "react";
import DoctorCard from "../components/Doctor/DoctorCard.tsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import FormModal from "../components/FormModal.tsx";

const apiUrl = "http://localhost:5000/api/doctors/all";

export default function DoctorsPage() {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/form");
  }

  const fetchAllDoctors = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      // console.log("RESPONSE", response);

      if (!response.ok) {
        throw new Error("Network response is not ok");
      }

      const data = await response.json();
      // console.log("DATA", data.allDoctors);

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
      <Main>
        <HeadingContainer>
          <h1 className="text-3xl font-semibold">My New Doctors.</h1>
        </HeadingContainer>
        {/* <ButtonContainerTop>
          <ButtonTop onClick={handleClick}>+</ButtonTop>
        </ButtonContainerTop> */}

        <div>
          {allDoctors.map((doctor) => {
            return <DoctorCard key={doctor._id} doctor={doctor} />;
          })}
        </div>
        <ButtonBottom onClick={handleClick}>+</ButtonBottom>
      </Main>
    </>
  );
}

// STYLING

const Main = styled.main`
  margin-bottom: 8em;
`;

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

// const ButtonContainerTop = styled.div`
//   display: flex;
//   margin-top: -3em;
//   z-index: 1;
//   _border: 2px solid hotpink;
// `;

// const ButtonTop = styled.button`
//   margin: 0 auto;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   background-color: olive;
// `;

const ButtonBottom = styled.button`
  position: fixed;
  bottom: 47px;
  _top: 140px;
  right: 43.5%;
  font-size: 2rem;
  line-height: 0;
  background-color: olive;
  z-index: 100;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
`;
