import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyStorage() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  return (
    <>
      <Container>
        <div className="main">
          <h2 className="title">My Storage</h2>
          <div className="flex-items">
            <div className="items">
              <div className="item">
                <p className="file">test.png</p>
              </div>
              <div className="item">
                <p className="file">test.png</p>
              </div>
              <div className="item">
                <p className="file">test.png</p>
              </div>
              <div className="item">
                <p className="file">test.png</p>
              </div>
              <div className="item">
                <p className="file">test.png</p>
              </div>{" "}
              <div className="item">
                <p className="file">test.png</p>
              </div>{" "}
              <div className="item">
                <p className="file">test.png</p>
              </div>{" "}
              <div className="item">
                <p className="file">test.png</p>
              </div>{" "}
              <div className="item">
                <p className="file">test.png</p>
              </div>{" "}
              <div className="item">
                <p className="file">test.png</p>
              </div>{" "}
              <div className="item">
                <p className="file">test.png</p>
              </div>{" "}
              <div className="item">
                <p className="file">test.png</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  .main {
    overflow: hidden;
    background-color: #15153f;
    height: 90vh;
    width: 50vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
  }
  .flex-items {
    height: 72vh;
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
  .item {
    padding: 1rem 2rem;
    background-color: #4aa8ff;
    box-shadow: 2px 2px 10px black;
    color: black;
    font-weight: 600;
    font-size: 1.2rem;
    border-radius: 0.6rem;
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      transition: 0.2s;
      transform: scale(1.05);
    }
  }
  .title {
    margin-bottom: 3rem;
  }
`;
