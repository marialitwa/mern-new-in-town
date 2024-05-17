import { MouseEvent, useContext, useEffect, useState } from "react";
import { User } from "../../@types/users";
import styled from "styled-components";
import baseUrl from "../../utils/baseUrl.ts";
import { AuthContext } from "../../context/AuthContext.tsx";

type APIResponse<T> = {
  message: string;
  error: boolean;
  data: T;
};

export default function ProfileCard() {
  const { user, updateUser } = useContext(AuthContext);
  // console.log("user", user);
  const [userProfile, setUserProfile] = useState<User>({} as User);
  const [userName, setUserName] = useState(user?.userName || "");
  // const [email, setEmail] = useState(user ? user.email : "");

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    await updateUser({ userName });
  }

  async function getProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first (Message coming from getProfile)");
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
          `${baseUrl}/api/users/profile`,
          requestOptions
        );

        if (response.ok) {
          const result = (await response.json()) as APIResponse<User>;
          // console.log(result);
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

  // return (
  //   <>
  // {userProfile && (
  //   <div>
  //     <Text>User name: {userProfile.userName}</Text>
  //     <Text>{userProfile.email}</Text>
  //     {/* <img src={userProfile.userimage} alt={userProfile.userName} style={{width: 150px}} /> */}
  //   </div>
  // )}
  //   </>
  // );

  if (user)
    return (
      <>
        {userProfile && (
          <ProfileContainer>
            <Text>Your username: {user.userName}</Text>
            <Text>Your email: {user.email}</Text>
            {/* <img src={userProfile.userimage} alt={userProfile.userName} style={{width: 150px}} /> */}
          </ProfileContainer>
        )}

        <StyledText>You can update your profile here:</StyledText>

        <StyledForm>
          {/* <label htmlFor="email" aria-label="Your email"></label>
          <StyledInput
            type="email"
            value={email}
            name="email"
            id="email"
            placeholder={user.email}
            onChange={(event) => setEmail(event.target.value)}
          /> */}

          <label htmlFor="userName" aria-label="Your user name"></label>
          <StyledInput
            type="text"
            value={userName}
            id="userName"
            placeholder={user.userName ? user.userName : "Choose a user name"}
            onChange={(event) => setUserName(event.target.value)}
          />
          <StyledUpdateBtn type="submit" onClick={handleSubmit}>
            Update profile
          </StyledUpdateBtn>
        </StyledForm>
      </>
    );
}

// STYLING

const Text = styled.p`
  margin-top: 4em;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.p`
  margin-bottom: 0.5rem;
`;
const StyledInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 0.3rem;
  margin: 0.5rem;
`;

const StyledUpdateBtn = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.8);
  background: black;
  color: whitesmoke;
  border-radius: 0.3rem;
  margin-top: 0.5rem;
`;

const ProfileContainer = styled.div`
  margin-bottom: 3rem;
`;
