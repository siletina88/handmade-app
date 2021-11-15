import React from "react";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/bs";
import { mobile } from "../responsive";

const Container = styled.tr`
  color: white;
  width: 100%;
  ${mobile({ fontSize: "12px", minWidth: "70px" })}

  background-color: #12130fce;
`;
const TD = styled.td`
  padding: 12px 15px;
  min-width: 60px;

  border-right: 1px solid #12130f;

  border-bottom: 2px solid #00000076;
  &::last-child {
    white-space: nowrap;
    width: 1%;
  }
  ${mobile({ fontSize: "12px", minWidth: "40px" })}

  color: ${(props) => props.color || "white"};
`;
const ImageContainer = styled.div`
  display: flex;
  width: 100%;

  gap: 5px;
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
        color = "#fcde37";
        break;
      case "delivered":
        stanje = "Dostavljeno";
        color = "#a5ff8a";
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

      <TD width='fit-content'>
        <ImageContainer>
          {x.map((product) => (
            <Image src={product}></Image>
          ))}
        </ImageContainer>
      </TD>
      {/* <TD>{id}</TD> */}
      <TD>{address}</TD>
      <TD>{city}</TD>

      <TD>{total.toFixed(2)} KM</TD>
    </Container>
  );
};

export default SingleOrder;
