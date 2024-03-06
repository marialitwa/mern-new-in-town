import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { AuthContext } from "../../context/AuthContext";

interface LinkProps {
  isActive: boolean;
}

export default function NavBar() {
  const location = useLocation();
  //   console.log("LOCATION", location.pathname);

  const { user, logout } = useContext(AuthContext);

  return (
    <footer>
      <Navigation>
        <LinkStyled to={"/"} isActive={location.pathname === "/"}>
          Home
        </LinkStyled>

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <LinkStyled to={"/auth"} isActive={location.pathname === "/auth"}>
            Register & Login
          </LinkStyled>
        )}
        {/* {user ? <p>{user.email}</p> : <p>No user logged in</p>} */}
        {/* <LinkStyled to={"#"} isActive={location.pathname === "/account"}>
          Account
        </LinkStyled> */}
      </Navigation>
    </footer>
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
