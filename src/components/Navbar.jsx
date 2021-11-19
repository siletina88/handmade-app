import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton } from "@mui/material";
import { NoEncryption, ShoppingCart } from "@mui/icons-material";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { mobile, tablet } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import logo from "../logo6.png";

const Container = styled.div`
  height: 120px;
  display: flex;
  width: auto;
  position: static;
  top: -100px;

  transition: top 0.3s linear;

  background-color: #12130f;
  ${tablet({ height: "120px" })}
  ${mobile({ height: "60px", width: "100vw", position: "sticky", top: "0" })}
  ${(props) =>
    props.active &&
    css`
      display: flex;
      width: 100%;
      align-items: center;
      position: sticky;
      top: 0;
      justify-content: space-between;
      transform: translateY(-60px);

      box-shadow: 0px 2px 2px #12130f5a;
      ${tablet({ transform: "translateY(-60px)" })};
      ${mobile({ position: "sticky", top: "0", transform: "translateY(0px)", boxShadow: "none" })};
    `};

  z-index: 9;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 10px 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;

  ${mobile({ padding: "0px 0px", flexDirection: "column" })}
  ${(props) =>
    props.active &&
    css`
      transform: translateY(30px);
      ${tablet({ transform: "translateY(30px)", padding: "0px 0px" })};
      ${mobile({ transform: "translateY(0px)" })};
    `};
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
  ${tablet({ flex: "3", paddingLeft: "15px", paddingTop: "10px", justifyContent: "flex-start" })}
`;
const Logo = styled.img`
  width: 300px;
  padding-left: 25px;
  ${tablet({ width: "220px" })}
  ${mobile({ width: "150px" })}

  ${(props) =>
    props.active &&
    css`
      width: 170px;
      ${tablet({ width: "150px" })}
      ${mobile({ width: "150px" })}
    `};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${mobile({ display: "none" })}
  ${tablet({ flex: "2" })}
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
  ${tablet({ display: "none" })}
  ${mobile({ display: "block" })}
`;

const HamburgerIcon = styled.div`
  display: none;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `};
  position: absolute;
  width: 30px;
  height: 26px;
  top: 15px;
  left: 10px;
  z-index: 10000000;
  background: black;
  border: 1px solid white;

  border-radius: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
`;

const HamburgerLinesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const HamburgerLine = styled.div`
  height: 2px;
  width: 20px;
  position: absolute;
  background-color: white;
  transition: transform 0.5s ease;
  &:nth-child(1) {
    top: 7px;
    ${(props) =>
      props.active &&
      css`
        left: 16%;
        top: 12px;
        transform: rotate(45deg);
        transform-origin: center;
      `};
  }
  &:nth-child(2) {
    top: 12px;
    opacity: 1;
    transition: transform 0.5s ease, opacity: 0.3s ease;
    ${(props) =>
      props.active &&
      css`
        opacity: 0;
        transform: translateX(30px);
      `};
  }
  &:nth-child(3) {
    top: 17px;
    ${(props) =>
      props.active &&
      css`
        top: 12px;
        left: 16%;
        transform: rotate(-45deg);
        transform-origin: center;
      `};
  }
`;

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: #12130f;
  position: fixed;
  top: 60px;

  overflow: hidden;
  height: 100vh;
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 0.3s ease;
  box-shadow: 0px 1px 6px #0000007d;

  z-index: 99;

  ${(props) =>
    props.active &&
    css`
      transform: translateX(0px);
      opacity: 1;
    `};
`;

const MobileMenuProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background-color: #f82c73;
  padding: 20px 0px;
`;

const MobileMenuUsername = styled.p`
  color: white;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;
const MobileMenuProfileAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid white;
`;
const MobileMenuProfileAvatar = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
const MobileMenuWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  padding-left: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 500px;
  gap: 20px;
`;
const MobileMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
  cursor: pointer;
`;
const MobileMenuIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const MobileMenuText = styled.p`
  display: flex;
  font-weight: bold;
  color: white;
`;
const CartIcon = styled.div`
  display: none;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 15px;
  right: 10px;
  z-index: 100000200;

  border-radius: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `};
`;

