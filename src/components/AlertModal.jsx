import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { mobile, tablet } from "../responsive";

const bounce = keyframes`
  0% {
    transform: translateX(400px);
    opacity: 0;
  }



  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;
const expire = keyframes`
  0% {
    transform-origin: left;
    transform: scaleX(1);
  }


  100% {
    transform-origin: left;
    transform: scaleX(0);
  }
`;

const Container = styled.div`
  position: fixed;
  opacity: 1;
  width: 100vw;

  z-index: 10000;

  top: 0;
  left: 0;
  display: ${(props) => (props.hide ? "none" : "flex")};
  align-items: start;
  justify-content: flex-end;
  margin: 91vh -20px;
  ${mobile({ margin: "10px 0px", justifyContent: "center" })}
`;

const Wrapper = styled.div`
  width: 300px;
  height: 50px;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  position: relative;
  box-shadow: 0px 0px 5px 0px #00000076;
  animation: ${bounce} 0.5s ease;
`;

const CounterContainer = styled.div`
  flex: 1;
  cursor: pointer;

  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid whitesmoke;
`;
const Counter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  font-size: 12px;
  font-weight: bold;
`;
const IconContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.color};
  color: white;

  flex: 1;
  align-items: center;
  justify-content: center;
`;
const MessageContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 2px;
  justify-content: center;
  width: 100%;
`;

const Text = styled.p`
  width: 100%;

  font-size: 14px;
  text-align: left;
`;
const Heading = styled.p`
  color: #12130f;
  width: 100%;
  font-weight: 600;

  font-size: 18px;
  text-align: left;
`;

const CounterAnimation = styled.div`
  position: absolute;
  width: 300px;
  height: 3px;
  background-color: #7a7a7a;
  animation: ${expire}
    ${(props) => {
      return `${props.timer}s`;
    }}
    linear;
`;

const AlertModal = ({ trigger, type, heading, message, timeout, redirectTo }) => {
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
      return ReactDom.createPortal(
        <>
          {showModal && (
            <Container hide={close} onClick={handleClose}>
              <Wrapper>
                <IconContainer color='#00c400'>
                  <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                </IconContainer>
                <MessageContainer>
                  <Heading>{heading}</Heading>
                  <Text>{message}</Text>
                </MessageContainer>

                <CounterContainer>
                  <Counter>x</Counter>
                </CounterContainer>
                <CounterAnimation timer={timeout / 1000}></CounterAnimation>
              </Wrapper>
            </Container>
          )}
        </>,
        document.getElementById("modal")
      );

    case "error":
      return ReactDom.createPortal(
        <>
          {showModal && (
            <Container hide={close} onClick={handleClose}>
              <Wrapper>
                <IconContainer color='#df0000'>
                  <ErrorOutlineIcon></ErrorOutlineIcon>
                </IconContainer>
                <MessageContainer>
                  <Heading>{heading}</Heading>
                  <Text>{message}</Text>
                </MessageContainer>

                <CounterContainer>
                  <Counter>x</Counter>
                </CounterContainer>
                <CounterAnimation timer={timeout / 1000}></CounterAnimation>
              </Wrapper>
            </Container>
          )}
        </>,
        document.getElementById("modal")
      );
    case "warning":
      return ReactDom.createPortal(
        <>
          {showModal && (
            <Container hide={close} onClick={handleClose}>
              <Wrapper>
                <IconContainer color='#fcbe03'>
                  <ErrorOutlineIcon></ErrorOutlineIcon>
                </IconContainer>
                <MessageContainer>
                  <Heading>{heading}</Heading>
                  <Text>{message}</Text>
                </MessageContainer>

                <CounterContainer>
                  <Counter>x</Counter>
                </CounterContainer>
                <CounterAnimation timer={timeout / 1000}></CounterAnimation>
              </Wrapper>
            </Container>
          )}
        </>,
        document.getElementById("modal")
      );
  }
};

export default AlertModal;
