import { useContext, useState } from "react";
import { RegisterForm } from "../components/AuthForms/RegisterForm.tsx";
import { Main } from "../components/CommonUI.tsx";
import { LoginForm } from "../components/AuthForms/LoginForm.tsx";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext.tsx";

export function AuthPage() {
  // state um LoginForm oder RegisterForm anzuzeigen, je nachdem
  const { user } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState(false);

  return (
    <Main>
      {loginForm ? <LoginForm /> : user ? <LoginForm /> : <RegisterForm />}

      {!loginForm ? (
        <Button onClick={() => setLoginForm(true)}>
          Already have an account?{" "}
          <span className="font-bold text-gray-900 underline decoration-2">
            Login
          </span>
        </Button>
      ) : (
        <Button onClick={() => setLoginForm(!setLoginForm)}>
          No account?{" "}
          <span className="font-bold text-gray-900 underline decoration-2">
            Create one
          </span>
        </Button>
      )}
    </Main>
  );
}

// STYING

const Button = styled.button`
  margin-bottom: 2rem;
`;
