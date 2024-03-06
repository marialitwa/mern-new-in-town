// import React from 'react'

import { useState } from "react";
import { User } from "../../@types/users";
// import { Button } from "../CommonUI.tsx";

type APIResponse<T> = {
  message: string;
  error: boolean;
  data: T;
};

export default function ProfileCard() {
  const [userProfile, setUserProfile] = useState<User>({} as User);

  async function getProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first");
    }

    if (token) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          requestOptions
        );

        if (response.ok) {
          const result = (await response.json()) as APIResponse<User>;
          console.log(result);
          setUserProfile(result.data);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  }

  return (
    <>
      {/* <h1>User Info</h1> */}
      <button onClick={() => void getProfile()}>Get Profile</button>

      {userProfile && (
        <div>
          {/* <h3>User Info</h3> */}
          {/* <p>Username: {userProfile.username}</p> */}
          <p>User email: {userProfile.email}</p>
          {/* <img src={userProfile.userimage} alt={userProfile.username} style={{width: 150px}} /> */}
        </div>
      )}
    </>
  );
}
