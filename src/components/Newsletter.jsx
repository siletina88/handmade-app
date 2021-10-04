import SendIcon from '@mui/icons-material/Send'

import styled from 'styled-components'

const Container = styled.div`
  height: 40vh;
  background-color: #e1e1ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 20px;
`
const Description = styled.div`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: palevioletred;
  color: white;
  cursor: pointer;
`

const Newsletter = () => {
  return (
    <Container>
      <Title>Email Bilten</Title>
      <Description>
        Pretplatite se da dobijate redovna obavjestenja o vasim najdrazim
        artiklima
      </Description>
      <InputContainer>
        <Input placeholder="Vas email" />
        <Button>
          <SendIcon></SendIcon>
        </Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter
