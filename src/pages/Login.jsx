import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { clear } from "../redux/actions";
import { mobile, tablet } from "../responsive";
import WarningIcon from "@mui/icons-material/Warning";
import spinner from "../spinner.gif";
import { useEffect } from "react";
import Alert from "../components/Alert";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 120px);
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/7436106/pexels-photo-7436106.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  ${mobile({ height: "93vh" })};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 40%;
  height: 320px;
  background-color: white;
  ${tablet({ width: "50%" })}
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  padding: 10px 0px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
`;
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;

  padding: 10px;
`;
const Label = styled.label`
  font-size: 10px;
  font-weight: 600;

  color: #f82c73;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: #f82c73;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.div`
  display: flex;
  align-items: center;

  margin: 20px 0px;
  color: red;
  font-size: 12px;
  font-weight: 400px;
`;
const LoadingCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 20px 0px;
`;
const Loading = styled.img`
  width: 40px;
  height: 40px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { isFetching, error, currentUser, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    await login(dispatch, { username, password });

    if (!currentUser || error) {
      setShowAlert(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOGIRAJ SE</Title>
        <Form>
          <FormInput>
            <Label>Korisnicko ime</Label>
            <Input onChange={(e) => setUsername(e.target.value)} placeholder='Korisnicko ime'></Input>
          </FormInput>
          <FormInput>
            <Label>Lozinka</Label>
            <Input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Lozinka'></Input>
          </FormInput>
          <Button onClick={handleLogin}>LOGIN</Button>
        </Form>
        <Link>Zaboravili ste password ili korisnicko ime?</Link>
        <Link>Kreirajte novi nalog</Link>
        <Alert type='error' message={!password || !username ? "Molimo Vas da popunite polja" : message} trigger={showAlert}></Alert>

        {isFetching && (
          <LoadingCont>
            <Loading src={spinner}></Loading>
          </LoadingCont>
        )}
      </Wrapper>
    </Container>
  );
};

export default Login;
