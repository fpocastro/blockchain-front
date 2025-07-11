import React, { Component } from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar className="fixed-top" color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">Blockchain</NavbarBrand>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
