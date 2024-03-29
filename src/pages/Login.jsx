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
    email: "",
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
    const { email, password } = userData;
    if (password === "") {
      toast.error("password is required.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const navigateToMSB = () => {
    window.open('https://my-sharing-base.sanren.fr', '_blank');
   }
   
   const navigateToMWB = () => {
    window.open('https://my-watching-base.sanren.fr', '_blank');
   }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = userData;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        toast.success(data.msg, toastOptions);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", data.email);
        localStorage.setItem("iat", data.username);
        localStorage.setItem("iat", data.iat);

        window.location.href = "/#/storage";
        window.location.reload()
      }
    }
  };
  var userAgent;
  userAgent = navigator.userAgent.toLowerCase();

  if (typeof orientation !== "undefined" || userAgent.indexOf("mobile") >= 0) {
    alert("open in desktop");
  } else {
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
            <p className="info-account"><strong className="strong" onClick={navigateToMSB}>My Sharing Base</strong> and <strong onClick={navigateToMWB} className="strong">My Watching Base</strong> account is the same.</p>
            <form
              onSubmit={(event) => handleSubmit(event)}
              className="register-form"
            >
              <input
                autoComplete="nope"
                type="text"
                name="email"
                className="email"
                placeholder="email"
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
}

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #14143b;

  .strong {
    text-decoration: underline;
    font-size: 1.1rem;

    &:hover{
      cursor:pointer
    }
  }

  .info-account{
    color: #ffc979;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1.5rem;
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
      margin-left: 5px;
      text-decoration: none;
      color: #0400ff;
      font-weight: bold;
    }
  }
`;
