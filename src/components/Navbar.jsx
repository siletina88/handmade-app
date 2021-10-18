import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton } from "@mui/material";
import { NoEncryption, ShoppingCart } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import logo from "../logo6.png";

const Container = styled.div`
  height: 95px;

  background-color: #12130f;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;
const Language = styled.div`
  font-style: 14px;
  display: flex;
  gap: 0.5rem;
  ${mobile({ display: "none" })}
`;
const LanguageOption = styled.span`
  font-style: 14px;
  cursor: pointer;
`;
const LanguageFlag = styled.img`
  width: 30px;
`;

const SearchContainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
  border-radius: 5px;
  background-color: #565656;

  ${mobile({ marginLeft: "10px", width: "50px", border: "none" })};
`;
const Input = styled.input`
  width: 100%;
  border: none;
  background-color: #565656;
  padding-left: 10px;
  font-size: 14px;
  color: white;

  &::placeholder {
    color: white;
  }

  &:focus {
    outline: none;
  }
`;
const Center = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: "2", paddingLeft: "15px", paddingTop: "10px" })}
`;
const Logo = styled.img`
  width: 280px;
  ${mobile({ width: "180px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ justifyContent: "center", flex: "3", gap: "5px" })}
`;
const NavItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "0" })}
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 10px;
  ${mobile({ marginLeft: "0px", height: "30px", width: "30px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.currentUser);
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            <LanguageOption>
              <LanguageFlag src='https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/510px-Flag_of_the_United_Kingdom.svg.png'></LanguageFlag>
            </LanguageOption>
            <LanguageOption>
              <LanguageFlag src='https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg'></LanguageFlag>
            </LanguageOption>
          </Language>
          <SearchContainer>
            <SearchIcon style={{ color: "white", fontSize: "20px", paddingLeft: "10px" }}></SearchIcon>
            <Input placeholder='pretrazi'></Input>
          </SearchContainer>
        </Left>
        <Center>
          <Logo src={logo}></Logo>
        </Center>
        <Right>
          {loggedIn ? (
            <>
              <NavItem>Hello, {user.username}</NavItem>
              <Avatar src={user.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}></Avatar>
              <NavItem onClick={handleLogout}>LOGOUT</NavItem>
            </>
          ) : (
            <>
              <NavItem>REGISTRACIJA</NavItem>
              <Link style={{ textDecoration: "none" }} to='/login'>
                {" "}
                <NavItem>LOGIN</NavItem>
              </Link>
            </>
          )}

          <Link to='/cart'>
            <NavItem>
              <IconButton aria-label='cart'>
                <Badge badgeContent={quantity} color='secondary'>
                  <ShoppingCart color='info' />
                </Badge>
              </IconButton>
            </NavItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
