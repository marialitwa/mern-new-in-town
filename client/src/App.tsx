// import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/Footer/NavBar";
// import baseUrl from "./utils/baseUrl.ts";

export default function App() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 flex flex-col items-center text-gray-900">
        <h1 className="mt-16 text-4xl font-semibold">New in Town.</h1>
        <p className="mt-7 mx-5 text-center">
          Collect all new favorite spots in one app to discover the place you
          have moved to.
        </p>

        <LinkContainer>
          <LinkStyled to={"/doctors"}>Doctors</LinkStyled>
          <LinkStyled to={"/foods"}>Cafés & Restaurants</LinkStyled>
          <LinkStyled to={"sports-yoga"}>Sports & Yoga</LinkStyled>
          <LinkStyled to={"/cultural"}>Cultural</LinkStyled>
          <LinkStyled to={"/trips"}>Trips</LinkStyled>
          <LinkStyled to={"beauty-wellness"}>Beauty & Wellness</LinkStyled>
        </LinkContainer>
        {/* <ul>
          {collectionNames.map((collection, index) => (
            <li key={index}>{collection}</li>
          ))}
        </ul> */}
        <NavBar />
      </main>
    </>
  );
}

// STYLING

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 2.3em auto 0;
`;

const LinkStyled = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em;
  padding: 2em;
  border: none;
  text-decoration: none;
  width: 150px;
  height: 100px;
  font-size: 1rem;
  font-weight: 400;

  //glass effect
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;
