import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EarthLowPoly from "../assets/test/terre-low-poly.png";
import Earth from "../assets/test/terre.png";
import Donut from "../assets/test/donut.png";

export default function MyStorage() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="main">
          <h2>My storage</h2>
          <div className="storage-container">
            <img src={Donut} alt="" />
            <img src={EarthLowPoly} alt="" />
            <img src={Earth} alt="" />
          </div>
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
  img {
    width: 20vw;
  }

  .storage-container {
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5rem;
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
