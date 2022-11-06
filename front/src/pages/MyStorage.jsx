import React, { useState, useEffect, Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { myFilesRoute, removeFiles } from "../utils/APIRoutes";
import RemoveIcon from "../assets/remove.png";

export default function MyStorage(props) {
  const navigate = useNavigate();

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
      .catch(() => alert("err"));
  };

  const [userFiles, setUserFiles] = useState([]);

  let test = [];
  useEffect(() => {
    axios
      .post(myFilesRoute, {
        token: localStorage.getItem("iat"),
      })
      .then((result) => {
        setUserFiles(result.data.files);
      })
      .catch(() => alert("err"));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      axios
        .post(myFilesRoute, {
          token: localStorage.getItem("iat"),
        })
        .then((result) => {
          setUserFiles(result.data.files);
        })
        .catch(() => alert("err"));
    }, 100);
  }, [props.isNewFile]);

  return (
    <>
      <Container>
        <div className="main">
          <h2 className="title">My Storage</h2>
          <div className="flex-items">
            <div className="items">
              {userFiles.map((file, fileIndex) => (
                <div key={fileIndex} className="item">
                  <img
                    onClick={() => removeItem(file)}
                    className="remove-icon"
                    src={RemoveIcon}
                    alt="icon de suppression en forme de croix. permet de supprimer le fichier"
                  />
                  <a download href={file.link} className="texte-download">
                    {file.name.substring(16)}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  .main {
    padding-bottom: 3rem;

    height: auto;
    width: 50vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
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

    background-image: linear-gradient(45deg, #a086ff, #00aeff);
    box-shadow: 2px 2px 10px black;
    color: black;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 0.6rem;
    transition: 0.2s;
    &:hover {
      cursor: pointer;
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
    top: -20%;
    transform: translateX(-12px);
    display: flex;
    justify-content: flex-end;
  }
  .texte-download {
    text-decoration: underline;
    display: block;
    padding: 0.9rem 2rem 0.9rem 2.2rem;
    border-radius: 0.4rem;
    color: black;
    margin: 0;
    &:visited {
      color: black;
    }
  }
`;
