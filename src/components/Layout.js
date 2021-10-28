import React, { Component } from "react";
import { Container } from "reactstrap";
import "./bg.css";
export class Layout extends Component {
  render() {
    return (
      <div className="body">
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
