import styled from "styled-components";

import { mobile, tablet } from "../responsive";

import { useState, useEffect } from "react";
import spinner from "../spinner.gif";

import { useDispatch, useSelector } from "react-redux";
import { updateUserWithCloudinary } from "../customActions/updateUserWithCloudinary";
import AlertModal from "./AlertModal";

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
const Input = styled.input`
  border: none;
  padding: 10px 2px;
  font-size: 14px;
  background-color: whitesmoke;
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
  height: 40px;
  gap: 40px;
`;

const EditProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [message, setMessage] = useState("");

  const getUserId = () => {
    if (user) {
      return user._id;
    } else return null;
  };

  const id = getUserId();

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ ...user, fullName: user?.fullName, address: user?.address, phone: user?.phone, city: user?.city });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowSuccessAlert(false);
    setShowFailureAlert(false);

    const res = await updateUserWithCloudinary(dispatch, file, inputs, id);
    if (res === "success") {
      setMessage("Uspjesno ste azurirali vas profil!");
      setShowSuccessAlert(true);
    } else {
      setMessage("Greska, molimo vas pokusajte kasnije");
      setShowFailureAlert(true);
    }
  };

  return (
    <>
      <Title>Uredi profil</Title>
      <Form>
        <FormItem>
          <Label>Puno ime</Label>
          <Input onChange={handleChange} value={inputs.fullName} type='text' name='fullName'></Input>
        </FormItem>
        <FormItem>
          <Label>Adresa</Label>
          <Input onChange={handleChange} value={inputs.address} type='text' name='address'></Input>
        </FormItem>
        <FormItem>
          <Label>Grad</Label>
          <Input onChange={handleChange} value={inputs.city} type='text' name='city'></Input>
        </FormItem>
        <FormItem>
          <Label>Telefon</Label>
          <Input onChange={handleChange} value={inputs.phone} type='text' name='phone'></Input>
        </FormItem>

        <FormItem>
          <Label>Slika</Label>
          <Input onChange={(e) => setFile(e.target.files[0])} type='file' id='file'></Input>
        </FormItem>
        <BottomContainer>
          <Button onClick={handleClick}>Uredi</Button>{" "}
          <LoadingCont>
            <AlertModal type='success' message={message} trigger={showSuccessAlert} timeout='2000'></AlertModal>
            <AlertModal type='error' message={message} trigger={showFailureAlert} timeout='2000'></AlertModal>
            {isFetching && <Loading src={spinner}></Loading>}
          </LoadingCont>
        </BottomContainer>
      </Form>
    </>
  );
};

export default EditProfile;
