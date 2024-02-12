// // import React from 'react'

import { Doctor } from "../@types/doctors";

type Props = {
  doctor: Doctor;
};

export default function DoctorDetails({ doctor }: Props) {
  return (
    <>
      <div>DoctorDetails</div>
      <p>{doctor.name}</p>
    </>
  );
}
