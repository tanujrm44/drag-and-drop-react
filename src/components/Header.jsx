import React from "react"
import { Navbar, Container } from "react-bootstrap"

export default function Header() {
  return (
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Drag and Drop</Navbar.Brand>
      </Container>
    </Navbar>
  )
}