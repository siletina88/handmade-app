import { AutoFixOffSharp } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products");
        console.log(res);
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

  return <Container>{cat ? filteredProducts.map((item) => <Product key={item.id} item={item}></Product>) : products.map((item) => <Product key={item.id} item={item}></Product>)}</Container>;
};

export default Products;
