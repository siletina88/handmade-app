import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import WarningIcon from "@mui/icons-material/Warning";
import { updateUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../spinner.gif";
import Alert from "./Alert";

const Title = styled.h1`
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", marginTop: "30px" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${mobile({ padding: "30px" })}
`;
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #f82c73;
`;
const Input = styled.input`
  border: none;
  padding: 10px 2px;
  font-size: 14px;
  background-color: whitesmoke;
`;
const Button = styled.button`
  width: 25%;
  padding: 10px;
  border: none;
  color: white;
  background-color: #f82c73;
  cursor: pointer;
  &:hover {
    background-color: #f82c73b2;
  }
`;
const Error = styled.div`
  display: flex;
  align-items: center;

  margin: 20px 0px;
  color: red;
  font-size: 10px;
  font-weight: 400px;
`;

const LoadingCont = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 20px 0px;
`;
const Loading = styled.img`
  width: 40px;
  height: 40px;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  gap: 30px;
`;

const ChangePassword = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser._id);
  const { isFetching } = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);

  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const handleChangeRepeat = (e) => {
    setRepeat(e.target.value);
    setError("");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    if (password === repeat) {
      if (password.length > 5) {
        const user = { password };
        await updateUser(id, user, dispatch);
        setShowAlert(true);
      } else {
        setError("Sifra mora biti najmanje 6 karaktera!");
        setPassword("");
        setRepeat("");

        return;
      }
    } else {
      setError("Sifre nisu iste!");
      setPassword("");
      setRepeat("");

      return;
    }
  };

  return (
    <>
      <Title>Promjeni sifru</Title>
      <Form>
        <FormItem>
          <Label>Sifra</Label>
          <Input onChange={handleChangePassword} value={password} type='password'></Input>
        </FormItem>
        <FormItem>
          <Label>Ponovi Sifru</Label>
          <Input onChange={handleChangeRepeat} value={repeat} type='password'></Input>
        </FormItem>
        <BottomContainer>
          <Button onClick={handleClick}>Promjeni</Button> <Alert type='success' message='Uspjesno ste promjenili vasu sifru' trigger={showAlert}></Alert>
          {isFetching && (
            <LoadingCont>
              <Loading src={spinner}></Loading>
            </LoadingCont>
          )}{" "}
          {error && (
            <Error>
              <WarningIcon style={{ color: "red", fontSize: "12px", paddingRight: "10px" }} /> {error}
            </Error>
          )}
        </BottomContainer>
      </Form>
    </>
  );
};

export default ChangePassword;
