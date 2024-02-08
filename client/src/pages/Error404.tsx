import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Error Page 404</h1>
      <Button onClick={() => navigate("/", { replace: true })}>
        Go to Homepage
      </Button>
    </>
  );
}

// STYLING

const Button = styled.button`
  padding: 0.5em 0.8em;
  border: 1px solid black;
  background-color: whitesmoke;
`;
