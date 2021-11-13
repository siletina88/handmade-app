import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton } from "@mui/material";
import { NoEncryption, ShoppingCart } from "@mui/icons-material";
import { mobile, tablet } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import logo from "../logo6.png";

const Container = styled.div`
  height: 95px;

  background-color: #12130f;
  ${tablet({ height: "160px" })}
  ${mobile({ height: "160px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  ${tablet({ padding: "10px 0px", flexDirection: "column" })}
  ${mobile({ padding: "10px 0px", flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${tablet({ display: "none" })}
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
  width: 200px;
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
    font-size: 12px;
  }

  &:focus {
    outline: none;
  }
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({ flex: "3", paddingLeft: "15px", paddingTop: "10px" })}
  ${mobile({ flex: "3", paddingLeft: "15px", paddingTop: "10px" })}
`;
const Logo = styled.img`
  width: 280px;
  padding-left: 25px;
  ${tablet({ width: "300px" })}
  ${mobile({ width: "300px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${mobile({ width: "100%", alignItems: "center", justifyContent: "center", flex: "3" })}
`;
const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  margin-left: 25px;
  transition: all 0.3s ease;
  &:hover {
    color: #ff5b94;
  }
  ${tablet({ fontSize: "16px", marginLeft: "0", justifyContent: "space-between", gap: "30px", paddingRight: "10px", paddingLeft: "10px" })}
  ${mobile({ fontSize: "16px", marginLeft: "0", justifyContent: "space-between", gap: "30px", paddingRight: "10px", paddingLeft: "10px" })}
`;

const NavItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 7px;
  ${tablet({ height: "40px", width: "40px", marginRight: "10px" })}
  ${mobile({ height: "40px", width: "40px", marginRight: "10px" })}
`;

const VR = styled.div`
  border-right: 1px solid gray;
  height: 30px;
  width: 1px;
  display: none;
  ${tablet({ display: "block" })}
  ${mobile({ display: "block" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const history = useHistory();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.currentUser);
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    history.push("/");
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
          <Link to='/'>
            <Logo src={logo}></Logo>
          </Link>
        </Center>
        <Right>
          {loggedIn ? (
            <>
              <Link to='/profile'>
                <NavItem>
                  <NavItemContainer>
                    <Avatar src={user.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}></Avatar>
                    Hi, {user.username}
                  </NavItemContainer>
                </NavItem>
              </Link>
              <VR></VR>

              <NavItem onClick={handleLogout}>LOGOUT</NavItem>
            </>
          ) : (
            <>
              <VR></VR>
              <NavItem>
                <Link style={{ textDecoration: "none" }} to='/register'>
                  <NavItem>REGISTRACIJA</NavItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to='/login'>
                  <NavItem>LOGIN</NavItem>
                </Link>
              </NavItem>
            </>
          )}
          <VR></VR>
          <NavItem>
            <Link to='/cart'>
              <IconButton aria-label='cart'>
                <Badge badgeContent={quantity} color='secondary'>
                  <ShoppingCart color='info' />
                </Badge>
              </IconButton>
            </Link>
          </NavItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
