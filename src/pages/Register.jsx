import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/5989804/pexels-photo-5989804.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: '80%' })}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: palevioletred;
  cursor: pointer;
`

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>KREIRAJ NALOG</Title>
        <Form>
          <Input placeholder="Ime"></Input>
          <Input placeholder="Prezime"></Input>
          <Input placeholder="Korisnicko ime"></Input>
          <Input placeholder="Sifra"></Input>
          <Input placeholder="Sifra ponovo"></Input>
        </Form>
        <Agreement>
          Kreiranjem ovog naloga, pristajem na procesuiranje licnih podataka u
          skladu sa <b>POLISOM PRIVATNOSTI</b>
        </Agreement>
        <Button>KREIRAJ</Button>
      </Wrapper>
    </Container>
  )
}

export default Register
