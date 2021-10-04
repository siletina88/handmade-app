import styled from 'styled-components'
import Announcment from '../components/Announcment'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'

const Container = styled.div``
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`
const ImgContainer = styled.div`
  flex: 1;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
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
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
