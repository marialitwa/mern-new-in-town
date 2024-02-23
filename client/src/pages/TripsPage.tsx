import { useNavigate } from "react-router-dom";
import { Main, PageTitle, Button } from "../components/CommonUI.tsx";

export default function TripsPage() {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <PageTitle>Trips Page</PageTitle>
        <Button onClick={() => navigate("/", { replace: true })}>
          Homepage
        </Button>
      </Main>
    </>
  );
}
