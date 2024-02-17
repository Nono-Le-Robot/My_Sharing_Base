import React, { useState, useEffect, Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { myFilesRoute, removeFiles } from "../utils/APIRoutes";
import RemoveIcon from "../assets/remove.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import NoImgPreview from "../assets/no-img-preview.png";
import ReactPlayer from "react-player";
import InfiniteIcon from "../assets/infinity.png";

export default function MyStorage(props) {
  const navigate = useNavigate();
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [userFiles, setUserFiles] = useState([]);
  const [filesInStorage, setFilesInStorage] = useState(0);
  const [userStorage, setUserStorage] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  const removeItem = async (file) => {
    await axios.post(removeFiles, {
      iat: localStorage.getItem("iat"),
      fileName: file.name,
    });
    await axios
      .post(myFilesRoute, {
        token: localStorage.getItem("iat"),
      })
      .then((result) => {
        const userFilesData = result.data.files;
        setUserFiles(userFilesData);
        setFilesInStorage(userFilesData.length);
        let totalSize = 0;
        for (let index = 0; index < userFilesData.length; index++) {
          totalSize = totalSize + userFilesData[index].size;
          setUserStorage(totalSize / 1000000000);
        }
      })
      .catch();
  };

  useEffect(() => {
    axios
      .post(myFilesRoute, {
        token: localStorage.getItem("iat"),
      })
      .then((result) => {
        const userFilesData = result.data.files;
        setUserFiles(userFilesData);
        setFilesInStorage(userFilesData.length);
        let totalSize = 0;
        for (let index = 0; index < userFilesData.length; index++) {
          totalSize = totalSize + userFilesData[index].size;
          setUserStorage(totalSize / 1000000000);
        }
      })
      .catch();
  }, []);

  useEffect(() => {
    axios
      .post(myFilesRoute, {
        token: localStorage.getItem("iat"),
      })
      .then((result) => {
        const userFilesData = result.data.files;
        setUserFiles(userFilesData);
        setFilesInStorage(userFilesData.length);
        let totalSize = 0;
        for (let index = 0; index < userFilesData.length; index++) {
          totalSize = totalSize + userFilesData[index].size;
          setUserStorage(totalSize / 1000000000);
        }
      })
      .catch();
  }, [props.isNewFile]);

  var userAgent;
  userAgent = navigator.userAgent.toLowerCase();

  if (typeof orientation !== "undefined" || userAgent.indexOf("mobile") >= 0) {
    alert("open in desktop");
  } else {
    return (
      <>
        <Container
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <div className={isLoaded ? "file-loaded" : "file-loader"}>
            <div>
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>

          <div className="generated-link">
            <p>Link to your file : </p>
            <input type="text" value={generatedLink} />
            <div id="link-div">
              <CopyToClipboard
                text={generatedLink}
                onCopy={() => {
                  const copyBtn = document.querySelector(".copy-btn");
                  copyBtn.textContent = "Copied";
                  copyBtn.style.color = "#ffffff";
                  copyBtn.style.background = "#0e9401";
                  copyBtn.style.width = "auto";
                  copyBtn.style.padding = "10px 20px";
                }}
              >
                <button className="copy-btn">Copy</button>
              </CopyToClipboard>
              <button
                onClick={() => {
                  const copyBtn = document.querySelector(".copy-btn");
                  copyBtn.style.background = "#044101";
                  copyBtn.textContent = "Copy";
                  copyBtn.style.color = "#ffffff";
                  copyBtn.style.padding = "10px 20px";
                  setGeneratedLink("");
                  const linkInput = document.querySelector(".generated-link");
                  linkInput.style.display = "none";
                  const rightMenu = document.querySelector(".r-menu-file");
                  rightMenu.style.display = "none";
                }}
                className="back-btn"
              >
                Back
              </button>
            </div>
          </div>

          <div className="r-menu-file">
            <div
              onClick={() => {
                const linkInput = document.querySelector(".generated-link");
                linkInput.style.display = "flex";
                const rightMenu = document.querySelector(".r-menu-file");

                rightMenu.style.display = "none";
              }}
              className="menu-file"
              id="rename-menu"
            >
              Get link
            </div>
          </div>
          <div onClick={() => {}} className="main" id="main">
            <h2 className="title">My Storage</h2>

            <div className="flex-items">
              <div className="items">
                {userFiles.map((file, fileIndex) => (
                  <>
                    <div
                      key={fileIndex}
                      className="item"
                      onContextMenu={(e) => {
                        setGeneratedLink(file.link);
                        const rightMenu =
                          document.querySelector(".r-menu-file");
                        e.preventDefault();
                        rightMenu.style.display = "flex";
                        rightMenu.style.top = `${e.clientY - 30}px`;
                        rightMenu.style.left = `${e.clientX - 30}px`;
                        rightMenu.addEventListener("mouseleave", () => {
                          const rightMenu2 =
                            document.querySelector(".r-menu-file");
                          rightMenu2.style.display = "none";
                        });
                      }}
                    >
                      <img
                        onClick={() => {
                          removeItem(file);
                        }}
                        className="remove-icon"
                        src={RemoveIcon}
                        alt="icon de suppression en forme de croix. permet de supprimer le fichier"
                      />
                      <a
                        download
                        href={file.link}
                        target="_blank"
                        className="texte-download item-body"
                      >
                        <div className="card-file">
                          <div className="card-file-head">
                            {file.link.substr(-3) === "png" ||
                            file.link.substr(-3) === "jpg" ||
                            file.link.substr(-3) === "gif" ||
                            file.link.substr(-3) === "bmp" ||
                            file.link.substr(-3) === "svg" ||
                            file.link.substr(-4) === "heif" ||
                            file.link.substr(-4) === "jpeg" ? (
                              <img className="img-prev" src={file.prev} />
                            ) : (
                              <></>
                            )}
                            {file.link.substr(-3) === "mp4" || file.link.substr(-3) === "mkv" || file.link.substr(-3) === "avi" || file.link.substr(-3) === "mov" ? (
                              <ReactPlayer
                                className="vid-prev"
                                width="100%"
                                height="6.4rem"
                                url={file.link}
                                controls
                              />
                            ) : (
                              <></>
                            )}
                            {file.link.substr(-3) !== "png" &&
                            file.link.substr(-3) !== "jpg" &&
                            file.link.substr(-3) !== "gif" &&
                            file.link.substr(-3) !== "bmp" &&
                            file.link.substr(-3) !== "svg" &&
                            file.link.substr(-4) !== "heif" &&
                            file.link.substr(-4) !== "jpeg" &&
                            file.link.substr(-3) !== "mp4" &&
                            file.link.substr(-3) !== "mov" &&
                            file.link.substr(-3) !== "mkv" &&
                            file.link.substr(-3) !== "avi"   
                            ? (
                              <img className="no-img-prev" src={NoImgPreview} />
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="card-file-body">
                            <p className="file-name">
                              {" "}
                              {file.name.substring(14)}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </>
                ))}
                <h2 className={filesInStorage === 0 ? "" : "hidden"}>
                  Drop your files in the upload section to see them appear here.
                </h2>
                <div className={filesInStorage !== 0 ? "user-info" : "hidden"}>
                  <h3>Total Files : {filesInStorage}</h3>
                  <p>|</p>
                  <h3 className="total-storage">
                    Storage :{" "}
                    {userStorage < 0.001
                      ? `${userStorage.toFixed(5)}`
                      : `${userStorage.toFixed(3)}`}{" "}
                    GB /{" "}
                    <img className="infinite-logo" src={InfiniteIcon} alt="" />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  .total-storage {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }
  .infinite-logo {
    width: 2rem;
    position: relative;
    top: -2px;
    left: 1px;
  }
  .vid-prev {
    border-radius: 0.5rem;
    overflow: hidden;
    transition: 0.3s;

    &:hover {
      transform: scale(1.32, 1.6) translateY(11px) translateX(0px);
      transition: 0.3s;
    }
  }
  .file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 20px;
  }
  .img-prev {
    position: relative;
    left: -2px;
    width: 10rem;
    object-fit: cover;
    height: 6rem;
    border-radius: 0.5rem;
    transition: 0.3s;

    &:hover {
      width: 15.2rem;
      height: 10.2rem;
      transform: translateY(27px);
      transition: 0.3s;
      margin-bottom: 15px;
    }
  }
  .no-img-prev {
    position: relative;
    left: -2px;
    width: 10rem;
    object-fit: cover;
    height: 6rem;
    border-radius: 0.5rem;
    transition: 0.3s;
  }
  .card-file {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    gap: 1rem;
  }
  .card-file-body {
    width: 80%;
    overflow: hidden;
  }

  .hidden {
    display: none;
  }
  .user-info {
    position: relative;
    left: 50px;
    width: 40vw;
    margin-bottom: 3rem;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }
  #link-div {
    display: flex;
    gap: 3rem;
    align-items: center;
    justify-content: center;
  }
  * {
    user-select: none;
  }
  #info-footer {
    margin-top: 20px;
    display: flex;
    width: 100%;
    gap: 5rem;
    justify-content: space-evenly;
  }
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #ffffff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

  .file-loaded {
    display: none;
  }
  .file-loader {
    position: absolute;
    height: 90vh;
    background-color: #151544;
    width: 49vw;
    margin-left: 1vw;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }
  .main {
    padding-bottom: 3rem;

    height: 90vh;
    width: 50vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
  }
  .remove-icon {
    &:hover {
      cursor: pointer;
    }
  }
  .back-btn {
    background-color: #410101;
    width: 100px;
    height: 50px;
    border-radius: 0.4rem;
    &:hover {
      background-color: #710707;
    }
  }

  .copy-btn {
    background-color: #044101;
    width: 100px;
    height: 50px;
    border-radius: 0.4rem;
    &:hover {
      background-color: #107107;
    }
  }
  .in-progress {
    text-decoration: line-through;
  }
  .generated-link {
    background-color: #09013dcd;
    position: absolute;
    left: 50%;
    width: 50vw;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    flex-direction: column;
    gap: 2rem;
    font-size: 3rem;
    input {
      border: none;
      border-radius: 1rem;
      background-color: black;
      color: white;
      height: 3rem;
      border: 1px white solid;
      padding-left: 1rem;

      font-size: 1.5rem;
      width: 90%;
    }
    display: none;
  }
  .rename-popup {
    position: absolute;
    width: 50vw;
    height: 90vh;
    background-color: #09031dd4;
    display: flex;
    z-index: 9999;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    p {
      font-size: 2rem;
      font-weight: 800;
    }
    input {
      width: 50%;
      height: 4rem;
      font-size: 1.5rem;
      padding: 0;
      margin: 0;
      background-color: #141135;
      border: none;
      border-radius: 1rem;
      padding-left: 1rem;
      color: white;
    }
    display: none;
  }
  .btns-rename {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .cancel-btn {
      border: none;
      box-shadow: 2px 2px 10px black;
      background-color: #610202e7;
      height: 3rem;
      width: 150px;
      &:hover {
        transition: 0.3s;
        background-color: #f94b4bb5;
        color: black;
      }
    }
    .confirm-btn {
      border: none;
      box-shadow: 2px 2px 10px black;
      background-color: #013b01;
      height: 3rem;
      width: 150px;
      transition: 0.3s;
      &:hover {
        transition: 0.3s;
        background-color: #5ee94fad;
        color: black;
      }
    }
  }
  #delete-menu {
    background-color: #370000;
    border-radius: 0 0 0.6rem 0.6rem;
    &:hover {
      background-color: #470909;
    }
  }
  #download-menu {
    border-radius: 0.6rem 0.6rem 0 0;
  }
  .info-edit {
    width: 100%;
    text-align: center;
    margin: 2rem;
  }

  .bottom-menu {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  .top-menu {
    color: #595959;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  .menu-file {
    text-align: center;
    padding: 1.2rem;
    font-weight: 800;
    transition: 0.2s;
    border-radius: 0.5rem;
    width: 100%;
    background-color: #000000f0;

    &:hover {
      transition: 0.2s;
      background-color: #181818;
    }
  }
  .r-menu-file {
    padding: 1rem;
    overflow: hidden;
    width: 200px;

    border-radius: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 999;
    display: none;
    &:hover {
      cursor: pointer;
    }
  }
  .flex-items {
    height: auto;
  }
  .items {
    width: 48vw;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    flex-wrap: wrap;
    padding-bottom: 2rem;
  }

  @keyframes pop-item {
    0% {
      opacity: 0;
      transform: scale(0.4);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .item {
    border: 1px solid #000000;
    animation: 0.5s pop-item ease-in-out forwards;
    opacity: 0;
    height: 10rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-image: repeating-linear-gradient(
        135deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        45deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        67.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        135deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        45deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        112.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        112.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        45deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        22.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        45deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        22.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        135deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        157.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        67.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        67.5deg,
        rgba(69, 112, 255, 0.03) 0px,
        rgba(69, 112, 255, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      linear-gradient(90deg, rgb(31, 24, 110), rgb(20, 52, 118));
    box-shadow: 2px 2px 10px #000000d5;
    color: black;
    font-weight: 600;
    font-size: 0.9rem;
    border-radius: 0.6rem;
    transition: 0.2s;
    &:hover {
      cursor: default;
      transition: 0.2s;
      transform: scale(1.05);
    }
  }
  .title {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .remove-icon {
    width: 1.6rem;
    position: absolute;
    z-index: 999;
    left: 99%;
    top: -7%;
    transform: translateX(-12px);
    display: flex;
    justify-content: flex-end;
  }
  .texte-download {
    width: 15rem;
    display: block;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    display: block;
    font-size: 1rem;
    padding: 0rem;
    border-radius: 0 0 0.4rem 0.4rem;
    color: #ffffff;
    margin: 0;

    &:visited {
      color: #ffffff;
    }
  }
`;
