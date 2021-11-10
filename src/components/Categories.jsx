import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;

  background-color: #eae6e5;
  gap: 20px;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", padding: "10px", paddingTop: "20px", paddingBottom: "20px", gap: "0px" })}
`;

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
  padding: 20px;
  padding-top: 40px;
  letter-spacing: 5px;
  text-transform: uppercase;
  background: linear-gradient(#f82c7318, #eae6e5);
  text-shadow: 0px 1px #22241d29;

  color: white;

  ${mobile({ fontSize: "20px", padding: "10px" })}
`;

const Categories = () => {
  return (
    <>
      <Title>Kategorije</Title>
      <Container>
        {categories.map((item) => (
          <CategoryItem key={item.id} item={item}></CategoryItem>
        ))}
      </Container>
    </>
  );
};

export default Categories;
