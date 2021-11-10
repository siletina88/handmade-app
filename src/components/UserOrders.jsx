import styled from "styled-components";

import { mobile } from "../responsive";
import { useLocation, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import SingleOrder from "./SingleOrder";
import { publicRequest, userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Title = styled.h1`
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  overflow: hidden;
  padding: 0;
  margin: 0;
  border: 2px solid black;
  border-radius: 10px;
`;
const Table = styled.table`
  border-collapse: collapse;

  font-size: 0.9em;

  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;
const TableBody = styled.tbody``;
const TableHead = styled.thead`
  border-bottom: 2px solid black;
`;
const TableRow = styled.tr`
  background-color: #f82c73;
  color: #ffffff;
  text-align: left;
`;
const TableHeadElement = styled.th`
  padding: 12px 15px;
  border-right: 2px solid black;
`;

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.user.currentUser._id);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllOrders = async () => {
    const res = await userRequest(`orders/get/${userId}`);
    setOrders(res.data);
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
    <>
      <Title>Moje narudzbe</Title>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadElement>Datum narudzbe</TableHeadElement>
              <TableHeadElement>Status</TableHeadElement>
              <TableHeadElement>Artikli</TableHeadElement>
              <TableHeadElement>ID</TableHeadElement>
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
    </>
  );
};

export default UserOrders;
