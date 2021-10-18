import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import Announcment from "../components/Announcment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
// @ts-ignore
// @ts-ignore
import { addProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  background-color: #eae6e5;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const Left = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;
const ImgContainer = styled.div`
  flex: 4;
`;
const ThumbContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  gap: 10px;

  height: 100px;
`;
const Thumbnail = styled.img`
  width: 20%;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 2;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 300;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;

  justify-content: space-between;
  width: 60%;
  margin: 30px 0px;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 300;
  margin-right: 20px;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 2px solid black;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 60%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;

  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #eebcbc;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      quantity < 50 && setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        console.log(product?.img);
      } catch (error) {}
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Navbar></Navbar>
      <Announcment />
      <Wrapper>
        <Left>
          {" "}
          <ImgContainer>
            <Image
              src={
                // @ts-ignore
                product.img
              }
            ></Image>
          </ImgContainer>
          <ThumbContainer>{product.imgAlt ? product.imgAlt.map((item) => <Thumbnail src={item}></Thumbnail>) : <h1>loading</h1>}</ThumbContainer>
        </Left>

        <InfoContainer>
          <Title>
            {
              // @ts-ignore
              product.title
            }
          </Title>
          <Description>
            {
              // @ts-ignore
              product.description
            }
          </Description>
          <Price>£45.49</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Boja</FilterTitle>
              {product &&
                // @ts-ignore
                product.color // @ts-ignore
                  ?.map((c) => <FilterColor onClick={() => setColor(c)} key={c} color={c}></FilterColor>)}
            </Filter>
            <Filter>
              <FilterTitle>Velicina</FilterTitle>
              <FilterSize onClick={(e) => setSize(e.target.value)}>
                <FilterSizeOption>Broj</FilterSizeOption>
                {product &&
                  // @ts-ignore
                  product.size // @ts-ignore
                    ?.map((s) => <FilterSizeOption key={s}>{s}</FilterSizeOption>)}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>
              Dodaj u kosaricu
              <AddShoppingCartIcon style={{ paddingLeft: "5px" }} />
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
