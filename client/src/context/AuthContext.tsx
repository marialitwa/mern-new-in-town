import { PropsWithChildren, createContext, useState } from "react";
import { User } from "../@types/users.ts";
import { ResponseNotOk } from "../@types";

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string) => Promise<void>;
  // Promise<void>: signup-Funktion ist asynchrone Operation
  // void gibt erstmal keinen spezifischen Datenwert zurück
  // Häufige Verwendung bei asynchronen Funktionen, die einfach
  // eine Bestätigung für den Abschluss einer Aktion zurückgeben.
  // In dem Fall, ob die Registrierung erfolgreich war oder nicht
  loading: boolean;
}

const defaultValue: AuthContextType = {
  user: null,
  signup: () => {
    throw new Error("No Provider");
  },
  loading: false,
};

export const AuthContext = createContext(defaultValue);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function signup(email: string, password: string) {
    if (!email || !password) return alert("Please fill out all fields");

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );

      if (response.ok) {
        const result = (await response.json()) as User;
        setUser(result);
      } else {
        const result = (await response.json()) as ResponseNotOk;
        console.log(result);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}