import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
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
      toast.error("email is required.", toastOptions);
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
        toast.success("Sucess, redirect to the app...", toastOptions);
        setTimeout(() => {
          navigate("/app");
        }, 4000);
      }
    }
  };

  return (
    <>
      <Container>
        <div className="register">
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
            <span>
              Don't have an account ?{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </span>
          </form>
        </div>
      </Container>
      <ToastContainer />
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

  .register {
    width: 30vw;
    background-color: #9290ff;
    padding: 5rem;
    border-radius: 0.3rem;

    box-shadow: 2px 2px 10px #0000005a;
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
      height: 2.5rem;
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
      width: 30%;

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
      text-decoration: none;
      color: #0400ff;
      font-weight: bold;
    }
  }
`;
