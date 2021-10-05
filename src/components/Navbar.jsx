import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { Badge, IconButton } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { mobile } from '../responsive'

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid lightgray;

  ${mobile({ height: '50px' })}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  ${mobile({ padding: '10px 0px' })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.div`
  font-style: 14px;
  display: flex;
  gap: 0.5rem;
  ${mobile({ display: 'none' })}
`
const LanguageOption = styled.span`
  font-style: 14px;
  cursor: pointer;
`
const LanguageFlag = styled.img`
  width: 30px;
`

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
  ${mobile({ marginLeft: '10px' })}
`
const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
  &:focus {
    outline: none;
  }
`
const Center = styled.div`
  flex: 2;
  ${mobile({ flex: '1' })}
`
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({ fontSize: '22px' })}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ justifyContent: 'center', flex: '2' })}
`
const NavItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '5px' })}
`

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            <LanguageOption>
              <LanguageFlag src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/510px-Flag_of_the_United_Kingdom.svg.png"></LanguageFlag>
            </LanguageOption>
            <LanguageOption>
              <LanguageFlag src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg"></LanguageFlag>
            </LanguageOption>
          </Language>
          <SearchContainer>
            <SearchIcon
              style={{ color: 'lightgray', fontSize: '16px' }}
            ></SearchIcon>
            <Input placeholder="pretrazi"></Input>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>CORI'S</Logo>
        </Center>
        <Right>
          <NavItem>REGISTRACIJA</NavItem>
          <NavItem>LOGIN</NavItem>
          <NavItem>
            <IconButton aria-label="cart">
              <Badge badgeContent={4} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </NavItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
