import { useNavigate } from "react-router-dom";
import { Main, PageTitle, Button } from "../components/CommonUI.tsx";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <>
      <Main>
        <PageTitle>Error 404</PageTitle>
        <Button onClick={() => navigate("/", { replace: true })}>
          Homepage
        </Button>
      </Main>
    </>
  );
}
