import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 2s ease;
  ${tablet({ height: "60vh" })}
  ${mobile({ height: "30vh" })}
`;
const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 70vh;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  ${tablet({ margin: "0px", paddingTop: "10px" })}
  ${mobile({ margin: "0px", paddingTop: "5px" })}
  &:hover ${Image} {
    transform: scale(1.2);
  }
`;
const Info = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  text-shadow: 2px 2px 2px #000000a7;
  margin-bottom: 20px;
  text-align: center;
`;
const Button = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #ffc5c5d5;
  color: #12130f;
  cursor: pointer;
  font-weight: 500;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img}></Image>
        <Info>
          <Title>{item.title}</Title>
          <Button>POGLEDAJ</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
