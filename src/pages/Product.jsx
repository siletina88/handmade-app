import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import Announcment from "../components/Announcment";
import Footer from "../components/Footer";
import AlertModal from "../components/AlertModal";

import Newsletter from "../components/Newsletter";
import { mobile, tablet } from "../responsive";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/apiCalls";
import { handleQuantity } from "../customFunctions";

const Container = styled.div`
  background-color: #eae6e5;
  overflow: hidden;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;

  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;
const ImgContainer = styled.div``;
const ThumbContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 5px;
  overflow-x: hidden;
`;
const Thumbnail = styled.img`
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  ${mobile({ minWidth: "30px", maxWidth: "60px", height: "auto" })}
`;
const Image = styled.img`
  width: 100%;
  height: 65vh;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  ${tablet({ height: "60vh" })}
  ${mobile({ height: "30vh" })}
`;
const InfoContainer = styled.div`
  flex: 2;
  padding: 0px 30px;
  padding-top: 30px;

  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 500;
  ${mobile({ paddingTop: "20px", fontSize: "26px" })}
`;
const Description = styled.p`
  margin: 40px 0px;
  font-weight: 300;
  ${mobile({ margin: "20px 0px", fontSize: "16px" })}
`;
const Price = styled.span`
  font-weight: 300;
  font-size: 32px;
  ${mobile({ fontSize: "24px" })}
`;

const FilterContainer = styled.div`
  display: flex;

  justify-content: space-between;
  flex-direction: column;
  width: 60%;
  gap: 20px;
  margin: 20px 0px;
  ${tablet({ width: "100%" })}
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const FilterTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin-right: 5px;
  ${mobile({ marginRight: "5px" })}
`;

const FilterColorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const FilterColor = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 2px;

  background-color: ${(props) => props.color};

  cursor: pointer;
  transition: opacity 0.3s ease;

  border: ${(props) => (props.selected ? "2px solid black" : "none")};
  box-shadow: 0px 1px 1px gray;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    transform: scale(1.1);
    background: black;
  }
`;

const FilterSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const FilterSizeOption = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: gray;
  color: white;
  text-transform: uppercase;
  border: ${(props) => (props.selected ? "2px solid black" : "none")};
  box-shadow: 0px 1px 1px gray;
  transition: background 0.3s ease;
  &:hover {
    background: #000000a4;
  }
  &:active {
    transform: scale(1.1);
    background: black;
  }
`;

