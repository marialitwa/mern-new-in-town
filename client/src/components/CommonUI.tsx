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
  margin-top: 2rem;
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

// LOGIN & REGISTER FORMS

const FormHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center:
  justify-content: center;
  margin: 0 1.5em;
  text-align: center;
`;

const FormInstructionText = styled.p`
  margin-top: 1em;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 0 4em;
  margin-top: 1em;
`;

// -- NAVIGATION BUTTONS --

const BtnNavigateBackContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const BtnNavigateBack = styled.button`
  margin: 0.75rem;
  background-color: whitesmoke;
  padding: 1rem;
  font-size: 0.9rem;
  border-radius: 0.9rem;
  line-height: 0;
  display: flex;
  justify-content: center;
  align-itens: center;
`;

export {
  Main,
  PageTitle,
  Button,
  AuthForm,
  FormHeader,
  FormInstructionText,
  BtnNavigateBackContainer,
  BtnNavigateBack,
};
