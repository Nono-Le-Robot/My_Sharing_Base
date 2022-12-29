import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  const navigate = useNavigate();
  const getStarted = () => {
    navigate("/register");
  };

  return (
    <>
      <Container>
        <h1></h1>
        <div className="home">
          <h2 className="desc">
            Share your files with anyone, for free and without limits.
          </h2>
          <h3 className="sub-desc">
            Upload large files without any size limit per file
          </h3>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  * {
    user-select: none;
  }
  height: 90vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #14143b;

  .mobile {
    display: none;
  }
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
    margin: 0 1rem;
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

  @media screen and (max-width: 768px) {
    .desc {
      font-size: 1.2rem;
    }
    .sub-desc {
      font-size: 1rem;
      text-align: center;
    }
    .home {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  @media screen and (max-width: 318px) {
    .sub-desc {
      display: none;
    }
  }
`;
