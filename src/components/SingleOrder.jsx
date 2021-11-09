import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/bs";
import { spacing } from "@mui/system";

const Container = styled.tr`
  color: white;

  background-color: #12130f;
`;
const TD = styled.td`
  padding: 12px 15px;
  border-bottom: 2px solid #009879;
  color: ${(props) => props.color || "white"};
`;

const SingleOrder = ({ createdAt, id, total, products, status, allProducts }) => {
  moment.locale("bs");
  const date = moment(createdAt).locale("bs").format("Do MMM Y. u LT");
  const stateProducts = useSelector((state) => state.products);

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
        color = "#009879";
        break;
      case "delivered":
        stanje = "Zavrseno";
        color = "#fa6793";
        break;
    }
    return { color, stanje };
  };
  const { stanje, color } = checkStatus();

  return (
    <Container>
      <TD>{date}</TD>
      <TD color={color}>{stanje}</TD>
      <TD>
        {products.map((product) => {
          allProducts.map((item) => {
            if (product._id === item._id) {
              console.log(item.title);
              return <img src={item.img}>{item.title}</img>;
            }
          });
          return;
        })}
      </TD>
      <TD>{total} KM</TD>
    </Container>
    // <Container>
    //   <DateOrdered>Datum : {date}</DateOrdered>
    //   <Products>
    //     {products.map((product) => (
    //       <Product key={product._id}>{product.quantity}</Product>
    //     ))}
    //   </Products>
    //   <Total>Iznos: {total} KM</Total>
    // </Container>
  );
};

export default SingleOrder;
