// import React from 'react'
import { Doctor } from "../@types/doctors.ts";
import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";

// type Props = {}

export default function DoctorsPage() {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  // FETCH FUNCTION FOR ALL DOCTORS FROM MONGO DB
  const fetchAllDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors/all");
      console.log(response);

      if (!response.ok) {
        throw new Error("Network response is not ok");
      }

      const data = await response.json();
      console.log("data", data.allDoctors);

      const foundDoctors = data.allDoctors as Doctor[];
      // console.log(foundDoctors.allDoctors[0].name);

      setAllDoctors(foundDoctors);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    // fetchCollectionNames();
    fetchAllDoctors();
  }, []);

  return (
    <>
      <h1>My New Doctors.</h1>
      <DoctorCard />

      <div>
        {allDoctors.map((doctor) => (
          <div key={doctor._id}>
            <p>{doctor.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
