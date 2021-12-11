import MarkEmailReadSharpIcon from "@mui/icons-material/MarkEmailReadSharp";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 35vh;
  background-color: #565656;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "40px" })}
`;
const Description = styled.div`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
  ${mobile({ fontSize: "18px", padding: "0px 10px" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;

  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #f82c73;
  color: white;
  cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Email Bilten</Title>
      <Description>Pretplatite se da dobijate redovna obavjestenja o vasim najdrazim artiklima</Description>
      <InputContainer>
        <Input placeholder='Vas email' />
        <Button>
          <MarkEmailReadSharpIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
