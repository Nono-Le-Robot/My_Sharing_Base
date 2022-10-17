import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { username, email, password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      toast.error("password must be the same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username must be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("password must be greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email is required.", toastOptions);
      return false;
    } else if (!email.match(mailformat)) {
      toast.error("email is not valid.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = userData;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        toast.success("Sucess, redirect to login page...", toastOptions);
        setTimeout(() => {
          navigate("/login");
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
              type="text"
              name="email"
              className="email"
              placeholder="Email"
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
            <input
              autoComplete="nope"
              type="password"
              name="confirmPassword"
              className="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">CREATE USER</button>
            <span>
              Already have an account ?{" "}
              <Link className="link" to="/login">
                Login
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
    width: 20vw;
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

      height: 2rem;
      padding: 0.5rem;
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
      width: 90%;

      height: 3.5rem;
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
