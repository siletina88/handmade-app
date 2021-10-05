import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import styled from 'styled-components'
import Announcment from '../components/Announcment'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'

const Container = styled.div``
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: 'column', padding: '10px' })}
`
const ImgContainer = styled.div`
  flex: 1;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight: 300;
`
const Description = styled.p`
  margin: 20px 0px;
`
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 30px 0px;
  ${mobile({ width: '100%' })}
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
  width: 60%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid palevioletred;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 2px solid palevioletred;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #eebcbc;
  }
`

const Product = () => {
  return (
    <Container>
      <Announcment />
      <Navbar></Navbar>
      <Wrapper>
        <ImgContainer>
          <Image src="https://cdn.shopify.com/s/files/1/2579/7674/products/AnaLuisaNecklacesPendantNecklacesMoonstonePendantNecklaceRebeccaGold.jpg?v=1629806161"></Image>
        </ImgContainer>
        <InfoContainer>
          <Title>Moja ogrlica</Title>
          <Description>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            cupiditate ea laborum, ipsam sed numquam neque aut autem tempora
            est?
          </Description>
          <Price>£45.49</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Boja</FilterTitle>
              <FilterColor color="black"></FilterColor>
              <FilterColor color="darkblue"></FilterColor>
              <FilterColor color="gray"></FilterColor>
            </Filter>
            <Filter>
              <FilterTitle>Velicina</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon />
              <Amount>1</Amount>
              <AddIcon />
            </AmountContainer>
            <Button>
              Dodaj u kosaricu{' '}
              <AddShoppingCartIcon style={{ paddingLeft: '5px' }} />
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
