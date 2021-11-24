import React from "react";
import styled from "styled-components";
import spinner from "./spinner.gif";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  z-index: 1000;
`;
const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Loading = () => {
  return (
    <Container>
      <Wrapper>
        <Img src={spinner}></Img>
      </Wrapper>
    </Container>
  );
};

export default Loading;
