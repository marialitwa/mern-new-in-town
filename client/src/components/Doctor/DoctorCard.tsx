import styled from "styled-components";
import { Doctor } from "../../@types/doctors";
import { useNavigate } from "react-router-dom";

type Props = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: Props) {
  const navigate = useNavigate();

  function handleClick() {
    const id = doctor._id;
    navigate(`/doctors/${id}`, {
      state: { name: doctor.name },
    });
  }

  return (
    <>
      <main className="flex justify-center">
        <CardContainer>
          <div className="text-left">
            <p>{doctor.name}</p>
            <p>{doctor.medical_specialty}</p>
            <p>{doctor.city_district}</p>
          </div>
          <div className="flex justify-center items-center">
            <Button onClick={handleClick}>Details</Button>
          </div>
        </CardContainer>
      </main>
    </>
  );
}

// STYLING

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5em 2.5em;
  margin: 1em 2.5em;
  min-width: 256px;
  width: 33%;
  max-width: 400px;

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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  padding: 0.65em 0.3em;
  border-radius: 0.4em;
  width: 100%;
  background-color: rgba(239, 222, 224, 0.5);
  font-size: 0.9rem;
  color: #44403c;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-size: 0.9rem;
`;
