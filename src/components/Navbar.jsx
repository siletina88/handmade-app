import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { Badge, IconButton } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid lightgray;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`
const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`
const Center = styled.div`
  flex: 2;
`
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const NavItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
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
              {' '}
              <LanguageFlag src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg"></LanguageFlag>
            </LanguageOption>
          </Language>
          <SearchContainer>
            <SearchIcon
              style={{ color: 'lightgray', fontSize: '16px' }}
            ></SearchIcon>
            <Input></Input>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>CORINA'S HANDMADE</Logo>
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
