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
  margin-top: 10rem;
`;

const PageTitleAuth = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;

  @media (min-width: 640px) {
    margin-top: 4.5rem;
  }
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
  padding: 0 4em;
  width: 100%;

  @media (min-width: 440px) {
    min-width: 19.5rem;
    max-width: 33rem;
  }
`;

// -- NAVIGATION BUTTONS --

const BtnNavigateBackContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const BtnNavigateBack = styled.button`
  margin: 0.75rem;
  background-color: rgba(199, 130, 144, 0.3);
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
  PageTitleAuth,
  Button,
  AuthForm,
  FormHeader,
  FormInstructionText,
  BtnNavigateBackContainer,
  BtnNavigateBack,
};
