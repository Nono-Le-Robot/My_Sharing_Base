import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function HeaderLogged() {
  const [isLogged, setIsLogged] = useState(false);
  const token = localStorage.getItem("iat");

  return (
    <Container>
      <div className="test">
        <div className="header">
          <Link className="logo-link" to="/">
            <div className="logo-header">
              <img src={Logo} alt="" />
              <h1 id="main-title">My Sharing Base</h1>
            </div>
          </Link>
          <nav>
            <Link className="link" to="/storage">
              Storage
            </Link>
            <Link
              onClick={() => {
                localStorage.removeItem("iat");
                window.location.href = "login";
              }}
              className="link"
              to="/login"
            >
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  * {
    user-select: none;
  }
  width: 100vw;
  height: 10vh;
  background-color: #14143b;

  .header {
    height: 10h;
    gap: 1.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    align-items: center;
    background-image: linear-gradient(45deg, #00aeff, #a086ff);
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
  @media screen and (max-width: 768px) {
    #main-title {
      display: none;
    }
  }
`;
