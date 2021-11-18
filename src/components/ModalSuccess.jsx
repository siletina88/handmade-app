import { SettingsApplicationsRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0% {
    transform: translateY(-500px);
  }


  100% {
    transform: translateY(0px);
  }
`;
const darken = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: #000000a0;
  top: 0;
  left: 0;
  display: ${(props) => (props.hide ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: ${darken} 0.2s linear;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  background: white;
  border-radius: 5px;
  border: 1px solid whitesmoke;
  max-width: 400px;
  min-width: 300px;
  margin: 0 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: ${bounce} 0.5s ease;
`;

const CounterContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Counter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;
const IconContainer = styled.div`
  display: flex;
  margin: 30px;
  align-items: center;
  justify-content: center;
  width: 60px;
`;
const Icon = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Text = styled.p`
  margin: 20px;
  font-size: 16px;
  text-align: center;
`;
const Heading = styled.h2`
  color: #12130f;
`;

const ModalSuccess = ({ trigger, type, heading, message, timeout, redirectTo }) => {
  const history = useHistory();
  const [counter, setCounter] = useState(timeout / 1000);
  const [close, setClose] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setShowModal(false);
      return;
    }

    setShowModal(true);

    if (timeout) {
      const timer = setTimeout(() => {
        if (redirectTo) {
          history.push(redirectTo);
        } else {
          setShowModal(false);
        }
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  useEffect(() => {
    if (timeout && showModal) {
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter, showModal]);

  const handleClose = () => {
    setShowModal(false);
    history.push(redirectTo);
  };
  switch (type) {
    case "success":
      return (
        <>
          {showModal && (
            <Container hide={close} onClick={handleClose}>
              <Wrapper>
                <CounterContainer>
                  <Counter>{timeout ? counter : "X"}</Counter>
                </CounterContainer>
                <IconContainer>
                  <Icon src='/assets/check.png'></Icon>
                </IconContainer>
                <Heading>{heading}</Heading>
                <Text>{message}</Text>
              </Wrapper>
            </Container>
          )}
        </>
      );

    case "error":
      return (
        <>
          {showModal && (
            <Container hide={close} onClick={handleClose}>
              <Wrapper>
                <CounterContainer>
                  <Counter>{timeout ? counter : "X"}</Counter>
                </CounterContainer>
                <IconContainer>
                  <Icon src='/assets/error.png'></Icon>
                </IconContainer>
                <Heading>{heading}</Heading>
                <Text>{message}</Text>
              </Wrapper>
            </Container>
          )}
        </>
      );
    case "warning":
      return (
        <>
          {showModal && (
            <Container hide={close} onClick={handleClose}>
              <Wrapper>
                <CounterContainer>
                  <Counter>{timeout ? counter : "X"}</Counter>
                </CounterContainer>
                <IconContainer>
                  <Icon src='/assets/warning.png'></Icon>
                </IconContainer>
                <Heading>{heading}</Heading>
                <Text>{message}</Text>
              </Wrapper>
            </Container>
          )}
        </>
      );
  }
};

export default ModalSuccess;
