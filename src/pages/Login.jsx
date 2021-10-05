import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/7436106/pexels-photo-7436106.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
  flex-wrap: wrap;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: palevioletred;
  cursor: pointer;
  margin-bottom: 10px;
`
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>LOGIRAJ SE</Title>
        <Form>
          <Input placeholder="Korisnicno ime"></Input>
          <Input placeholder="Lozinka"></Input>
        </Form>

        <Button>LOGIN</Button>
        <Link>Zaboravili ste password ili korisnicko ime?</Link>
        <Link>Kreirajte novi nalog</Link>
      </Wrapper>
    </Container>
  )
}

export default Login
