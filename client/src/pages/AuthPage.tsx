import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { RegisterForm } from "../components/Auth/RegisterForm.tsx";
import { Main, Button } from "../components/CommonUI.tsx";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/Auth/LoginForm.tsx";

export function AuthPage() {
  const { signup } = useContext(AuthContext);
  // state um LoginForm oder RegisterForm anzuzeigen
  const [showRegisterForm, setShowRegisterForm] = useState(true);

  const navigate = useNavigate();

  return (
    <Main>
      {showRegisterForm ? <RegisterForm submit={signup} /> : <LoginForm />}

      <button onClick={() => setShowRegisterForm(!showRegisterForm)}>
        {showRegisterForm ? "Already have an account?" : "No account?"}{" "}
        <span className="font-bold text-green-700">
          {showRegisterForm ? "Login" : "Create one"}
        </span>
      </button>

      {/* Same code as above */}
      {/* {showRegisterForm ? (
        <button onClick={() => setShowRegisterForm(!showRegisterForm)}>
          Already have an account?{" "}
          <span className="font-bold text-green-700">Login here</span>
        </button>
      ) : (
        <button onClick={() => setShowRegisterForm(!showRegisterForm)}>
          No account?{" "}
          <span className="font-bold text-green-700">Create one</span>
        </button>
      )} */}
      <Button onClick={() => navigate("/", { replace: true })}>Homepage</Button>
    </Main>
  );
}
