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
  signup: (userName: string, email: string, password: string) => Promise<void>;
  // Promise<void>: signup-Funktion ist asynchrone Operation
  // void gibt erstmal keinen spezifischen Datenwert zurück
  // Häufige Verwendung bei asynchronen Funktionen, die einfach
  // eine Bestätigung für den Abschluss einer Aktion zurückgeben.
  // In dem Fall, ob die Registrierung erfolgreich war oder nicht
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (values: {
    // email: string;
    userName: string | undefined;
  }) => Promise<void>;
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
  updateUser: () => {
    throw new Error("No Provider");
  },
  isLoading: false,
};

export const AuthContext = createContext(defaultValue);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  async function signup(userName: string, email: string, password: string) {
    if (!email || !password) return alert("Please fill out all fields");

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);
    body.append("userName", userName);

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
        alert(
          "Welcome! You are now registered with our wonderful app. Please LOGIN now."
        );
        navigate("/auth");
      } else {
        const result = (await response.json()) as ResponseNotOk;
        // console.log(result);
        alert(`${result.error}`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  async function login(email: string, password: string) {
    // console.log("email, password", email, password);
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

      // console.log("response", response);
      if (!response.ok) {
        // TODO Handle response NOT ok comes here
        // console.log("Response not ok", response);
        const result = await response.json();
        console.log("Result", result);
      }

      if (response.ok) {
        const result = (await response.json()) as LoginResponse;
        // console.log("result", result);
        if (result.data.token) {
          // Store token in Local Storage
          localStorage.setItem("token", result.data.token);
          setUser(result.data.user);
          setIsLoading(false);
          alert("You are now logged in");
          navigate("/");
        }
      } else {
        const result = (await response.json()) as ResponseNotOk;
        console.log("not ok login", result);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  const apiUrl = `${baseUrl}/api/users/profile`;

  async function checkUserStatus() {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
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
        console.log("response", response);

        if (!response.ok) {
          throw new Error("Network response is not ok");
        }

        if (response.ok) {
          const result = await response.json();
          console.log("result", result);
          setUser(result.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }

      //if we find the user we setUser(result)
    } else {
      console.log("User is logged out/No user");
    }
    // TODO Write a request to backend to get user information back when we refresh the page
  }

  async function updateUser(values: {
    // email: string;
    userName: string | undefined;
  }) {
    console.log("values", values);
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!user) {
      console.log("no user");
      return;
    }

    if (!token) alert("you need to login first");
    if (values.userName === "") {
      alert("no empty username");
      return;
    }
    if (values.userName !== "") {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      // const bodyValues = JSON.stringify(values);

      const body = new URLSearchParams();
      // body.append("values", bodyValues);
      // body.append("email", values.email);
      body.append("userName", values.userName!);

      // body.append("userName", values.userName ? values.userName : "");

      const requestOptions = {
        method: "POST",
        headers,
        body,
      };

      try {
        const response = await fetch(
          `${baseUrl}/api/users/update/${user._id}`,
          requestOptions
        );

        if (response.ok) {
          const data = (await response.json()) as User;
          setUser(data);
        } else {
          const data = (await response.json()) as ResponseNotOk;
          console.log("data", data);
          // console.log(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function logout() {
    console.log("%c useEffect run", "color: orange");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoading(false);
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
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
