// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Doctor } from "../@types/doctors";
import DoctorDetails from "../components/Doctor/DoctorDetails";
import baseUrl from "../utils/baseUrl.ts";
import {
  BtnNavigateBackContainer,
  BtnNavigateBack,
} from "../components/CommonUI.tsx";

const apiUrl = `${baseUrl}/api/doctors`;

export default function DoctorDetailsPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log("ID", id);

  async function fetchData() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No TOKEN in Doctors");
      return;
    }

    if (token) {
      // TODO loading spinner here:
      // setIsloading(true)
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      try {
        const response = await fetch(`${apiUrl}/${id}`, requestOptions);
        const data = await response.json();
        // console.log(data);

        if (response.ok) {
          setDoctor(data);
          // TODO loading spinner here:
          // setIsloading(false)
        } else {
          console.error("Bad response");
        }
      } catch (error) {
        console.error("An error occurred");
      }
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // TODO loading spinner here
  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <BtnNavigateBackContainer>
        <BtnNavigateBack onClick={() => navigate(-1)}>Back</BtnNavigateBack>
      </BtnNavigateBackContainer>
      {doctor && <DoctorDetails doctor={doctor} />}
    </>
  );
}
