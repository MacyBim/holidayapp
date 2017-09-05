import * as React from 'react';
import { Form, Label, Input, Row, Col, Button } from 'reactstrap';

import './main.css';

class AddDay extends React.Component {

    render() {
          return (
            <div>
                  <Form className="form">
                  <Row>
                  {/* tslint:disable-next-line:jsx-self-close */}
                  <Col xs="4"> </Col>
                   <Col xs="4">
                        <Label for="startdate">Startdatum</Label>
                        <Input type="date" name="startdate" id="startdate" placeholder="" />    
                  </Col> 
                  <Col xs="4">
                        <Label for="startdate">Startdatum</Label>
                        <Input type="date" name="startdate" id="startdate" placeholder="" />    
                  </Col> 
                  </Row>
                  <Row>
                        {/* tslint:disable-next-line:jsx-self-close */}
                        <Col xs="4"> </Col>
                        <Col xs="4"> </Col>
                        <Col xs="4">  <Button color="info" className="button"> Voeg toe 
                        </Button>
                         </Col>
                  </Row>
                  </Form>                 
            </div> 
            );
      }
}

export default AddDay;