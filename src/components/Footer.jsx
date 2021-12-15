import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">CopyRight &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