const AddContainer = styled.div`
  width: 60%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tablet({ width: "100%", justifyContent: "center" })}
  ${mobile({ width: "100%", justifyContent: "center" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 15px 10px;
  border: none;

  background-color: ${(props) => (props.disabled ? "gray" : "#f82c73")};
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  color: ${(props) => (props.disabled ? "lightgray" : "white")};

  font-weight: 400;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "gray" : " #f82c73c8")};
  }
  &:active {
    background-color: #6d6d6dc6;
  }
  ${tablet({ margin: "0 auto" })}
  ${mobile({ width: "100%", justifyContent: "center" })}
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.cart.products);
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [selected, setSelected] = useState(null);
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  let userId;
  let cartId;

  const getUserIdAndCartId = () => {
    if (user) {
      return (userId = user._id), (cartId = user.cart._id);
    } else return;
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  getUserIdAndCartId();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();

    setCurrentImage(product?.img);
  }, [id, product.img]);

  const handleColor = (e) => {
    setColor(e.target.innerText);
  };

  const handleClick = async () => {
    setShowWarningModal(false);
    setShowSuccessModal(false);
    setShowFailureModal(false);
    setMessage("");
    const item = { product, quantity: Number(quantity), color, size };

    if (cartItems.length > 0) {
      const checkIfExists = async () => {
        let check = false;
        cartItems.map((cartItem) => {
          if (product._id === cartItem.product._id && cartItem.color === color && cartItem.size === size) {
            check = true;
          }
        });
        return check;
      };

      const existInCart = await checkIfExists();

      if (!existInCart) {
        dispatch(addProduct({ ...product, quantity, color, size }));
        const res = await updateCart(cartId, item, userId, dispatch);
        if (res === "success") {
          setMessage("Artikal je dodan u kosaricu!");
          setShowSuccessModal(true);
          setColor("");
          setSize("");
        } else {
          setMessage("Greska, molimo vas pokusajte kasnije");
          setShowFailureModal(true);
        }
      } else {
        setMessage("Artikal je vec u kosarici!");
        setShowWarningModal(true);
        setColor("");
        setSize("");

        return;
      }
    } else {
      dispatch(addProduct({ ...product, quantity, color, size }));
      const res = await updateCart(cartId, item, userId, dispatch);
      if (res === "success") {
        setMessage("Artikal je dodan u kosaricu!");
        setShowSuccessModal(true);
        setColor("");
        setSize("");
      } else {
        setMessage("Greska, molimo vas pokusajte kasnije");
        setShowFailureModal(true);
      }
    }
  };

  return (
    <Container>
      <Announcment />
      <Wrapper>
        {product && (
          <>
            {" "}
            <Left>
              <ImgContainer>
                {currentImage ? (
                  <Image
                    src={
                      // @ts-ignore
                      currentImage
                    }
                  ></Image>
                ) : (
                  <Image src={"https://lh3.googleusercontent.com/proxy/b8B-EmGSEJltLdYxMp0TgmFvRvImP4UTd-y5C0euBUvZ1ntRhFi0p2LAmMw07S_liiAPxiPV5joVTi9LA8WLAtk"}></Image>
                )}
              </ImgContainer>
              <ThumbContainer>{product?.imgAlt ? product.imgAlt.map((item) => <Thumbnail key={item} onClick={() => setCurrentImage(item)} src={item}></Thumbnail>) : <h1>loading</h1>}</ThumbContainer>
            </Left>
            <InfoContainer>
              <Title>
                {
                  // @ts-ignore
                  product?.title
                }
              </Title>
              <Description>
                {
                  // @ts-ignore
                  product?.description
                }
              </Description>
              <Price>{product?.price} KM</Price>
              <FilterContainer>
                {product?.color?.length > 0 && (
                  <Filter>
                    <FilterTitle>Boja:</FilterTitle>
                    <FilterColorContainer>
                      {product &&
                        // @ts-ignore
                        product.color?.map((c) => (
                          <FilterColor selected={c === color ? true : false} onClick={handleColor} key={c} color={c}>
                            {c}
                          </FilterColor>
                        ))}
                    </FilterColorContainer>
                  </Filter>
                )}

                {product?.size?.length > 0 && (
                  <Filter>
                    <FilterTitle>Velicina:</FilterTitle>

                    <FilterSize>
                      {product &&
                        // @ts-ignore
                        product.size?.map((s) => (
                          <FilterSizeOption selected={s === size ? true : false} onClick={() => setSize(s)} key={s}>
                            {s}
                          </FilterSizeOption>
                        ))}
                    </FilterSize>
                  </Filter>
                )}

                <Filter>
                  <FilterTitle>
                    Na stanju: {product?.inStock ? <span style={{ color: "green", fontWeight: "bold" }}>DA</span> : <span style={{ color: "red", fontWeight: "bold" }}>NE</span>}
                  </FilterTitle>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <RemoveIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("dec", quantity, setQuantity)} />
                  <Amount>{quantity}</Amount>
                  <AddIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("inc", quantity, setQuantity)} />
                </AmountContainer>
              </AddContainer>
              <Button disabled={!product?.inStock} onClick={handleClick}>
                Dodaj u kosaricu
              </Button>
            </InfoContainer>
            <AlertModal timeout='2000' trigger={showSuccessModal} message={message} type='success'></AlertModal>
            <AlertModal timeout='2000' trigger={showWarningModal} message={message} type='warning'></AlertModal>
            <AlertModal timeout='2000' trigger={showFailureModal} message={message} type='error'></AlertModal>
          </>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
