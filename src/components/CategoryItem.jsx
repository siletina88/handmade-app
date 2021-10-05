import styled from 'styled-components'
import { mobile } from '../responsive'

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 2s ease;
  ${mobile({ height: '30vh' })}
`
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  overflow: hidden;
  &:hover ${Image} {
    transform: scale(1.2);
  }
`
const Info = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-align: center;
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img}></Image>
      <Info>
        <Title>{item.title}</Title>
        <Button>PRETRAZI</Button>
      </Info>
    </Container>
  )
}

export default CategoryItem
