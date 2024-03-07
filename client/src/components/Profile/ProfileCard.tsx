import { useEffect, useState } from "react";
import { User } from "../../@types/users";
import styled from "styled-components";

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

  // useEffect gets the requested data from server when component is rendered,
  // empty dependency array causes only on the first render of component
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {userProfile && (
        <div>
          {/* <p>Username: {userProfile.username}</p> */}
          <Text>{userProfile.email}</Text>
          {/* <img src={userProfile.userimage} alt={userProfile.username} style={{width: 150px}} /> */}
        </div>
      )}
    </>
  );
}

// STYLING

const Text = styled.p`
  margin-top: 4em;
`;
