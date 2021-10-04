import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  background-color: palevioletred;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 12px;
`

const Announcment = () => {
  return (
    <Container>
      Akcija! Ostvarite popust od 30% za drugi kupljeni proizvod!
    </Container>
  )
}

export default Announcment
