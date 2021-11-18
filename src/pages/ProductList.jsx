import styled from "styled-components";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcment";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #12130f;
  color: white;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ margin: "0px" })}
`;
const Select = styled.select`
  padding: 7px;
  margin-right: 10px;
  color: white;
  border-radius: 3px;
  background: black;
  &:focus {
    outline: 2px solid white;
  }
  ${mobile({ margin: "10px 0px" })};
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({ ...filter, [e.target.name]: value.toLowerCase() });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Container>
      <Announcment></Announcment>

      <FilterContainer>
        <Filter>
          <FilterText>Filtriraj Artikle:</FilterText>

          <Select name='size' onChange={handleFilter}>
            <Option disabled>Velicina</Option>

            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sortiraj Artikle:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value='newest'>Najnovije</Option>
            <Option value='asc'>Najjeftinije</Option>
            <Option value='desc'>Najskuplje</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filter={filter} sort={sort}></Products>
      <Footer></Footer>
    </Container>
  );
};

export default ProductList;
