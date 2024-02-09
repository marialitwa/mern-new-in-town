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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #eee;
`;

// ${({ isActive }) => isActive && css...} => "Tagged Template Literal"
// Wird verwendet, um dynamisch CSS-Stile basierend auf den Props zu generieren.
// Überprüft, ob der Prop isActive wahr ist.

const LinkStyled = styled(Link)<LinkProps>`
  _border: 1px solid green;
  padding: 1em 2em;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #b5838d;
      text-decoration: none;
      font-weight: bold;
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      color: #6d6875;
      text-decoration: none;
    `}
`;
