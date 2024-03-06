import { useState } from "react";
import { RegisterForm } from "../components/AuthForms/RegisterForm.tsx";
import { Main } from "../components/CommonUI.tsx";
import { LoginForm } from "../components/AuthForms/LoginForm.tsx";
import styled from "styled-components";

export function AuthPage() {
  // state um LoginForm oder RegisterForm anzuzeigen
  const [showRegisterForm, setShowRegisterForm] = useState(true);

  return (
    <Main>
      {showRegisterForm ? <RegisterForm /> : <LoginForm />}

      {/* <Button onClick={() => setShowRegisterForm(!showRegisterForm)}>
        {showRegisterForm ? "Already have an account?" : "No account?"}{" "}
        <span className="font-bold text-green-700">
          {showRegisterForm ? "Login" : "Create one"}
        </span>
      </Button> */}

      {/* Same code as above */}
      {showRegisterForm ? (
        <Button onClick={() => setShowRegisterForm(!showRegisterForm)}>
          Already have an account?{" "}
          <span className="font-bold text-green-700">Login</span>
        </Button>
      ) : (
        <Button onClick={() => setShowRegisterForm(!showRegisterForm)}>
          No account?{" "}
          <span className="font-bold text-green-700">Create one</span>
        </Button>
      )}
    </Main>
  );
}

// STYING

const Button = styled.button`
  margin: 2em 0 10em;
`;
