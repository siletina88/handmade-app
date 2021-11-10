import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/bs";
import { spacing } from "@mui/system";

const Container = styled.tr`
  color: white;
  width: 100%;

  background-color: #12130fce;
`;
const TD = styled.td`
  padding: 12px 15px;
  min-width: 150px;
  border-bottom: 2px solid #00000076;

  color: ${(props) => props.color || "white"};
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
`;
const Image = styled.img`
  width: 30px;
  height: 30px;
  object-fit: center;
  border-radius: 50%;
`;

const SingleOrder = ({ createdAt, id, total, products, status, allProducts, address, city }) => {
  moment.locale("bs");
  const date = moment(createdAt).locale("bs").format("Do MMM Y. u LT");

  const checkStatus = () => {
    let stanje;
    let color;
    switch (status) {
      case "pending":
        stanje = "Procesuira se";
        color = "white";
        break;
      case "delivering":
        stanje = "U dostavi";
        color = "#39ffb3";
        break;
      case "delivered":
        stanje = "Zavrseno";
        color = "#fa6793";
        break;
    }
    return { color, stanje };
  };
  const { stanje, color } = checkStatus();

  const resolveProducts = () => {
    let allItems = [];
    products.map((product) => {
      allProducts.map((item) => {
        if (product._id === item._id) {
          allItems.push(item.img);
        }
      });
    });
    return allItems;
  };

  const x = resolveProducts();

  return (
    <Container>
      <TD>{date}</TD>
      <TD color={color}>{stanje}</TD>

      <TD>
        <ImageContainer>
          {x.map((product) => (
            <Image src={product}></Image>
          ))}
        </ImageContainer>
      </TD>
      <TD>{id}</TD>
      <TD>{address}</TD>
      <TD>{city}</TD>

      <TD>{total} KM</TD>
    </Container>
  );
};

export default SingleOrder;
