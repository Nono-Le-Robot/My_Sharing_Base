import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import LoginLogo from "../assets/login.png";
export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = userData;
    if (password === "") {
      toast.error("password is required.", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("username is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = userData;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        toast.success(data.msg, toastOptions);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        localStorage.setItem("iat", data.iat);
        window.location.href = "storage";
      }
    }
  };

  return (
    <>
      <Container>
        <div className="register">
          <div className="register-logo-div">
            <img
              className="register-logo"
              src={LoginLogo}
              alt="icon d'enregistrement representant une personne avec un logo + a coté"
            />
          </div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="register-form"
          >
            <input
              autoComplete="nope"
              type="text"
              name="username"
              className="username"
              placeholder="Username"
              onChange={(e) => handleChange(e)}
            />
            <input
              autoComplete="nope"
              type="password"
              name="password"
              className="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">LOGIN</button>
            <span id="create-account">
              Don't have an account ?
              <Link className="link" to="/register">
                Register
              </Link>
            </span>
          </form>
        </div>
        <div className="mobile">
          <h2>
            Only available on desktop for the moment... (work on mobile app)
          </h2>
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
  #create-account {
    text-align: center;
  }
  .register-logo-div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .register-logo {
    background-color: #121230;
    border-radius: 2rem;
    width: 4rem;
    padding: 0.7rem;
  }

  .register {
    margin-left: 2rem;
    margin-right: 2rem;
    width: 600px;
    background-image: linear-gradient(45deg, #a086ff, #00aeff);
    padding: 2rem;
    border-radius: 1rem;

    box-shadow: 2px 2px 10px #0000005a;
  }
  .mobile {
    display: none;
  }
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    input {
      border: 1px solid #ffffff;
      width: 90%;
      height: 3rem;
      padding: 0.5rem 1rem;
      border-radius: 0.3rem;

      font-weight: bold;
      background-color: #121230;
      color: white;
      &:focus {
        background-color: #28105f;
      }
    }
    button {
      border: 1px solid #ffffff;

      font-weight: bold;
      padding: 0.5rem;
      border-radius: 0.3rem;
      width: 50%;

      height: 3rem;
      background-color: #121230;
      color: white;
      transition: 0.4s;
      &:hover {
        cursor: pointer;
        transition: 0.4s;
        background-color: #28105f;
      }
    }
    .link {
      margin-left: 5px;
      text-decoration: none;
      color: #0400ff;
      font-weight: bold;
    }
  }
`;
