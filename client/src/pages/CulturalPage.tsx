import { useNavigate } from "react-router-dom";
import { Main, PageTitle, Button } from "../components/CommonUI.tsx";

export default function CulturalPage() {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <PageTitle>Cultural Page</PageTitle>
        <Button onClick={() => navigate("/", { replace: true })}>
          Homepage
        </Button>
      </Main>
    </>
  );
}
