import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AlertContainer = styled.div`
  margin: 10px 0px;

  display: flex;
  align-items: center;
`;
const Message = styled.p`
  display: flex;
  align-items: center;
  color: ${(props) => props.color};
  font-size: 12px;
`;

const Alert = ({ type, message, trigger, timeout }) => {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (!trigger) {
      setShowAlert(false);
      return;
    }

    setShowAlert(true);
    let timer;
    if (timeout) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, timeout);
    }

    return () => clearTimeout(timer);
  }, [trigger]);

  switch (type) {
    case "success":
      return (
        <>
          {showAlert && (
            <AlertContainer>
              <Message color='green'>
                <CheckCircleIcon style={{ color: "green", paddingRight: "10px", display: "flex", alignItems: "center", fontSize: "14px" }} />
                {message}
              </Message>
            </AlertContainer>
          )}
        </>
      );
      break;
    case "error":
      return (
        <>
          {showAlert && (
            <AlertContainer>
              <Message color='red'>
                <ErrorOutlineIcon style={{ color: "red", paddingRight: "10px", display: "flex", alignItems: "center", fontSize: "14px" }} />
                {message}
              </Message>
            </AlertContainer>
          )}
        </>
      );
      break;
  }
};

export default Alert;
