import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyStorage from "./MyStorage";
import Upload from "./Upload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Storage() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  const goToMyStorage = () => {
    navigate("/my-storage");
  };

  const goToNewUpload = () => {
    navigate("/upload");
  };

  return (
    <>
      <Container>
        <div className="main-storage">
          <div className="my-files">
            <MyStorage />
          </div>
          <div className="upload">
            <Upload />
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  /* overflow: hidden; */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #14143b;
  .main-storage {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
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
  .my-files {
    width: 50%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .my-files {
    width: 50vw;
    height: 90vh;
  }
  .upload {
    width: 50%;
    height: 90vh;
  }
  .title {
    margin-top: 3rem;
    font-size: 2.4rem;
  }
`;
