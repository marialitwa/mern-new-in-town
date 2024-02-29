import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { SignupForm } from "../components/Auth/SignupForm.tsx";
import { Main, PageTitle, Button } from "../components/CommonUI.tsx";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <Main>
      <PageTitle>Auth Page</PageTitle>
      <SignupForm submit={signup} />
      <Button onClick={() => navigate("/", { replace: true })}>Homepage</Button>
    </Main>
  );
}
