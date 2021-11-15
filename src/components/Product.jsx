import styled from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { mobile, tablet } from "../responsive";

const ProductTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  flex: 7;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9696968d;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  transition: all 0.5s ease-out;
  cursor: pointer;
  &:hover {
    background-color: #f82c73;
    transform: scale(1.2);
    color: white;
  }
`;
const Description = styled.div`
  display: flex;

  flex-direction: column;
  gap: 5px;
  width: 90%;

  padding-top: 15px;
  padding-bottom: 25px;

  flex: 1;
`;
const Title = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: #636363;
  text-transform: uppercase;
`;
const Price = styled.p`
  font-size: 14px;
  color: #636363;
  font-weight: bold;
`;
const ItemDesc = styled.p`
  font-size: 14px;
  text-decoration: italic;
  padding-bottom: 10px;
  color: white;
`;
const Colors = styled.div`
  display: flex;
  align-items: center;
  color: #12130f;
  gap: 5px;
  font-size: 12px;
`;
const Color = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  border: 1px solid black;
  margin-right: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 3px;
  background-color: #f5f5f5;
  box-shadow: 1px 4px 9px -2px rgba(0, 0, 0, 0.301);

  min-width: 300px;
  height: 450px;

  align-items: center;
  justify-content: space-between;

  position: relative;
  overflow: hidden;

  &:hover ${Info} {
    opacity: 1;
  }
`;
// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

const ImgContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  border-radius: 3px;

  height: 450px;

  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;

  z-index: 2;
  ${mobile({ height: "100%", width: "100%" })}
  object-fit:cover;
  object-position: center;
`;

const Product = ({ item }) => {
  return (
    <Container>
      <ProductTop>
        <ImgContainer>
          <Image src={item.img}></Image>
        </ImgContainer>
        <Info>
          <Icon>
            <AddShoppingCartIcon />
          </Icon>
          <Link to={`/product/${item._id}`}>
            <Icon>
              <SearchIcon />
            </Icon>
          </Link>
          <Icon>
            <FavoriteBorderIcon />
          </Icon>
        </Info>
      </ProductTop>
      <Description>
        <Title>{item.title}</Title>
        <Price>{item.price} KM</Price>
        {/* <Colors>
          Boje:
          {item.color.map((color) => (color ? <Color color={color}></Color> : ""))}
        </Colors> */}
        {/* <ItemDesc>{item.description}</ItemDesc> */}
      </Description>
    </Container>
  );
};

export default Product;
