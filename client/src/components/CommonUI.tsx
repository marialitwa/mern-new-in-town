import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-top: 2em;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.8em 2.5em;
  border: 1px solid black;
  border-radius: 2em;
  background-color: whitesmoke;
  width: 140px;
  margin-top: 4em;
`;

export { Main, PageTitle, Button };
