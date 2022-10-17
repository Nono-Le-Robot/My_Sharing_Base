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
          <h2>Add new file(s)</h2>
          <form className="upload-form" action="">
            <div className="upload-container">
              <input type="file" name="" id="" />
            </div>
            <button onClick={goToNewUpload}>UPLOAD NEW FILE(S)</button>
          </form>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6rem;
  }
  .upload-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }
  .upload-container {
    width: 30vw;
    height: 30vh;
    border: 5px dashed white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8ba4eb6d;
  }
  h2 {
    color: white;
    font-size: 4rem;
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
