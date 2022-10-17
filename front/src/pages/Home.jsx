import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
export default function Login() {
  const navigate = useNavigate();
  const getStarted = () => {
    navigate("/register");
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  return (
    <>
      <Container>
        <div className="home">
          <h2>
            {" "}
            A simple place to share with anyone, for free and without limits.
          </h2>
          <div className="infos">
            <h3>
              <span className="number">1</span>Share your files with others
              people, without pay anything.
            </h3>
            <h3>
              <span className="number">2</span>Enjoy vidéos and share your
              screens in real time with your friends.
            </h3>
            <h3>
              <span className="number">3</span>Chat, call and share anything in
              the Social Hub.
            </h3>
          </div>
          <button type="submit" onClick={() => getStarted()}>
            GET STARTED
          </button>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #14143b;

  .number {
    background-color: #263b75;
    padding: 1rem 1.5rem;
    border-radius: 50% 20% / 10% 40%;
    border: 2px solid white;
    margin: 2rem;
    font-weight: 800;
  }
  .infos {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    justify-content: center;
  }
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5rem;
    color: white;
  }
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  button {
    margin-top: 10px;
    border: 1px solid #ffffff;

    font-weight: bold;
    padding: 0.5rem;
    border-radius: 0.3rem;
    width: 15rem;

    height: 3.5rem;
    background-color: #263b75;
    color: white;
    transition: 0.4s;
    &:hover {
      cursor: pointer;
      transition: 0.4s;
      background-color: #916aec;
    }
  }
`;
