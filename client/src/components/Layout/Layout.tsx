import React from "react";
import NavBar from "../Footer/NavBar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
}
