import Loading from "./Loading";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { mobile, tablet } from "../responsive";
import { publicRequest } from "../requestMethods";

const Title = styled.h1`
  text-align: center;

  padding: 20px;
  padding-top: 40px;
  font-size: 60px;

  text-transform: uppercase;
  background: linear-gradient(#f82c7318, #f5fafd);
  color: #333333;

  text-shadow: 2px 2px 0px #ffffff, 5px 4px 0px rgba(0, 0, 0, 0.15);
  letter-spacing: 4px;
  ${mobile({ fontSize: "40px", paddingTop: "40px" })};
`;

const Container = styled.div`
  padding: 40px 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  background-color: #f5fafd;
  ${tablet({ padding: "20px" })};
  ${mobile({ padding: "20px" })};
`;

const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(cat ? `products?category=${cat}` : "products");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat && setFilteredProducts(products.filter((item) => Object.entries(filter).every(([key, value]) => item[key].includes(value))));
  }, [products, cat, filter]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => {
          a.createdAt - b.createdAt;
        })
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <>
      <Title>{cat ? `${cat}` : "Artikli"}</Title>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {cat ? filteredProducts.map((item) => <Product key={item._id} item={item}></Product>) : products.slice(0, 12).map((item) => <Product key={item._id} item={item}></Product>)}
        </Container>
      )}
    </>
  );
};

export default Products;
