import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { uploadRoute } from "../utils/APIRoutes";

export default function Storage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [progress, setProgress] = useState(null);
  const inputRef = useRef(null);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  const detectedFile = (e) => {
    setFile(e.target.files);
  };

  const submitFile = async (e) => {
    e.preventDefault();
    if (file === null) {
      toast.error("File is needed.", toastOptions);
      return;
    }
    setDisabledBtn(true);
    setIsUploading(
      <div className="progress-bar">
        <p style={{ width: 0 }} className="filled-percentage">
          0 %
        </p>
      </div>
    );

    for (let i = 0; i < file.length; i++) {
      const options = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            setIsUploading(
              <div className="progress-bar">
                <p
                  style={{ width: percent + "%" }}
                  className="filled-percentage"
                >
                  {percent} %
                </p>
              </div>
            );
          }
        },
      };

      setProgress(
        <p className="current-progress">
          file : {i + 1} / {file.length}
        </p>
      );
      const data = new FormData();
      data.append("file", file[i]);
      await axios
        .post(uploadRoute, data, options)
        .then(() => {
          toast.success(
            <div>
              <p className="center">{file[i].name} : Upload Sucess</p>
              <br />
              <p>Go to your storage to see this file</p>
            </div>,
            toastOptions
          );
        })

        .catch((err) => {
          toast.error(
            file[i].name +
              " : upload error" +
              " try to upload again or contact support",
            toastOptions
          );
          setIsUploading(null);
          setProgress(null);
        });
    }
    setDisabledBtn(false);
    setFile(null);
    setIsUploading(null);
    inputRef.current.value = null;
    setProgress(null);
    setDisabledBtn(false);
  };

  return (
    <>
      <Container>
        <div className="main">
          <h2>Add new file(s)</h2>
          <form
            className="upload-form"
            action="#"
            onSubmit={submitFile}
            enctype="multipart/form-data"
          >
            <div className="upload-container">
              <input
                type="file"
                onChange={detectedFile}
                className="input-file"
                multiple={true}
                name=""
                id=""
                ref={inputRef}
              />
            </div>
            <button disabled={disabledBtn}>UPLOAD NEW FILE(S)</button>
          </form>
          {isUploading}
          {progress}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #14143b;
  .main {
    width: 100vw;
    height: 90vh;
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
    width: 600px;
    height: 30vh;
    border: 5px dashed #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8ba4eb6d;
  }
  h2 {
    color: white;
    font-size: 3rem;
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
    &:disabled {
      background-color: #6166729d;
      display: none;
    }
  }
  .progress-bar {
    background-color: #161a55;
    width: 50vw;
    height: 3vh;
    border-radius: 1rem;
  }
  .filled-percentage {
    min-width: 3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: #000000;
    font-weight: bold;
    font-size: 20px;
    background-color: #94ddff;
    border-radius: 1rem;
  }
  .current-progress {
    color: white;
    font-size: 1.5rem;
  }
`;
