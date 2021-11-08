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
import { addProduct } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/apiCalls";
import { handleQuantity } from "../customFunctions";

const Container = styled.div`
  background-color: #eae6e5;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;
const ImgContainer = styled.div`
  border: 1px solid lightgray;
`;
const ThumbContainer = styled.div`
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
  padding: 0px 30px;
  padding-top: 30px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 500;
`;
const Description = styled.p`
  margin: 40px 0px;
  font-weight: 300;
`;
const Price = styled.span`
  font-weight: 300;
  font-size: 32px;
`;

const FilterContainer = styled.div`
  display: flex;

  justify-content: space-between;
  width: 60%;
  margin: 20px 0px;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 16px;
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
  margin-bottom: 20px;
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

  background-color: #f82c73;
  cursor: pointer;
  color: white;

  font-weight: 400;
  &:hover {
    background-color: #f82c73c8;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.cart.products);

  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  let userId;
  let cartId;

  const getUserIdAndCartId = () => {
    if (user) {
      return (userId = user._id), (cartId = user.cart._id);
    } else return;
  };

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

  const handleClick = () => {
    const cart = { ...product, color, size };

    const item = { product: cart, quantity: Number(quantity) };

    if (cartItems.length > 0) {
      let existInCart = false;
      const checkIfExists = () => {
        cartItems.map((cartItem) => {
          if (product._id === cartItem.product._id) {
            existInCart = true;
            return;
          }
        });
      };
      checkIfExists();
      if (!existInCart) {
        dispatch(addProduct({ ...product, quantity, color, size }));
        updateCart(cartId, item, userId, dispatch);
      } else return;
    } else {
      dispatch(addProduct({ ...product, quantity, color, size }));
      updateCart(cartId, item, userId, dispatch);
    }
  };

  return (
    <Container>
      <Navbar></Navbar>
      <Announcment />
      <Wrapper>
        <Left>
          {" "}
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
              product.title
            }
          </Title>
          <Description>
            {
              // @ts-ignore
              product.description
            }
          </Description>
          <Price>{product?.price} KM</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Boja:</FilterTitle>
              {product &&
                // @ts-ignore
                product.color // @ts-ignore
                  ?.map((c) => <FilterColor onClick={() => setColor(c)} key={c} color={c}></FilterColor>)}
            </Filter>
            <Filter>
              <FilterTitle>Velicina:</FilterTitle>
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
              <RemoveIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("dec", quantity, setQuantity)} />
              <Amount>{quantity}</Amount>
              <AddIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("inc", quantity, setQuantity)} />
            </AmountContainer>
          </AddContainer>
          <Button onClick={handleClick}>Dodaj u kosaricu</Button>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
