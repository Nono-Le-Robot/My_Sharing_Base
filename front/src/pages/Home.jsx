import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShareLogo from "../assets/sharing.png";
import { motion } from "framer-motion";
export default function Login() {
  const navigate = useNavigate();
  const getStarted = () => {
    navigate("/register");
  };
  return (
    <>
      <Container>
        <div className="home">
          <h2>Share with anyone, for free and without limits.</h2>
          <div className="infos">
            <h3>
              <span className="number">1</span>Share your files with others
              people, without pay anything.
            </h3>
            <h3>
              <span className="number">2</span>Enjoy vidéos and share your
              screens in real time with your friends.
            </h3>
            <h3>
              <span className="number">3</span>Chat, call and share anything in
              the Social Hub.
            </h3>
          </div>
        </div>
      </Container>
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

  .number {
    background-image: linear-gradient(45deg, #7e6ac5, #009ce4);
    padding: 1rem 1.5rem;
    border-radius: 50% 20% / 10% 40%;
    border: 2px solid white;
    margin: 2rem;
    font-weight: 800;
    color: #ffffff;
  }
  .infos {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    justify-content: center;
    color: white;
  }
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5rem;
    color: #ffffff;
  }
  h2 {
    color: white;
    font-size: 2rem;
    text-align: center;
  }
  button {
    backface-visibility: hidden;
    position: absolute;
    top: 50rem;
    margin-top: 10px;
    border: 1px solid #ffffff;

    font-weight: 800;
    padding: 0.5rem;
    border-radius: 0.3rem;
    width: 15rem;

    height: 3.5rem;
    background-image: linear-gradient(45deg, #7e6ac5, #009ce4);
    color: #fdfdfd;
    transition: 0.2s;

    filter: contrast(100%);

    &:hover {
      cursor: pointer;
      transition: 0.2s;
      filter: contrast(150%);
    }
  }
  @media screen and (max-width: 1080px) {
    h2 {
      word-wrap: break-word;
      margin-left: 2rem;
      margin-right: 2rem;
    }
    h3 {
      margin-left: 2rem;
      margin-right: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  @media screen and (max-width: 768px) {
    .number {
      transform: scale(0.7);
      margin: 0.5rem;
    }
    .infos {
      gap: 2rem;
    }
    h2 {
      font-size: 2rem;
      position: relative;
      top: -2rem;
    }

    .home {
      justify-content: space-between;

      gap: 4rem;
    }
  }
`;
