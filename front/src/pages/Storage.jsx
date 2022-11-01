import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyStorage from "./MyStorage";
import Upload from "./Upload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Storage() {
  const navigate = useNavigate();
  const [newFile, setNewFile] = useState("");
  const [updateListOfFile, setUpdateListOfFile] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  function stateOfDetection(state) {
    setUpdateListOfFile(state);
  }

  return (
    <>
      <Container>
        <div className="main-storage">
          <div className="upload">
            <Upload newFileDetected={stateOfDetection} />
          </div>
          <div className="my-files">
            <MyStorage isNewFile={updateListOfFile} />
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
  background-color: #151544;
  .main-storage {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    overflow-y: scroll;
    border-left: 1px #1c3157 solid;
    width: 50%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 50vw;
    height: 90vh;
    ::-webkit-scrollbar {
      height: 0;
      width: 0.6rem;
      border-radius: 1rem;
    }
    ::-webkit-scrollbar-thumb {
      background-image: linear-gradient(45deg, #a086ff, #00aeff);
      border-radius: 1rem;
      transition: 1s;
    }
  }
  .upload {
    ::-webkit-scrollbar {
      width: 0.6rem;
      border-radius: 1rem;
    }
    ::-webkit-scrollbar-thumb {
      background-image: linear-gradient(45deg, #a086ff, #00aeff);
      border-radius: 1rem;
      transition: 1s;
    }
    border-right: 1px #1c3157 solid;
    overflow-y: scroll;
    width: 50%;
    height: 90vh;
    padding-bottom: 2rem;
  }
  .title {
    margin-top: 3rem;
    font-size: 2.4rem;
  }
`;
