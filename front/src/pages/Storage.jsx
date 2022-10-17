import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Storage() {
  const navigate = useNavigate();

  const goToMyStorage = () => {
    navigate("/my-storage");
  };

  const goToNewUpload = () => {
    navigate("/upload");
  };

  return (
    <>
      <Container>
        <div className="main">
          <button onClick={goToMyStorage}>MY STORAGE</button>
          <button onClick={goToNewUpload}>UPLOAD NEW FILE(S)</button>
        </div>
      </Container>
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
  .main {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  button {
    margin-top: 10px;
    border: 1px solid #ffffff;
    font-size: 20px;
    font-weight: bold;
    padding: 0.5rem;
    border-radius: 0.3rem;
    width: 20rem;
    height: 7rem;
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
