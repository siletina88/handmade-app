import styled from "styled-components";
import { useState } from "react";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { register, login } from "../redux/apiCalls";
import Alert from "../components/Alert";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/5989804/pexels-photo-5989804.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.div`
  font-size: 12px;
  margin: 10px 0px;
  line-height: 1.3;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  font-weight: 600;
  background-color: #f82c73;
  cursor: pointer;
  &:hover {
    background-color: #f82c73c0;
  }
`;

const Register = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(false);
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handlePassword = (e) => {
    setError(false);
    setPassword(e.target.value);
  };

  const handleClick = async (e) => {
    setError(false);
    e.preventDefault();
    const user = { ...inputs };

    const username = inputs.username;

    if (user.username && user.password && user.password.length > 5 && user?.password === password) {
      await register(dispatch, { ...user });

      login(dispatch, { username, password });
    } else {
      setError(true);
      return;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>KREIRAJ NALOG</Title>
        <Form>
          <Input onChange={handleChange} name='username' placeholder='Korisnicko ime'></Input>
          <Input onChange={handleChange} name='email' type='email' placeholder='email'></Input>
          <Input onChange={handleChange} type='password' name='password' placeholder='Sifra'></Input>
          <Input onChange={handlePassword} type='password' placeholder='Sifra ponovo'></Input>
          <Input onChange={handleChange} name='fullName' placeholder='Ime i prezime'></Input>
          <Input onChange={handleChange} name='address' placeholder='Adresa'></Input>
        </Form>
        <Alert
          message={
            (!inputs.username && "Korisnicko ime je obavezno") ||
            (!inputs.email && "Email je obavezan") ||
            (!inputs.password && "Sifra je obavezna") ||
            (inputs.password !== password && "Sifre se ne podudaraju") ||
            (inputs.password.length < 6 && "Sifre mora imati najmanje 6 karaktera")
          }
          trigger={error}
          type='error'
        ></Alert>
        <Agreement>
          Kreiranjem ovog naloga, pristajem na procesuiranje licnih podataka u skladu sa <b>POLISOM PRIVATNOSTI</b>
        </Agreement>
        <Button onClick={handleClick}>KREIRAJ</Button>
      </Wrapper>
    </Container>
  );
};

export default Register;