const Navbar = () => {
  const [mobile, setMobile] = useState(window.innerWidth > 450 ? false : true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", toggleHamburgerVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", toggleHamburgerVisibility);
    };
  }, []);

  const handleScroll = () => {
    const isTop = window.scrollY <= 119;
    if (!isTop) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const toggleHamburgerVisibility = () => {
    const width = window.innerWidth;
    if (width < 450) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  const handleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Container active={scroll ? true : false}>
      <MobileMenuContainer onClick={closeMobileMenu} active={mobileMenuOpen ? true : false}>
        {user ? (
          <>
            <MobileMenuProfileContainer>
              <MobileMenuProfileAvatarContainer>
                <MobileMenuProfileAvatar src={user.img ? user.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
              </MobileMenuProfileAvatarContainer>
              <MobileMenuUsername>
                Pozdrav, <span>{user.username}</span>
              </MobileMenuUsername>
            </MobileMenuProfileContainer>
            <MobileMenuWrapper>
              <MobileMenuItem>
                <MobileMenuIcon>
                  <AccountCircleIcon />
                </MobileMenuIcon>
                <Link style={{ textDecoration: "none" }} to='/profile'>
                  <MobileMenuText>MOJ PROFIL</MobileMenuText>
                </Link>
              </MobileMenuItem>
              <MobileMenuItem>
                <MobileMenuIcon>
                  <ShoppingCartIcon />
                </MobileMenuIcon>
                <Link style={{ textDecoration: "none" }} to='/cart'>
                  <MobileMenuText>MOJA KOSARICA {quantity > 0 && `(${quantity})`}</MobileMenuText>
                </Link>
              </MobileMenuItem>
              <MobileMenuItem>
                <MobileMenuIcon>
                  <ShopTwoIcon />
                </MobileMenuIcon>
                <Link style={{ textDecoration: "none" }} to='/profile/orders'>
                  <MobileMenuText>MOJE NARUDZBE</MobileMenuText>
                </Link>
              </MobileMenuItem>
              <MobileMenuItem>
                <MobileMenuIcon>
                  <PowerSettingsNewIcon />
                </MobileMenuIcon>

                <MobileMenuText onClick={handleLogout}>LOGOUT</MobileMenuText>
              </MobileMenuItem>
            </MobileMenuWrapper>
          </>
        ) : (
          <MobileMenuWrapper>
            <MobileMenuItem>
              <MobileMenuIcon>
                <AccountCircleIcon />
              </MobileMenuIcon>
              <Link style={{ textDecoration: "none" }} to='/login'>
                <MobileMenuText>LOGIRAJ SE</MobileMenuText>
              </Link>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileMenuIcon>
                <HowToRegIcon />
              </MobileMenuIcon>
              <Link style={{ textDecoration: "none" }} to='/register'>
                <MobileMenuText>KREIRAJ NALOG</MobileMenuText>
              </Link>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileMenuIcon>
                <ShoppingCartIcon />
              </MobileMenuIcon>
              <Link style={{ textDecoration: "none" }} to='/cart'>
                <MobileMenuText>MOJA KOSARICA {quantity > 0 && `(${quantity})`}</MobileMenuText>
              </Link>
            </MobileMenuItem>
          </MobileMenuWrapper>
        )}
      </MobileMenuContainer>
      <HamburgerIcon active={mobile ? true : false} onClick={handleMobileMenu}>
        <HamburgerLinesContainer>
          <HamburgerLine active={mobileMenuOpen ? true : false}></HamburgerLine>
          <HamburgerLine active={mobileMenuOpen ? true : false}></HamburgerLine>
          <HamburgerLine active={mobileMenuOpen ? true : false}></HamburgerLine>
        </HamburgerLinesContainer>
      </HamburgerIcon>
      <CartIcon active={mobile ? true : false}>
        <Link to='/cart'>
          <IconButton aria-label='cart'>
            <Badge badgeContent={quantity} color='secondary'>
              <ShoppingCart color='info' />
            </Badge>
          </IconButton>
        </Link>
      </CartIcon>
      <Wrapper active={scroll ? true : false}>
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
            <Logo active={scroll ? true : false} src={logo}></Logo>
          </Link>
        </Center>
        <Right>
          {loggedIn ? (
            <>
              <Link to='/profile'>
                <NavItem>
                  <NavItemContainer>
                    <Avatar src={user?.img ? user?.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}></Avatar>
                    Hi, {user?.username}
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
