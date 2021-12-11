import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Announcment, Footer, ModalClassic, AlertModal, Order } from "../components";
import { removeProduct } from "../redux/cartSlice";
import { getCart, removeItemFromCart } from "../redux/apiCalls";
import { getUserInfoAndCart } from "../redux/actions";
import { getCartId } from "../customFunctions";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Wrapper = styled.div`
  padding: 20px;
  min-height: 60vh;
  overflow: hidden;
  width: 95%;
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
  ${tablet({ display: "none" })}
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
  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
`;
const Image = styled.img`
  width: 200px;

  max-height: 150px;
  object-fit: cover;
  ${tablet({ maxWidth: "180px", maxHeight: "140px" })};
  ${mobile({ maxWidth: "150px", maxHeight: "120px" })};
`;
const Details = styled.div`
  padding: 5px 20px;
  display: flex;
  gap: 10px;
  margin-top: 15px;

  flex-direction: column;

  justify-content: flex-start;
  ${tablet({ padding: "0px 15px" })}
  ${mobile({ padding: "0px 30px" })}
`;
const ProductName = styled.span`
  font-weight: bold;
  font-size: 18px;
  ${mobile({ fontSize: "14px" })}
`;
const ProductDescription = styled.span`
  font-size: 14px;

  ${mobile({ fontSize: "10px" })}
`;
const ProductId = styled.span`
  ${mobile({ fontSize: "12px" })}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  box-shadow: 0px 1px 1px gray;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  text-transform: uppercase;
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

  ${tablet({ margin: "10px" })}
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
  ${tablet({ marginBottom: "20px", fontSize: "26px" })}
  ${mobile({ marginBottom: "20px", fontSize: "26px" })}
`;

const Remove = styled.div`
  position: absolute;
  top: 15px;
  right: 5px;
  ${tablet({ top: "20px", right: "-5px" })}
`;
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
  ${mobile({ width: "80%", margin: "10px auto" })}
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
  margin-top: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;

  cursor: pointer;
`;

const Cart = () => {
  const [ordered, setOrdered] = useState(false);
  const [showOrderWindow, setShowOrderWindow] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const checkUser = () => {
    if (user) {
      const id = useSelector((state) => state.user.currentUser._id);
      return id;
    } else {
      const id = "public";
      return id;
    }
  };
  const id = checkUser();

  const cart = useSelector((state) => state.cart);
  const handleRemove = async (e, product) => {
    setShowSuccessAlert(false);
    setShowFailureAlert(false);
    e.preventDefault();
    const cartId = cart._id;
    const productId = product.product._id;
    const cartPrice = product.product.price * product.quantity;

    if (user) {
      const res = await removeItemFromCart(cartId, productId, cartPrice, dispatch);
      if (res === "success") {
        dispatch(removeProduct(product));
        setShowSuccessAlert(true);
        return;
      } else {
        setShowFailureAlert(true);
        return;
      }
    } else {
      dispatch(removeProduct(product));
      setShowSuccessAlert(true);
    }
  };

  useEffect(() => {
    if (user) {
      getUserInfoAndCart(user, getCartId(cart), dispatch);
    } else return;
  }, []);

  return (
    <>
      <Announcment></Announcment>
      <Container>
        <Wrapper>
          <Title>VASA KOSARICA </Title>
          <Top>
            <Link to='/'>
              <TopButton>NASTAVI SA KUPOVANJEM</TopButton>
            </Link>
            <TopTexts>
              <TopText>KOSARICA ({cart?.quantity})</TopText>
              <TopText>LISTA ZELJA (2)</TopText>
            </TopTexts>
            <TopButton type='filled'>ZAPOCNI NARUDZBU</TopButton>
          </Top>
          {cart.products.length ? (
            <Bottom>
              <Info>
                <Hr />
                {cart.products.map((product) => (
                  <div key={product.product._id}>
                    {product ? (
                      <Product>
                        <Hr />
                        <ProductDetail>
                          <ImageContainer>
                            {" "}
                            <Image src={product.product.img}></Image>
                          </ImageContainer>

                          <Details>
                            <ProductName>{product.product.title}</ProductName>
                            <ProductDescription>{product.product.description}</ProductDescription>
                            {/* <ProductId>
                            <b>ID:</b> {product.product._id}
                          </ProductId> */}
                            <ProductSize>
                              {product.color && (
                                <>
                                  <b>Boja:</b> <ProductColor color={product.color} />
                                </>
                              )}
                            </ProductSize>
                            {product.size && (
                              <ProductSize>
                                <>
                                  <b>Velicina:</b> {product.size}
                                </>
                              </ProductSize>
                            )}
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductAmountContainer>
                            <RemoveIcon />
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <AddIcon />
                          </ProductAmountContainer>
                          <ProductPrice> {(product.product.price * product.quantity).toFixed(2)} KM</ProductPrice>
                        </PriceDetail>
                        <Remove>
                          <HighlightOffIcon style={{ fontSize: "30px", cursor: "pointer", marginRight: "10px" }} onClick={(e) => handleRemove(e, product)}></HighlightOffIcon>
                        </Remove>
                      </Product>
                    ) : (
                      <div>loading...</div>
                    )}
                    <Hr />
                  </div>
                ))}
              </Info>
              <Summary>
                <SummaryTitle>DETALJI KOSARICE</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice> {cart.total ? cart?.total.toFixed(2) : "0.00"} KM</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Cijena dostave</SummaryItemText>
                  <SummaryItemPrice> 5.90 KM</SummaryItemPrice>
                </SummaryItem>

                <SummaryItem>
                  <SummaryItemText>Popust na dostavu</SummaryItemText>
                  <SummaryItemPrice>-5.90 KM</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem
                  // @ts-ignore
                  type='total'
                >
                  <SummaryItemText>UKUPNO</SummaryItemText>
                  <SummaryItemPrice>{cart.total ? cart?.total.toFixed(2) : "0.00"} KM</SummaryItemPrice>
                </SummaryItem>
                <Button onClick={() => setShowOrderWindow(true)}>NARUCI</Button>
              </Summary>
            </Bottom>
          ) : (
            <div style={{ fontSize: "30px", textAlign: "center", fontWeight: "bold", marginTop: "50px", padding: "30px" }}>VASA KOSARICA JE PRAZNA</div>
          )}
          {showOrderWindow && <Order setOrdered={setOrdered} setShowOrderWindow={setShowOrderWindow} showOrderWindow={showOrderWindow}></Order>}

          <ModalClassic
            trigger={ordered}
            type='success'
            heading='Hvala Vam!'
            message='Uspjesno ste obavili narudzbu. Uskoro cete dobiti email sa potvrdom i detaljima narudzbe.'
            redirectTo='/'
            timeout='7000'
          ></ModalClassic>
          <AlertModal trigger={showSuccessAlert} type='success' message='Artikal uklonjen iz kosarice' timeout='2000'></AlertModal>
          <AlertModal trigger={showFailureAlert} type='error' message='Greska, pokusajte kasnije!' timeout='2000'></AlertModal>
        </Wrapper>
        <Footer></Footer>
      </Container>
    </>
  );
};

export default Cart;
