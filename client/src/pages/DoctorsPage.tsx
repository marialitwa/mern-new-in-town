import { Doctor } from "../@types/doctors.ts";
import { useEffect, useState } from "react";
import DoctorCard from "../components/Doctor/DoctorCard.tsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/baseUrl.ts";

const apiUrl = `${baseUrl}/api/doctors/all`;

export default function DoctorsPage() {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  const navigate = useNavigate();

  function handleClick() {
    const token = localStorage.getItem("token");

    if (!token) {
      // console.log("no token in doctors");
      alert(
        "Please login or register first. You are being navigated to the registration/login page now."
      );
      navigate("/auth");
    }

    if (token) {
      navigate("/form");
    }
  }

  async function fetchAllDoctors() {
    const token = localStorage.getItem("token");

    // if (!token) {
    //   alert(
    //     "Please login or register first. You are being navigated to the registration/login page now."
    //   );
    //   navigate("/auth");
    // }

    if (!token) {
      console.log("No TOKEN in Doctors");
      return;
    }

    if (token) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      try {
        const response = await fetch(`${apiUrl}`, requestOptions);
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response is not ok");
        }

        const data = await response.json();
        console.log("DATA", data.allDoctors);

        const foundDoctors = data.allDoctors as Doctor[];
        // console.log("FOUND DOCTORS", foundDoctors.allDoctors[0].name);

        setAllDoctors(foundDoctors);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  }

  useEffect(() => {
    // console.log("%c useEffect Run", "color: orange");
    fetchAllDoctors();
  }, []);

  return (
    <>
      <HeadingContainer>
        <h1 className="text-3xl font-semibold">My New Doctors.</h1>
        <button
          onClick={handleClick}
          className="z-[999] flex justify-center items-center absolute -bottom-6 left-1/2 -translate-x-1/2 h-[3.45rem] w-[3.45rem] rounded-full border border-white border-opacity-40
         bg-primary-btn bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] text-4xl font-light text-gray-900"
        >
          +
        </button>
      </HeadingContainer>
      <Main>
        <div>
          {allDoctors.length === 0 ? (
            <StyledText>Add a doctor by clicking the add button.</StyledText>
          ) : (
            allDoctors.map((doctor) => {
              return <DoctorCard key={doctor._id} doctor={doctor} />;
            })
          )}
        </div>
      </Main>
    </>
  );
}

// STYLING

const Main = styled.main`
  margin-bottom: 8em;
`;

const HeadingContainer = styled.header`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 2.5rem;
  background-color: #eee;
  position: relative;
`;

const StyledText = styled.p`
  text-align: center;
  margin: 2rem;
`;
