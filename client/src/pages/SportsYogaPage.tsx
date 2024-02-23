import { useNavigate } from "react-router-dom";
import { Main, PageTitle, Button } from "../components/CommonUI.tsx";

export default function SportsYogaPage() {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <PageTitle>Sports & Yoga Page</PageTitle>
        <Button onClick={() => navigate("/", { replace: true })}>
          Homepage
        </Button>
      </Main>
    </>
  );
}
