import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Container>
      <div className="test">
        <div className="header">
          <div className="logo-header">
            <img src={Logo} alt="" srcset="" />
            <h1>My Sharing Base</h1>
          </div>
          <nav>
            <Link className="link" to="/">
              Home
            </Link>
            <Link className="link" to="/register">
              Register
            </Link>
            <Link className="link" to="/login">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100vw;
  .header {
    gap: 1.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    align-items: center;
    background-color: #9290ff;
  }
  .logo-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 0;
  }
  nav {
    display: flex;
    gap: 2rem;
    margin-right: 2rem;
    color: #080808;
    .link {
      text-decoration: none;
      color: #fffefe;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }
  img {
    position: relative;
    top: -5px;
    height: 4rem;
  }
  h1 {
    color: white;
    margin: 0;
    text-align: center;
  }
`;
