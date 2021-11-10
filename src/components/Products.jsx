import { AutoFixOffSharp } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";

const Title = styled.h1`
  text-align: center;

  padding: 20px;
  padding-top: 40px;
  font-size: 50px;
  letter-spacing: 5px;
  text-transform: uppercase;
  background: linear-gradient(#f82c7318, #f5fafd);
  text-shadow: 0px 1px #22241d29;

  color: white;
  ${mobile({ fontSize: "20px", padding: "10px" })};
`;

const Container = styled.div`
  padding: 40px 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  background-color: #f5fafd;
  ${mobile({ padding: "20px" })};
`;

const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(cat ? `products?category=${cat}` : "products");
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat && setFilteredProducts(products.filter((item) => Object.entries(filter).every(([key, value]) => item[key].includes(value))));
  }, [products, cat, filter]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <>
      <Title>Artikli</Title>
      <Container>
        {cat ? filteredProducts.map((item) => <Product key={item._id} item={item}></Product>) : products.slice(0, 12).map((item) => <Product key={item._id} item={item}></Product>)}
      </Container>
    </>
  );
};

export default Products;
