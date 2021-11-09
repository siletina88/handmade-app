import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useSelector, useDispatch } from "react-redux";

import Congratulations from "./Congratulations";
import { clearCartOnOrder } from "../redux/apiCalls";
import { clearCart } from "../redux/cartSlice";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;

  background: #1313139d;
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  width: 40%;
  height: auto;
  background: white;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.397);
  border-radius: 10px;
  overflow: hidden;
`;
const Title = styled.h1`
  color: white;
  width: 100%;
  padding: 20px 0px;
  text-align: center;
  background-color: #f82c73;
`;

const OrderDetails = styled.div`
  flex: 1;
  width: 80%;
  margin: 0;
  padding: 0;
  margin: 30px 0px;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
`;
const ProductList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
const Product = styled.li`
  border-bottom: 1px solid black;
  width: 100%;
  color: gray;

  display: flex;
`;
const Total = styled.span`
  flex: 1;

  text-align: right;
`;
const OrderTotal = styled.div`
  width: 100%;
  text-align: right;
  color: #f82c73;
  font-weight: 600;
  text-decoration: underline;

  padding-top: 10px;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex: 2;
  width: 80%;
  height: 80%;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 15px;
`;
const Input = styled.input`
  border: none;
  border: 1px solid gray;
  padding-left: 10px;
  width: 95%;
  border-radius: 5px;
  font-size: 16px;
  background-color: whitesmoke;
  color: black;
  height: 25px;
  &:focus {
    outline: none;
    background-color: #f82c735c;
  }
`;
const FormItem = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Label = styled.label`
  color: #f82c73;
  font-size: 12px;
  font-weight: 600;
  width: 100%;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 10px;
  margin-bottom: 30px;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  width: 80%;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #f82c73;
  border-radius: 5px;
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  height: 20px;
  width: 20px;
`;

const Order = ({ setShowOrderWindow }) => {
  const dispatch = useDispatch();
  const [ordered, setOrdered] = useState(false);
  const [inputs, setInputs] = useState({});
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const cartId = cart._id;

  let fullName;
  let address;
  let phone;
  let userId;
  let email;
  let city;

  const checkIfUser = () => {
    if (user) {
      fullName = useRef(user.fullName);
      address = useRef(user.address);
      phone = useRef(user.phone);
      email = useRef(user.email);
      city = useRef(user.city);
      userId = useSelector((state) => state.user.currentUser._id);
    }
  };
  checkIfUser();

  const products = cart.products;
  const total = cart.total;
  console.log(products);

  const getProductIds = () => {
    let listOfProducts = [];
    products.map((item) => {
      listOfProducts.push({ quantity: item.quantity, _id: item.product._id });
    });
    return listOfProducts;
  };

  const listOfProducts = getProductIds();
  console.log(listOfProducts);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let order;
    if (user) {
      order = { ...inputs, userId, products: listOfProducts, total };
    } else {
      order = { ...inputs, products: listOfProducts, total };
    }

    try {
      const res = await publicRequest.post(`orders`, order);
      setOrdered(true);
      if (user) {
        clearCartOnOrder(cartId, userId, dispatch);
      } else {
        dispatch(clearCart());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fullName.current.value = user.fullName;
      address.current.value = user.address;
      phone.current.value = user.phone;
      email.current.value = user.email;
      city.current.value = user.city;
      setInputs((prev) => {
        return { ...prev, name: user.fullName, address: user.address, phone: user.phone, email: user.email, city: user.city };
      });
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        {ordered ? (
          <Congratulations setShowOrderWindow={setShowOrderWindow} setOrdered={setOrdered}></Congratulations>
        ) : (
          <>
            <Title>ZAVRSI NARUDZBU</Title>
            <IconWrapper>
              <HighlightOffIcon onClick={() => setShowOrderWindow(false)} style={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
            </IconWrapper>

            <OrderDetails>
              <ProductList>
                {cart.products.map((item) => (
                  <Product>
                    {item.product.title} x {item.quantity}
                    <Total>{item.product.price * item.quantity} KM</Total>
                  </Product>
                ))}
              </ProductList>
              <OrderTotal>UKUPNO {cart.total.toFixed(2)} KM</OrderTotal>
            </OrderDetails>
            <Form>
              <FormItem>
                <Label>Ime i prezime</Label>
                <Input ref={user && fullName} onChange={handleChange} name='name' type='text'></Input>
              </FormItem>
              <FormItem>
                <Label>Adresa dostave </Label>
                <Input ref={user && address} onChange={handleChange} name='address' type='text'></Input>
              </FormItem>
              <FormItem>
                <Label>Grad </Label>
                <Input ref={user && city} onChange={handleChange} name='city' type='text'></Input>
              </FormItem>
              <FormItem>
                <Label>Broj telefona</Label>
                <Input ref={user && phone} onChange={handleChange} name='phone' type='text'></Input>
              </FormItem>
              <FormItem>
                <Label>Email</Label>
                <Input ref={user && email} onChange={handleChange} name='email' type='email'></Input>
              </FormItem>

              <Button onClick={handleClick}>Naruci</Button>
            </Form>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Order;
