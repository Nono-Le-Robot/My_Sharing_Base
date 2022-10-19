import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Container>
      <div className="test">
        <div className="header">
          <Link className="logo-link" to="/">
            <div className="logo-header">
              <img src={Logo} alt="" />
              <h1>My Sharing Base</h1>
            </div>
          </Link>
          <nav>
            <Link className="link" to="/storage">
              Storage
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
  width: 100vw;
  height: 10vh;
  background-color: #9290ff;

  .header {
    height: 10vh;
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
  .logo-link {
    text-decoration: none;
    color: white;
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
