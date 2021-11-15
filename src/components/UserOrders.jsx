import styled from "styled-components";

import { mobile } from "../responsive";

import { useState, useEffect } from "react";

import SingleOrder from "./SingleOrder";
import { publicRequest, userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Wrapper = styled.div``;
const Title = styled.h1`
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", marginTop: "30px" })}
`;
const NoOrders = styled.h3`
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", marginTop: "30px" })}
`;
const NoOrders2 = styled.h4`
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", marginTop: "30px" })}
`;

const TableContainer = styled.div`
  padding: 0;
  margin: 0;
  border: 1px solid black;
  border-radius: 3px;
  width: 100%;
  overflow-x: auto;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  font-size: 0.9em;

  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;
const TableBody = styled.tbody``;
const TableHead = styled.thead`
  border-bottom: 2px solid black;
`;
const TableRow = styled.tr`
  background-color: #12130f;
  color: #ffffff;
  text-align: left;
`;
const TableHeadElement = styled.th`
  padding: 12px 15px;
  text-shadow: 0px 1px #00000075;
  border-right: 1px solid #00000076;

  ${mobile({ fontSize: "12px" })}
`;

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.user.currentUser._id);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllOrders = async () => {
    const res = await userRequest(`orders/get/${userId}`);
    setOrders(res.data);
    console.log(res.data);
  };

  const getProducts = async () => {
    try {
      const res = await publicRequest.get("products");
      setAllProducts(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
    fetchAllOrders();
  }, []);

  return (
    <Wrapper>
      <Title>Moje narudzbe</Title>
      {orders.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadElement>Datum narudzbe</TableHeadElement>
                <TableHeadElement>Status</TableHeadElement>
                <TableHeadElement>Artikli</TableHeadElement>
                {/* <TableHeadElement>ID</TableHeadElement> */}
                <TableHeadElement>Adresa dostave</TableHeadElement>
                <TableHeadElement>Grad</TableHeadElement>
                <TableHeadElement>Cijena</TableHeadElement>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <SingleOrder
                    key={order._id}
                    allProducts={allProducts}
                    id={order._id}
                    address={order.address}
                    city={order.city}
                    total={order.total}
                    products={order.products}
                    createdAt={order.createdAt}
                    status={order.status}
                  ></SingleOrder>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <NoOrders>Trenutno nemate narudzbe...</NoOrders>
          <NoOrders2>Nakon narucivanja, vase narudzbe mozete pratiti ovdje.</NoOrders2>
        </>
      )}
    </Wrapper>
  );
};

export default UserOrders;
