import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RoomIcon from "@mui/icons-material/Room";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../responsive";
import logo from "../logo6.png";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #12130f;

  overflow-x: hidden;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: white;
`;
const Logo = styled.img`
  width: 200px;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  /* border-radius: 50%; */
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
  color: white;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#565656" })};
  color: white;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo src={logo}></Logo>
        <Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sed vel eius nobis temporibus eum maiores facere quos. Neque, minus!</Description>
        <SocialContainer>
          <SocialIcon color='#3B5999'>
            <FacebookIcon></FacebookIcon>
          </SocialIcon>
          <SocialIcon color='#E4405F'>
            <InstagramIcon></InstagramIcon>
          </SocialIcon>
          <SocialIcon color='#55ACEE'>
            <TwitterIcon></TwitterIcon>
          </SocialIcon>
          <SocialIcon color='#E60023'>
            <PinterestIcon></PinterestIcon>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Korisni Linkovi</Title>
        <List>
          <ListItem>Pocetna</ListItem>
          <ListItem>Moja kosarica</ListItem>
          <ListItem>Ogrlice</ListItem>
          <ListItem>Lancici</ListItem>
          <ListItem>Torbe</ListItem>
          <ListItem>Moj nalog</ListItem>
          <ListItem>Pracenje posiljke</ListItem>
          <ListItem>Lista zelja</ListItem>
          <ListItem>Uslovi koristenja</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Kontakt</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} />
          Kralja Aleksandra 23
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{ marginRight: "10px" }} />
          +387 66 419 539
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />
          contact@corina.com
        </ContactItem>
        <Payment src='https://i.ibb.co/Qfvn4z6/payment.png'></Payment>
      </Right>
    </Container>
  );
};

export default Footer;
