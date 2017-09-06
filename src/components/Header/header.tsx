import * as React from 'react';
import './header.css';
import { Row, Col } from 'reactstrap';

// const logo = require('./pineapple.svg');

class Header extends React.Component {

  render() {
    return (
      <div className="bgimage">
        <Row className="header-text">
          <Col sm="12" xs="12">
            <h1>Vakantiedagen</h1>
          </Col>
        </Row>
      </div>  
    );
  }
}

export default Header;