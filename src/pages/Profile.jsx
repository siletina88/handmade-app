import styled from "styled-components";
import Announcment from "../components/Announcment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import UserOrders from "../components/UserOrders";

const Container = styled.div`
  background-color: #eae6e5;
`;
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  overflow: hidden;

  ${mobile({ flexDirection: "column", padding: "20px 5px" })}
`;
const Card = styled.div`
  display: flex;
  width: 100%;
  ${mobile({ flexDirection: "column" })}

  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0px 0px 10px 0px rgba(161, 161, 161, 0.274);
`;
const Left = styled.div`
  flex: 1;
  background-color: #ffffffe1;

  position: sticky;
  top: 0;
  left: 0;

  box-shadow: 4px 0px 14px 0px rgba(161, 161, 161, 0.274);
  z-index: 2;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f82c73;
  ${mobile({ height: "170px" })}
`;
const Avatar = styled.img`
  width: 140px;

  object-fit: cover;
  height: 140px;
  border-radius: 50%;
  border: 1px solid white;
  ${mobile({ width: "140px", height: "140px" })}
`;
const DefAvatar = styled.div`
  display: flex;
  align-items: center;

  justify-content: center;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  font-size: 60px;
  background-color: #d1d1d1;
  color: #f82c73;
  ${mobile({ width: "140px", height: "140px" })}
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f82c73;
  padding-bottom: 20px;
  gap: 10px;
`;
const Role = styled.span`
  font-size: 12px;
  color: white;
`;
const Username = styled.p`
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 0.5;
`;
const MenuList = styled.ul`
  display: flex;
  height: 100%;
  overflow: hidden;

  padding: 0;
  padding-top: 40px;

  flex-direction: column;

  margin: 0;

  list-style: none;
  ${mobile({ paddingTop: "5px" })}
`;
const MenuListItem = styled.li`
  padding: 20px;
  padding-left: 30px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  cursor: pointer;

  color: black;
  border-bottom: 1px solid lightgray;
  position: relative;
  ${mobile({ borderTop: "2px solid  #eae6e5" })}
  &:hover {
    background-color: #e9e9e9;

    &:before {
      content: " ";
      position: absolute;
      height: 100%;
      width: 10px;
      background-color: #f82c73;
      top: 0;
      left: 0;
    }
  }
`;
const Right = styled.div`
  background-color: #ffffffc3;
  flex: 3;
  padding: 40px;
  overflow: hidden;
  ${mobile({ padding: "5px" })}
`;

const StyledNavLink = styled(NavLink)`
  color: blue;
  position: relative;

  &:hover {
    background-color: #e9e9e9;
  }

  &.active {
    background-color: #e9e9e9;

    &:before {
      content: " ";
      position: absolute;
      height: 100%;
      width: 10px;
      background-color: #f82c73;
      top: 0;
      left: 0;
    }
  }
`;

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Navbar></Navbar>
      <Announcment />
      <Wrapper>
        <Card>
          <Left>
            <ImgContainer>{user?.img ? <Avatar src={user?.img}></Avatar> : <DefAvatar>{user?.username.charAt(0).toUpperCase()}</DefAvatar>}</ImgContainer>
            <InfoContainer>
              <Role>Korisnik</Role>
              <Username>{user?.username}</Username>
            </InfoContainer>
            <MenuList>
              <StyledNavLink exact={true} activeClassName='active' style={{ textDecoration: "none" }} to='/profile'>
                <MenuListItem>Profil</MenuListItem>
              </StyledNavLink>
              <StyledNavLink exact={true} activeClassName='active' style={{ textDecoration: "none" }} to='/profile/orders'>
                <MenuListItem>Moje narudzbe</MenuListItem>
              </StyledNavLink>

              <MenuListItem>Lista zelja</MenuListItem>
              <StyledNavLink exact={true} activeClassName='active' style={{ textDecoration: "none" }} to='/profile/password'>
                <MenuListItem>Promjeni sifru</MenuListItem>
              </StyledNavLink>
            </MenuList>
          </Left>
          <Right>
            <Route exact path='/profile'>
              <EditProfile></EditProfile>
            </Route>
            <Route exact path='/profile/orders'>
              <UserOrders></UserOrders>
            </Route>
            <Route exact path='/profile/password'>
              <ChangePassword></ChangePassword>
            </Route>
          </Right>
        </Card>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Profile;
