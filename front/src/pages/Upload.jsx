import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Upload() {
  const chunkSize = 30000 * 1024;
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  function handleDrop(e) {
    e.preventDefault();
    setFiles([...files, ...e.dataTransfer.files]);
  }

  function readAndUploadCurrentChunk() {
    const reader = new FileReader();
    const file = files[currentFileIndex];
    if (!file) {
      return;
    }
    const from = currentChunkIndex * chunkSize;
    const to = from + chunkSize;
    const blob = file.slice(from, to);
    reader.onload = (e) => uploadChunk(e);
    reader.readAsDataURL(blob);
  }

  function uploadChunk(readerEvent) {
    const file = files[currentFileIndex];
    const data = readerEvent.target.result;
    const params = new URLSearchParams();
    params.set("name", file.name);
    params.set("size", file.size);
    params.set("currentChunkIndex", currentChunkIndex);
    params.set("totalChunks", Math.ceil(file.size / chunkSize));
    const headers = { "Content-Type": "application/octet-stream" };
    const url = "http://localhost:5000/upload?" + params.toString();
    axios
      .post(url, data, { headers })
      .then((response) => {
        const file = files[currentFileIndex];
        const filesize = files[currentFileIndex].size;
        const chunks = Math.ceil(filesize / chunkSize) - 1;
        const isLastChunk = currentChunkIndex === chunks;
        if (
          currentFileIndex + 1 === files.length &&
          files.length !== 1 &&
          isLastChunk
        ) {
          toast.success(`Upload success ! `, toastOptions);
        }
        if (files.length === 1 && isLastChunk) {
          toast.success(`Upload success ! `, toastOptions);
        }
        if (isLastChunk) {
          file.finalFilename = response.data.finalFilename;
          setLastUploadedFileIndex(currentFileIndex);
          setCurrentChunkIndex(null);
        } else {
          setCurrentChunkIndex(currentChunkIndex + 1);
        }
      })
      .catch(() => {
        toast.error(
          `${file.name} : Upload error, try again or contact support`,
          toastOptions
        );
      });
  }
  useEffect(() => {
    if (lastUploadedFileIndex === null) {
      return;
    }
    const isLastFile = lastUploadedFileIndex === files.length - 1;
    const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
    setCurrentFileIndex(nextFileIndex);
  }, [lastUploadedFileIndex]);

  useEffect(() => {
    if (files.length > 0) {
      if (currentFileIndex === null) {
        setCurrentFileIndex(
          lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1
        );
      }
    }
  }, [files.length]);

  useEffect(() => {
    if (currentFileIndex !== null) {
      setCurrentChunkIndex(0);
    }
  }, [currentFileIndex]);

  useEffect(() => {
    if (currentChunkIndex !== null) {
      readAndUploadCurrentChunk();
    }
  }, [currentChunkIndex]);

  return (
    <>
      <Container>
        <div>
          {" "}
          <h2 className="title">Upload New Files</h2>
        </div>
        <div
          onDragOver={(e) => {
            setDropzoneActive(true);
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            setDropzoneActive(false);
            e.preventDefault();
          }}
          onDrop={(e) => {
            setDropzoneActive(false);
            handleDrop(e);
          }}
          className={"dropzone" + (dropzoneActive ? " active" : "")}
        >
          <h4> Drop your files here</h4>
        </div>
        <div className="files">
          {files.map((file, fileIndex) => {
            let progress = 0;
            if (file.finalFilename) {
              progress = 100;
            } else {
              const uploading = fileIndex === currentFileIndex;
              const chunks = Math.ceil(file.size / chunkSize);
              if (uploading) {
                progress = Math.round((currentChunkIndex / chunks) * 100);
              } else {
                progress = 0;
              }
            }
            return (
              <div className={"file " + (progress === 100 ? "done" : "")}>
                <div className="name">{file.name}</div>
                <div
                  key={file.name}
                  className={"progress " + (progress === 100 ? "done" : "")}
                  style={{ width: progress + "%" }}
                >
                  {progress}%
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  overflow: hidden;
  .dropzone {
    margin-bottom: 2rem;
    box-shadow: 2px 2px 10px black;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    height: 25vh;
    color: white;
    border: 2px dashed #acacac;
    border-radius: 1rem;

    text-align: center;
    text-transform: uppercase;
    transition: 0.4s;
  }
  .dropzone.active {
    transition: 0.4s;
    background-color: #21315e;
    border-color: white;
  }
  .name {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    justify-content: end;
    position: relative;
    top: 5px;
  }
  .file {
    box-shadow: 2px 2px 10px black;

    text-decoration: none;
    color: rgba(1, 203, 253, 0.603);
    font-weight: bold;
    display: block;
    background-color: #6060d32f;
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px;
    position: relative;
    overflow: hidden;
    height: 2.7rem;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
  .file .progress {
    min-width: 2.5rem;
    background-color: rgba(96, 96, 235, 0.8);
    position: absolute;
    inset: 0;
    width: 0;
    padding-top: 12px;
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .done {
    display: none;
  }
  .title {
    width: 100%;
    align-items: center;
    text-align: center;
    margin-bottom: 3rem;
    margin-top: 3rem;
    color: white;
  }
`;
