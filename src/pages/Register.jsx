import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Alert, ModalClassic } from "../components";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 120px);
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/5989804/pexels-photo-5989804.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  ${mobile({ height: "93vh" })};
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${tablet({ width: "65%" })}
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
  gap: 20px;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;

  padding: 10px;
  ${tablet({ minWidth: "43%" })}
`;
const Label = styled.label`
  font-size: 10px;
  font-weight: 600;

  color: #f82c73;
`;
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
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
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [welcome, setWelcome] = useState("");
  const { message } = useSelector((state) => state.user);
  const [showSuccess, setShowSuccess] = useState(false);

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
    const Register = async () => {
      if (user.username && user.password && user.password.length > 5 && user?.password === password && user?.email.includes("@")) {
        const result = await register(dispatch, { ...user });
        return result;
      } else {
        setError(true);
        return;
      }
    };
    const response = await Register();
    setShowSuccess(response ? response : false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>KREIRAJ NALOG</Title>
        <Form>
          <FormInput>
            <Label>Korisnicko ime</Label>
            <Input onChange={handleChange} name='username' placeholder='Korisnicko ime'></Input>
          </FormInput>

          <FormInput>
            <Label>Email adresa</Label>
            <Input onChange={handleChange} name='email' type='email' placeholder='email'></Input>
          </FormInput>

          <FormInput>
            <Label>Lozinka</Label>
            <Input onChange={handleChange} type='password' name='password' placeholder='Sifra'></Input>
          </FormInput>

          <FormInput>
            <Label>Lozinka ponovo</Label>
            <Input onChange={handlePassword} type='password' placeholder='Sifra ponovo'></Input>
          </FormInput>

          <Button onClick={handleClick}>KREIRAJ</Button>
        </Form>

        <Agreement>
          Kreiranjem ovog naloga, pristajem na procesuiranje licnih podataka u skladu sa <b>POLISOM PRIVATNOSTI</b>
        </Agreement>
        <Alert
          message={
            (!inputs.username && "Korisnicko ime je obavezno") ||
            (!inputs.email && "Email je obavezan") ||
            (!inputs.email.includes("@") && "Molimo da unesete validnu email adresu") ||
            (!inputs.password && "Sifra je obavezna") ||
            (inputs.password !== password && "Sifre se ne podudaraju") ||
            (inputs.password.length < 6 && "Sifre mora imati najmanje 6 karaktera")
          }
          trigger={error}
          type='error'
        ></Alert>
        <Alert message={message} trigger={message} type='error' timeout='3000'></Alert>
        {/* {!message && <Alert message={welcome} trigger={welcome} type='success'></Alert>} */}

        <ModalClassic
          trigger={showSuccess}
          type='success'
          heading='Nalog kreiran'
          message='Uspjesno ste kreirali vas nalog. Uskoro cete dobiti email za verifikaciju vaseg naloga. Nakon sto verifikujete mozete da se logirate.'
          timeout='10000'
          redirectTo='/login'
        ></ModalClassic>
      </Wrapper>
    </Container>
  );
};

export default Register;
