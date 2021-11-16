import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import Announcment from "../components/Announcment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile, tablet } from "../responsive";
import { useLocation } from "react-router-dom";
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
  flex: 3;
  display: flex;
  flex-direction: column;
`;
const ImgContainer = styled.div`
  border: 1px solid lightgray;
`;
const ThumbContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid lightgray;
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

const FilterColor = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  cursor: pointer;
  border: 1px solid gray;
  box-shadow: 0px 1px 1px gray;
  &:hover {
    opacity: 0.6;
    box-shadow: 3px 3px 3px black;
  }
  &:active {
    transform: scale(1.3);
  }
`;

const FilterSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const FilterSizeOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: gray;
  color: white;
  text-transform: uppercase;
  border: 1px solid gray;
  box-shadow: 0px 1px 1px gray;
  &:hover {
    opacity: 0.6;
    box-shadow: 3px 3px 3px black;
  }
  &:active {
    transform: scale(1.3);
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

  background-color: #f82c73;
  cursor: pointer;
  color: white;

  font-weight: 400;

  &:hover {
    background-color: #f82c73c8;
  }
  ${tablet({ margin: "0 auto" })}
  ${mobile({ width: "100%", justifyContent: "center" })}
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

  const handleClick = () => {
    const item = { product, quantity: Number(quantity), color, size };

    if (cartItems.length > 0) {
      let existInCart = false;
      const checkIfExists = () => {
        cartItems.map((cartItem) => {
          if (product._id === cartItem.product._id && cartItem.product.color === color && cartItem.product.size === size) {
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
                product.color?.map((c) => <FilterColor onClick={() => setColor(c)} key={c} color={c}></FilterColor>)}
            </Filter>
            <Filter>
              <FilterTitle>Velicina:</FilterTitle>
              <FilterSize>
                {product &&
                  // @ts-ignore
                  product.size?.map((s) => (
                    <FilterSizeOption onClick={() => setSize(s)} key={s}>
                      {s}
                    </FilterSizeOption>
                  ))}
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
