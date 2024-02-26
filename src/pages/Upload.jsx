import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DragDropIcon from "../assets/drag-and-drop.png";
import { addFiles, uploadRoute, host } from "../utils/APIRoutes";
import PauseIcon from "../assets/pause.png";
import GearIcon from "../assets/gear.png";

export default function Upload(props) {
  const chunkSize = 1000 * 1024;
  const [fixedNumOfDroppedFiles, setFixedNumOfDroppedFiles] = useState(0);
  const [indexOfUpload, setIndexOfUpload] = useState(1);
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
  const [startDateUpload, setStartDateUpload] = useState(null);
  const [timeToUploadChunk, setTimeToUploadChunk] = useState(null);
  const [uploadSince, setUploadSince] = useState(0);
  const [userUploadSpeed, setUserUploadSpeed] = useState(0);
  const [speedLog, setSpeedLog] = useState([]);
  const [userSpeedAverage, setUserSpeedAverage] = useState(0);
  let sum = 0;
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  function handleDrop(e) {
    setSpeedLog([]);
    e.preventDefault();
    props.newFileDetected("");
    setFiles([...files, ...e.dataTransfer.files]);
    setFixedNumOfDroppedFiles(e.dataTransfer.files.length);
  }

  function readAndUploadCurrentChunk() {
    setStartDateUpload(Date.now());
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
    params.set("uploadBy", localStorage.getItem("iat"));
    params.set("name", file.name);
    params.set("size", file.size);
    params.set("currentChunkIndex", currentChunkIndex);
    params.set("totalChunks", Math.ceil(file.size / chunkSize));
    const headers = { "Content-Type": "application/octet-stream" };
    const url = uploadRoute + params.toString();

    setUploadSince((Date.now() - startDateUpload) / 1000);
    setTimeToUploadChunk(uploadSince);
    let calcSpeed = (1 * chunkSize) / timeToUploadChunk;
    setUserUploadSpeed((calcSpeed / 1000000).toFixed(2));

    if (parseFloat(userUploadSpeed) != Infinity) {
      if (parseFloat(userUploadSpeed) != 0)
        setSpeedLog((current) => [...current, parseFloat(userUploadSpeed)]);
    }
    for (let index = 0; index < speedLog.length; index++) {
      sum += speedLog[index];
    }
    let calcAverage = sum / speedLog.length;
    setUserSpeedAverage(calcAverage.toFixed(2));

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
          setIndexOfUpload(1);
          setFixedNumOfDroppedFiles(0);
          toast.success(
            `The files have been successfully uploaded ! `,
            toastOptions
          );
        }
        if (isLastChunk && currentFileIndex + 1 !== files.length) {
          const test = indexOfUpload + 1;
          setIndexOfUpload(test);
        }
        if (files.length === 1 && isLastChunk) {
          setIndexOfUpload(1);
          setFixedNumOfDroppedFiles(0);
          toast.success(
            `The files have been successfully uploaded ! `,
            toastOptions
          );
        }
        if (isLastChunk) {
          props.newFileDetected(Date.now() + file.name);

          file.finalFilename = response.data.finalFilename;
          const userId = localStorage.getItem("userId");
          setLastUploadedFileIndex(currentFileIndex);
          setCurrentChunkIndex(null);

          let conditionalDataVideo = {};
          let conditionalDataSerie = {};

          let isVideo = false;
          let isSerie = false;
          let isMovie = false;
          let season = null;
          let episode = null;
          let formatedName = "";
          let lowerFilename = file.finalFilename.toLowerCase();
          let filenameWithoutTimestamp = lowerFilename.replace(/^\d+_/, '');
          const videoType = ["video/mp4", "video/x-matroska", "video/avi", "video/mov", "video/flv"];
          isVideo = videoType.includes(file.type) ? true : false
          if(isVideo){
            isSerie = /(s|e)\d{2}/.test(filenameWithoutTimestamp);
            isMovie = !/(s|e)\d{2}/.test(filenameWithoutTimestamp);
            const regex = /s(\d{2})e(\d{2})/;
            const match = filenameWithoutTimestamp.match(regex);
            if (match) {
              season = match[1];
              episode = match[2];
            }

            conditionalDataVideo = {
              isVideo: isVideo,
              isSerie: isSerie,
              isMovie: isMovie
            };

          }

          if(isSerie){
            conditionalDataSerie = {
              isSerie: isSerie,
              isMovie: isMovie,
              season: season,
              episode: episode
            };
          }
          formatedName = filenameWithoutTimestamp.slice(0,-4).replace(/s\d{2}e\d{2}/, '').trimEnd().replace(/ /g, "-").replace(/_/g, "-")
            let format;
            if(file.type === "") format = file.finalFilename.slice(-3)
            else format = file.type 

          axios
            .post(addFiles, {
              token: localStorage.getItem("iat"),
              username: localStorage.getItem("username"),
              link: `${host}/files/${userId}/${file.finalFilename}`,
              prev: `${host}/files/${userId}/prev/${file.finalFilename}`,
              filename: file.finalFilename,
              size: file.size,
              format: format,
              formatedName,
              ...conditionalDataSerie,
              ...conditionalDataVideo
            })
            .then(() => {
              props.newFileDetected("");
              console.log('requete okokokok');
            })
            .catch((err) => {
              console.log(err);
              console.log('requete pas okokokok');

            });
        } else {
          setCurrentChunkIndex(currentChunkIndex + 1);
        }
      })
      .catch(() => {
        if (files.length > 0) {
          toast.error(
            `Upload error, try again or contact support`,
            toastOptions
          );
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        }
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
    } else {
    }
  }, [currentChunkIndex]);
  var userAgent;
  userAgent = navigator.userAgent.toLowerCase();

  if (typeof orientation !== "undefined" || userAgent.indexOf("mobile") >= 0) {
    alert("open in desktop");
  } else {
    return (
      <>
        <Container>
          <div
            multiple
            webkitdirectory
            mozdirectory
            directory
            type="file"
            className="drop-page"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              handleDrop(e);
            }}
          >
            <h2 className="title">Upload New Files</h2>

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
              <img
                className="drag-drop-icon"
                src={DragDropIcon}
                alt="Logo de fichier montrant qu'il faut deposer des fichier dans la zone."
              />
              <div className="inside-dragzone-h">
                <h4> Drop your files here.</h4>
                <h6>(For folders : compress before upload)</h6>
              </div>
            </div>

            {/* <p
              className={
                fixedNumOfDroppedFiles === 0 ? "done" : "file-in_queue"
              }
            >
              {indexOfUpload}/{fixedNumOfDroppedFiles}
            </p> */}
            <h2
              className={
                currentFileIndex === null ? "hidden" : "user-speed-upload"
              }
            >
              {currentFileIndex === null ||
              userSpeedAverage === "NaN" ||
              userSpeedAverage === 0 ? (
                <div className="speed-info">
                  <p>Average Speed :</p>
                  <img className="gear" src={GearIcon} alt="" srcset="" />
                  <p> Mo/s</p>
                </div>
              ) : (
                <div className="speed-info">
                  <p>Average Speed : </p>
                  <p>{userSpeedAverage}</p>
                  <p> Mo/s</p>
                </div>
              )}
            </h2>
            <img
              onClick={() => alert('Paused, click "ok" to resume.')}
              src={PauseIcon}
              alt="pause icon"
              srcSet=""
              className={fixedNumOfDroppedFiles === 0 ? "done" : "pause-icon"}
            />
            <div className="files">
              {files.map((file, fileIndex) => {
                let progress = 0;
                if (file.finalFilename) {
                  progress = 100;
                  const deleteDiv = document.querySelectorAll(".animation");
                  if (deleteDiv[fileIndex]) {
                    setTimeout(() => {
                      deleteDiv[fileIndex].remove();
                    }, 600);
                  }
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
                  <div className={progress === 100 ? "animation" : ""}>
                    <div className="progress-size"></div>
                    <div
                      className={"file " + (progress === 100 ? "test2" : "")}
                    >
                      <div className="name">{file.name}</div>
                      <div
                        key={file.name}
                        className={
                          "progress " + (progress === 100 ? "test2" : "")
                        }
                        style={{ width: progress + "%" }}
                      >
                        {progress}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  @keyframes slidein {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .speed-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .gear {
    animation: 2s linear infinite slidein;
    width: 1.2rem;
  }
  .hidden {
    display: none;
  }
  .user-speed-upload {
    color: white;
    text-align: center;
    margin-top: 2rem;
    font-size: 1.3rem;
  }
  * {
    user-select: none;
  }
  overflow-y: scroll;
  .pause-icon {
    margin-top: 20px;
    width: 2rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
  .drop-page {
    padding-bottom: 12rem;
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
    width: 50vw;
    position: absolute;
    overflow: hidden;
    overflow-y: scroll;
    height: 90vh;
  }
  .dropzone {
    display: flex;
    gap: 2rem;
    background-color: #00000061;
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

    top: -5px;
  }
  .file {
    box-shadow: 2px 2px 5px #00000239;
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
    height: 1.6rem;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
  .file .progress {
    border-radius: 2rem;
    min-width: 2.5rem;
    background-image: linear-gradient(45deg, #a086ff, #00aeff);
    position: absolute;
    inset: 0;
    width: 0;
    padding-top: 5px;
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 1.1rem;
    transition: 0.4s;
  }

  .done {
    display: none;
  }
  .title {
    width: 100%;
    align-items: center;
    text-align: center;
    margin-bottom: 2.95rem;
    color: white;
  }
  .drag-drop-icon {
    width: 4rem;
  }
  .file-in_queue {
    color: white;
    text-align: center;
    font-weight: 800;
  }
  .animation {
    animation: test 0.7s linear forwards;
    @keyframes test {
      0% {
        transform: translateX(0);
        position: relative;
      }
      70% {
        opacity: 1;
      }
      99% {
        transform: translateX(70vw);
        opacity: 1;
      }
      100% {
        opacity: 0;
        z-index: -999;
      }
    }
  }
  .test2 {
    color: rgba(1, 203, 253, 0);
  }

  .inside-dragzone-h {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 20px;
    h6 {
      font-size: 17px;
      text-transform: none;
    }
  }
`;
