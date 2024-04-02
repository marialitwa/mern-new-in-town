import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { User } from "../@types/users.ts";
import { ResponseNotOk } from "../@types";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/baseUrl.ts";

type LoginDataType = {
  user: User;
  token: string;
};

type LoginResponse = {
  message: string;
  error: boolean;
  data: LoginDataType;
};

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string) => Promise<void>;
  // Promise<void>: signup-Funktion ist asynchrone Operation
  // void gibt erstmal keinen spezifischen Datenwert zurück
  // Häufige Verwendung bei asynchronen Funktionen, die einfach
  // eine Bestätigung für den Abschluss einer Aktion zurückgeben.
  // In dem Fall, ob die Registrierung erfolgreich war oder nicht
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const defaultValue: AuthContextType = {
  user: null,
  signup: () => {
    throw new Error("No Provider");
  },
  login: () => {
    throw new Error("No Provider");
  },
  logout: () => {
    throw new Error("No Provider");
  },
  isLoading: false,
};

export const AuthContext = createContext(defaultValue);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  async function signup(email: string, password: string) {
    if (!email || !password) return alert("Please fill out all fields");

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/signup`,
        requestOptions
      );

      if (response.ok) {
        const result = (await response.json()) as User;
        setUser(result);
        alert("Welcome! You are now registered with our wonderful app.");
        navigate("/auth");
      } else {
        const result = (await response.json()) as ResponseNotOk;
        console.log(result);
        alert(`${result.error}`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  async function login(email: string, password: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/login`,
        requestOptions
      );

      if (!response.ok) {
        // TODO Handle response NOT ok here
        console.log("Response not ok", response);
        const result = await response.json();
        console.log("Result", result);
      }

      if (response.ok) {
        const result = (await response.json()) as LoginResponse;

        if (result.data.token) {
          // Store token in Local Storage
          localStorage.setItem("token", result.data.token);
          setUser(result.data.user);
          alert("You are now logged in");
          navigate("/");
        }
      } else {
        const result = (await response.json()) as ResponseNotOk;
        console.log(result);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  const apiUrl = `${baseUrl}/api/users/profile`;

  async function checkUserStatus() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first");
    }

    if (token) {
      // console.log("User is logged in");
      //fetch to the server to endpint "getUser" (sending ONLY the token)
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      try {
        const response = await fetch(`${apiUrl}`, requestOptions);
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response is not ok");
        }

        if (response.ok) {
          const result = await response.json();
          setUser(result.data.email);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error", error);
      }

      //if we find the user we setUser(result)
    } else {
      console.log("User is logged out/No user");
    }
    // TODO Write a request to backend to get user information back when we refresh the page
  }

  function logout() {
    console.log("%c useEffect run", "color: orange");
    localStorage.removeItem("token");
    setUser(null);
    alert("You are logged out successfully.");
    navigate("/");
  }

  useEffect(() => {
    checkUserStatus();
  }, [user?.email]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
