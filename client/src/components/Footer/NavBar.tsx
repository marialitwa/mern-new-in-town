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

  const { user, logout, isLoading } = useContext(AuthContext);
  // console.log("%c user navbar", "color:red", user);
  // console.log("isLoading", isLoading);

  return (
    <footer>
      <Navigation>
        <LinkStyled to={"/"} isActive={location.pathname === "/"}>
          Home
        </LinkStyled>
        {/* REVIEW: Empty element instead of text is loading? */}
        {isLoading ? (
          <p>...is loading...</p>
        ) : user ? (
          <>
            <button onClick={logout}>Logout</button>
            <LinkStyled
              to={"/profile"}
              isActive={location.pathname === "/profile"}
            >
              Profile
            </LinkStyled>
          </>
        ) : (
          <LinkStyled to={"/auth"} isActive={location.pathname === "/auth"}>
            Register & Login
          </LinkStyled>
        )}
        {/* {user ? <p>{user.email}</p> : <p>No user logged in</p>} */}
        {/* <LinkStyled to={"/profile"} isActive={location.pathname === "/profile"}>
          Profile
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
  background-color: #eee;

  @media (min-width: 440px) {
    justify-content: center;
    gap: 3rem;
  }

  @media (min-width: 640px) {
    justify-content: center;
    gap: 8rem;
    top: 0;
    height: 3rem;
    padding: 1.5rem 0;
  }

  @media (min-width: 1024px) {
    justify-content: center;
    gap: 8rem;
  }
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
      color: #c78290;
      font-weight: bold;
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      color: #6d6875;
    `}
`;
