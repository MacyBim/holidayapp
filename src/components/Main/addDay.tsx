import * as React from 'react';
import { Form, Label, Input, Col, Row, Button } from 'reactstrap';
import TiPlus from 'react-icons/lib/ti/plus';

import './main.css';
import AddButton from './button';

// tslint:disable-next-line:interface-name
interface IProps {
      activeId: number;
}

class AddDay extends React.Component<IProps, AddButton> {

      private beginDate: HTMLInputElement;
      private endDate: HTMLInputElement;
     
      render() {
          return (      
            <Form className="form">
                 <Row className="addRow">
                  {/* tslint:disable-next-line:jsx-self-close */}
                        <Col sm="3" xs="0" /> 
                        <Col sm="3" xs="0" /> 
                        <Col sm="3" xs="6">
                              <Label for="startdate">Startdatum</Label>
                              <Input type="date" placeholder="" getRef={(input) => (this.beginDate = input)} />    
                        </Col> 
                        <Col sm="3" xs="6">
                              <Label for="startdate">Startdatum</Label>
                              <Input type="date" placeholder="" getRef={(input) => (this.endDate = input)}/>    
                        </Col> 
                        <Col sm="12" className="button">  
                              <Button color="info" className="button" onClick={() => this.addDays()}> 
                                    {<TiPlus />}Voeg toe 
                              </Button>
                        </Col>
                  </Row>
            </Form>                 
           
            );
      }

      private addDays() {
            let a = this.props.activeId.toString();
            let b = Math.floor((Math.random() * 100) + 1).toString();
            let c = a + b;
            let id = Number(c);

            let newdata = {
                  id: id,
                  medewerkerId: this.props.activeId,
                  startDatum: this.beginDate.value,
                  eindDatum: this.endDate.value
            };

            const url = 'http://localhost:9000/api/postday';
            fetch(url, {
                  method: 'POST',
                  headers: new Headers({'Content-Type': 'application/json'}),
                  body: JSON.stringify(newdata)
            });
        }
}

export default AddDay;