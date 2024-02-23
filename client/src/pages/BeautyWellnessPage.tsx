import { useNavigate } from "react-router-dom";
import { Main, PageTitle, Button } from "../components/CommonUI.tsx";

export default function BeautyWellnessPage() {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <PageTitle>Beauty & Wellness Page</PageTitle>
        <Button onClick={() => navigate("/", { replace: true })}>
          Homepage
        </Button>
      </Main>
    </>
  );
}
