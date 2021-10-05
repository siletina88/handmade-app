import styled from 'styled-components'
import Announcment from '../components/Announcment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { mobile } from '../responsive'

const Container = styled.div``
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: '10px' })}
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  color: ${(props) => props.type === 'filled' && 'white'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  ${mobile({ margin: '10px', padding: '5px' })}
`
const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-size: 14px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`
const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  ${mobile({ flexDirection: 'column' })}
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`
const Image = styled.img`
  width: 200px;
  max-height: 150px;
  object-fit: cover;
  ${mobile({ maxWidth: '150px', maxHeight: '120px' })};
`
const Details = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: '0px 15px' })}
`
const ProductName = styled.span`
  ${mobile({ fontSize: '12px' })}
`
const ProductId = styled.span`
  ${mobile({ fontSize: '12px' })}
`
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`
const ProductSize = styled.span`
  ${mobile({ fontSize: '12px' })}
`

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ margin: '20px' })}
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '0px 15px' })}
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px', fontSize: '26px' })}
`
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '600'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`

const Cart = () => {
  return (
    <Container>
      <Announcment></Announcment>
      <Navbar></Navbar>
      <Wrapper>
        <Title>VASA KOSARICA </Title>
        <Top>
          <TopButton>NASTAVI SA KUPOVANJEM</TopButton>
          <TopTexts>
            <TopText>KOSARICA (2)</TopText>
            <TopText>LISTA ZELJA (2)</TopText>
          </TopTexts>
          <TopButton type="filled">ZAPOCNI NARUDZBU</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="https://images.pexels.com/photos/906056/pexels-photo-906056.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"></Image>
                <Details>
                  <ProductName>
                    <b>Artikal:</b> VELIKA OGRLICA ZA VAS
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 324342342346
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Velicina:</b> L
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <RemoveIcon></RemoveIcon>
                  <ProductAmount>1</ProductAmount>
                  <AddIcon></AddIcon>
                </ProductAmountContainer>
                <ProductPrice>$ 50</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://images.pexels.com/photos/965981/pexels-photo-965981.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"></Image>
                <Details>
                  <ProductName>
                    <b>Artikal:</b> DRUGA VELIKA OGRLICA
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 45345433543543
                  </ProductId>
                  <ProductColor color="purple" />
                  <ProductSize>
                    <b>Velicina:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <RemoveIcon></RemoveIcon>
                  <ProductAmount>1</ProductAmount>
                  <AddIcon></AddIcon>
                </ProductAmountContainer>
                <ProductPrice>$ 40</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>DETALJI KOSARICE</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Cijena dostave</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Popust na dostavu</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Popust na dostavu</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>UKUPNO</SummaryItemText>
              <SummaryItemPrice>$ 90</SummaryItemPrice>
            </SummaryItem>
            <Button>NARUCI</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer></Footer>
    </Container>
  )
}

export default Cart
