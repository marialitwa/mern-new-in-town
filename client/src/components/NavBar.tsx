import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

interface LinkProps {
  isActive: boolean;
}

export default function NavBar() {
  const location = useLocation();
  //   console.log("LOCATION", location.pathname);

  return (
    <>
      <Navigation>
        <LinkStyled to={"/"} isActive={location.pathname === "/"}>
          Home
        </LinkStyled>
        <LinkStyled to={"#"} isActive={location.pathname === "/account"}>
          Account
        </LinkStyled>
      </Navigation>
    </>
  );
}

// CSS STYLING

const Navigation = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  width: 100%;
  _height: 60px;
  background-color: #eee;
`;

// ${({ isActive }) => isActive && css...} => "Tagged Template Literal"
// Wird verwendet, um dynamisch CSS-Stile basierend auf den Props zu generieren.
// Überprüft, ob der Prop isActive wahr ist.

const LinkStyled = styled(Link)<LinkProps>`
  text-decoration: none;
  padding: 1em 2em;

  ${({ isActive }) =>
    isActive &&
    css`
      color: palevioletred;
      font-weight: bold;
      _background-color: #e2d9d9;
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      color: #6d6875;
    `}
`;
