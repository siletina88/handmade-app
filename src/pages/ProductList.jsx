import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcment from '../components/Announcment'
import Footer from '../components/Footer'
import Products from '../components/Products'

const Container = styled.div``
const Title = styled.h1`
  margin: 20px;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`
const Select = styled.select`
  padding: 7px;
  margin-right: 10px;
`
const Option = styled.option``

const ProductList = () => {
  return (
    <Container>
      <Announcment></Announcment>
      <Navbar></Navbar>
      <Title>Ogrlice</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtriraj Artikle:</FilterText>
          <Select>
            <Option disabled selected>
              Boja
            </Option>
            <Option>Crvena</Option>
            <Option>Crna</Option>
            <Option>Bijela</Option>
            <Option>Plava</Option>
            <Option>Zuta</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Velicina
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sortiraj Artikle:</FilterText>
          <Select>
            <Option selected>Najnovije</Option>
            <Option>Najjeftinije</Option>
            <Option>Najskuplje</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products></Products>
      <Footer></Footer>
    </Container>
  )
}

export default ProductList
