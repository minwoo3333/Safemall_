import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from "./navbar.module.css";
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

function OffcanvasExample() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  console.log('isLoggedIn:', isLoggedIn)
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" id={styles.navArea}>
          <Container fluid className={styles.Container}>
            <Navbar.Brand className={styles.navbarBrand} href="/">SafeMall</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className={styles.offcanvastitle} id={`offcanvasNavbarLabel-expand-${expand}`}>
                  SafeMall
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" id={styles.navitem}>
                  <Nav.Link href="/">쇼핑몰 검색</Nav.Link>
                  <Nav.Link href="#action2">서비스 소개</Nav.Link>
                  <hr className="divider" />
                  <Nav.Link href="/notice">공지사항</Nav.Link>
                  <Nav.Link href="#action2">피해예방</Nav.Link>
                  <Nav.Link href="#action1">대처법</Nav.Link>
                  <Nav.Link href="/suggest">건의사항</Nav.Link>
                  <Nav.Link href="/report">제보</Nav.Link>
                </Nav>
                <br></br><br></br><br></br>
                <Nav className="justify-content-end flex-grow-1 pe-3" id={styles.navitemB}>
                {isLoggedIn ? (
                    <>
                      <Nav.Link href="/login" onClick={logout}>로그아웃</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/login">로그인</Nav.Link>
                      <Nav.Link href="/signup">회원가입</Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;