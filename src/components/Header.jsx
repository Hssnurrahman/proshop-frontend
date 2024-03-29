import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {userInfo && !userInfo.isAdmin && <SearchBox />}
            <Nav>
              {userInfo && userInfo.isAdmin && (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>
                      <i className="fas fa-home"></i> Home
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Catalog">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                    <NavDropdown.Item>Collections</NavDropdown.Item>
                  </NavDropdown>
                  <LinkContainer to="/admin/orderList">
                    <Nav.Link>
                      <i className="fas fa-shopping-bag"></i> Orders
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <i className="fas fa-shopping-cart"></i> Cart
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && !userInfo.isAdmin && (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>
                      <i className="fas fa-home"></i> Home
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Catalog">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                    <NavDropdown.Item>Collections</NavDropdown.Item>
                  </NavDropdown>
                  <LinkContainer to="/orders">
                    <Nav.Link>
                      <i className="fas fa-shopping-bag"></i> Orders
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <i className="fas fa-shopping-cart"></i> Cart
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && !userInfo.isAdmin && (
                <NavDropdown title={`${userInfo.name}`}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutUser}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={`${userInfo.name}`}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderList">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutUser}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!userInfo && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
