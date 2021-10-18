import styled from "styled-components";
import Announcment from "../components/Announcment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) =>
    // @ts-ignore
    props.type === "filled" && "2px solid black"};
  color: ${(props) =>
    // @ts-ignore
    props.type === "filled" && "white"};
  background-color: ${(props) =>
    // @ts-ignore
    props.type === "filled" ? "black" : "transparent"};
  ${mobile({ margin: "10px", padding: "5px" })}
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-size: 14px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  max-height: 150px;
  object-fit: cover;
  ${mobile({ maxWidth: "150px", maxHeight: "120px" })};
`;
const Details = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "0px 15px" })}
`;
const ProductName = styled.span`
  ${mobile({ fontSize: "12px" })}
`;
const ProductId = styled.span`
  ${mobile({ fontSize: "12px" })}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`
  ${mobile({ fontSize: "12px" })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ margin: "20px" })}
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "0px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px", fontSize: "26px" })}
`;

const Remove = styled.div``;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;

  padding: 20px;
  height: auto;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) =>
    // @ts-ignore
    props.type === "total" && "600"};
  font-size: ${(props) =>
    // @ts-ignore
    props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Cart = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const handleRemove = (e, product) => {
    e.preventDefault();

    dispatch(removeProduct(product));
  };
  return (
    <Container>
      <Navbar></Navbar>
      <Announcment></Announcment>
      <Wrapper>
        <Title>VASA KOSARICA </Title>
        <Top>
          <Link to='/'>
            <TopButton>NASTAVI SA KUPOVANJEM</TopButton>
          </Link>
          <TopTexts>
            <TopText>KOSARICA ({cart.quantity})</TopText>
            <TopText>LISTA ZELJA (2)</TopText>
          </TopTexts>
          <TopButton
            // @ts-ignore
            type='filled'
          >
            ZAPOCNI NARUDZBU
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <>
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img}></Image>
                    <Details>
                      <ProductName>
                        <b>Artikal:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Velicina:</b> {product.size.toUpperCase()}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <RemoveIcon></RemoveIcon>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <AddIcon></AddIcon>
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                  </PriceDetail>
                  <Remove>
                    <HighlightOffIcon style={{ fontSize: "30px", cursor: "pointer", marginRight: "10px" }} onClick={(e) => handleRemove(e, product)}></HighlightOffIcon>
                  </Remove>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>DETALJI KOSARICE</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Cijena dostave</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Popust na dostavu</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem
              // @ts-ignore
              type='total'
            >
              <SummaryItemText>UKUPNO</SummaryItemText>
              <SummaryItemPrice>$ {Math.floor(cart.total)}</SummaryItemPrice>
            </SummaryItem>
            <Button>NARUCI</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer></Footer>
    </Container>
  );
};

export default Cart;
