import React, { useState, useEffect, Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { myFilesRoute, removeFiles } from "../utils/APIRoutes";
import RemoveIcon from "../assets/remove.png";
import RightClickIcon from "../assets/right-click.png";
import { toast } from "react-toastify";
import PdfLogo from "../assets/icon_format/pdf-file.png";
import LnkLogo from "../assets/icon_format/lnk-file.png";
import JpgLogo from "../assets/icon_format/jpg-file.png";
import OtherLogo from "../assets/icon_format/other-file.png";
// import ImageLogo from "../assets/icon_format/image-file.png";
// import VideoLogo from "../assets/icon_format/video-file.png";
// import OtherLogo from "../assets/icon_format/other-file.png";
// import ZipFile from "../assets/icon_format/zip-file.png";

export default function MyStorage(props) {
  const navigate = useNavigate();
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
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
        setUserFiles(result.data.files);
      })
      .catch();
  };

  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    axios
      .post(myFilesRoute, {
        token: localStorage.getItem("iat"),
      })
      .then((result) => {
        setUserFiles(result.data.files);
      })
      .catch();
  }, []);

  useEffect(() => {
    axios
      .post(myFilesRoute, {
        token: localStorage.getItem("iat"),
      })
      .then((result) => {
        setUserFiles(result.data.files);
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
              <div class="lds-ellipsis">
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
            <button
              onClick={() => {
                setGeneratedLink("");
                const linkInput = document.querySelector(".generated-link");
                linkInput.style.display = "none";
              }}
              className="back-btn"
            >
              Back
            </button>
          </div>
          <div className="rename-popup">
            <p>New name : </p>
            <input
              className="rename-input"
              type="text"
              placeholder={"ancienNomDeFichier.JPG"}
            />
            <div className="btns-rename">
              <button
                onClick={() => {
                  const renamePopUp = document.querySelector(".rename-popup");
                  renamePopUp.style.display = "none";
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button className="confirm-btn">Confirm</button>
            </div>
          </div>

          <div className="r-menu-file">
            {/* <div className="menu-file top-menu in-progress" id="rename-menu">
              Preview
            </div> */}
            <div
              className="menu-file in-progress top-menu"
              id="rename-menu"
              onClick={() => {
                const renamePopUp = document.querySelector(".rename-popup");
                renamePopUp.style.display = "flex";
              }}
            >
              Rename
            </div>
            <div
              onClick={() => {
                const linkInput = document.querySelector(".generated-link");
                linkInput.style.display = "flex";
              }}
              className="menu-file bottom-menu"
              id="rename-menu"
            >
              Get link
            </div>
          </div>
          <div
            onClick={() => {
              const rightMenu = document.querySelector(".r-menu-file");

              rightMenu.style.display = "none";
            }}
            className="main"
            id="main"
          >
            <h2 className="title">My Storage</h2>

            <div className="flex-items">
              <div className="items">
                {userFiles.map((file, fileIndex) => (
                  <div
                    key={fileIndex}
                    className="item"
                    onContextMenu={(e) => {
                      setGeneratedLink(file.link);
                      const rightMenu = document.querySelector(".r-menu-file");
                      e.preventDefault();
                      rightMenu.style.display = "flex";
                      rightMenu.style.top = `${e.clientY - 20}px`;
                      rightMenu.style.left = `${e.clientX - 20}px`;
                      rightMenu.addEventListener("mouseleave", () => {
                        const rightMenu =
                          document.querySelector(".r-menu-file");
                        rightMenu.style.display = "none";
                      });
                    }}
                  >
                    <img
                      onClick={() => {
                        console.log(file.name.slice(-3));
                        removeItem(file);
                      }}
                      className="remove-icon"
                      src={RemoveIcon}
                      alt="icon de suppression en forme de croix. permet de supprimer le fichier"
                    />

                    <a
                      download
                      href={file.link}
                      className="texte-download item-body"
                    >
                      <p className="hidden"> {file.name.substring(14)}</p>
                    </a>
                  </div>
                ))}
                <div id="info-footer">
                  <p>Left click : Download</p>
                  <p>Right click : Edit</p>
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
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    flex-wrap: wrap;
    padding-bottom: 13rem;
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
    animation: 0.5s pop-item ease-in-out forwards;
    opacity: 0;

    background: #5952d2;
    box-shadow: 2px 2px 10px #000000d5;
    color: black;
    font-weight: 600;
    font-size: 0.8rem;
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
    width: 1.3rem;
    position: absolute;
    left: 100%;
    top: -17%;
    transform: translateX(-12px);
    display: flex;
    justify-content: flex-end;
  }
  .texte-download {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    display: block;
    padding: 0.9rem 2rem 0.9rem 2.2rem;
    border-radius: 0 0 0.4rem 0.4rem;
    color: #ffffff;
    margin: 0;

    &:visited {
      color: #ffffff;
    }
  }
`;
