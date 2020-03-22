import PropTypes from "prop-types"
import React from "react"
import Banner from '../images/nav-banner.png';
import styled from 'styled-components';
import {Container, Row} from "react-bootstrap";

const StyledHeader = styled.header`
  background-color: rgb(204, 14, 0);
  height: 10vh;
  
  .container, .row, h1 {
    height: 100%;
  }
  
  img {
    max-height: 100%;
  }
`;

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <Container>
      <Row>
        <h1 style={{ margin: 0 }}>
          <img src={Banner} alt='Logo' className='img-fluid' />
        </h1>
      </Row>
    </Container>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
