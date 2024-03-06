// import React from "react";
import { Main, PageTitle } from "../components/CommonUI.tsx";
import ProfileCard from "../components/Profile/ProfileCard.tsx";

export default function ProfilePage() {
  return (
    <>
      <Main>
        <PageTitle>Profile</PageTitle>
        <ProfileCard />
      </Main>
    </>
  );
}
