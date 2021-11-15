import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;

  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const Congratulations = ({ setOrdered, setShowOrderWindow }) => {
  const history = useHistory();
  const [counter, setCounter] = useState(7);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrdered(false);
      setShowOrderWindow(false);
      history.push("/");
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <>
      <CounterContainer>
        <Counter>{counter}</Counter>
      </CounterContainer>
      <Wrapper>
        <IconContainer>
          <Icon src='/assets/check.png'></Icon>
        </IconContainer>
        <Heading>HVALA VAM!</Heading>
        <Text>Uspjesno ste obavili narudzbu. Uskoro cete dobiti email sa potvrdom i detaljima narudzbe.</Text>
      </Wrapper>
    </>
  );
};

export default Congratulations;
