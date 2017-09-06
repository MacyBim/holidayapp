import * as React from 'react';
import { Form, Label, Input, Col, Row, Button } from 'reactstrap';
import TiPlus from 'react-icons/lib/ti/plus';

import './main.css';

class AddDay extends React.Component {

    render() {
          return (      
            <Form className="form">
                 <Row className="addRow">
                  {/* tslint:disable-next-line:jsx-self-close */}
                        <Col sm="3" xs="0" /> 
                        <Col sm="3" xs="0" /> 
                        <Col sm="3" xs="6">
                              <Label for="startdate">Startdatum</Label>
                              <Input type="date" name="startdate" id="startdate" placeholder="" />    
                        </Col> 
                        <Col sm="3" xs="6">
                              <Label for="startdate">Startdatum</Label>
                              <Input type="date" name="startdate" id="startdate" placeholder="" />    
                        </Col> 
                        <Col sm="12" className="button">  
                              <Button color="info" className="button"> {<TiPlus />}Voeg toe 
                              </Button>
                        </Col>
                  </Row>
            </Form>                 
           
            );
      }
}

export default AddDay;