import { Outlet } from "react-router-dom";import { Container, Nav, Navbar } from "react-bootstrap";
const Layout = () => {
  let content;
  content = (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Refresh-Concept</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
  return content;
};
export default Layout;
