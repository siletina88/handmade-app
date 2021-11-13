import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;

  background-color: #eae6e5;
  gap: 20px;
  padding: 20px;
  justify-content: space-between;
  ${tablet({ flexDirection: "column", padding: "20px", paddingTop: "20px", paddingBottom: "20px", gap: "0px" })}
  ${mobile({ flexDirection: "column", padding: "10px", paddingTop: "20px", paddingBottom: "20px", gap: "0px" })}
`;

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
  padding: 20px;
  padding-top: 40px;
  font-size: 60px;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: linear-gradient(#f82c7318, #eae6e5);
  color: #333333;

  text-shadow: 2px 2px 0px #ffffff, 5px 4px 0px rgba(0, 0, 0, 0.15);

  ${mobile({ fontSize: "40px", paddingTop: "40px" })}
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
