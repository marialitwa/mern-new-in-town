// import React from 'react'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Doctor } from "../@types/doctors";
import DoctorDetails from "../components/DoctorDetails";

const apiUrl = "http://localhost:5000/api/doctors";

export default function DoctorDetailsPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const { id } = useParams();
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
  }, [id]);

  return <>{doctor && <DoctorDetails doctor={doctor} />}</>;
}
