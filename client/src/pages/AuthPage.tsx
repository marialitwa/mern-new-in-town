import { useState } from "react";
import { RegisterForm } from "../components/Auth/RegisterForm.tsx";
import { Main } from "../components/CommonUI.tsx";
import { LoginForm } from "../components/Auth/LoginForm.tsx";

export function AuthPage() {
  // state um LoginForm oder RegisterForm anzuzeigen
  const [showRegisterForm, setShowRegisterForm] = useState(true);

  return (
    <Main>
      {showRegisterForm ? <RegisterForm /> : <LoginForm />}

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
    </Main>
  );
}
