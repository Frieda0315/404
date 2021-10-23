import React, { Component } from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";
import { Route } from "react-router-dom";

export class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <NavMenu />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
