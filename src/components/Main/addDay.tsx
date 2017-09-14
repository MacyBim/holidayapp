import * as React from 'react';
import { Form, Label, Input, Col, Row, Button } from 'reactstrap';
import TiPlus from 'react-icons/lib/ti/plus';

import './main.css';
import AddButton from './addButton';

// tslint:disable-next-line:interface-name
interface IProps {
      activeId: number;
      idList: number[];
      insert(id: number, beginDate: string, endDate: string);
}

class AddDay extends React.Component<IProps, AddButton> {

      private beginDate: HTMLInputElement;
      private endDate: HTMLInputElement;
     
      render() {
          
          return (      
            <Form className="form">
                 <Row className="addRow">
                        <Col sm="3" xs="0" /> 
                        <Col sm="3" xs="0" /> 
                        <Col sm="3" xs="6">
                              <Label for="startdate">Startdatum</Label>
                              <Input 
                                    type="date" 
                                    getRef={(input) => (this.beginDate = input)} 
                              />    
                        </Col> 
                        <Col sm="3" xs="6">
                              <Label for="startdate">Startdatum</Label>
                              <Input 
                                    type="date"
                                    getRef={(input) => (this.endDate = input)}
                              />    
                        </Col> 
                        <Col sm="12" className="button">  
                              <Button color="info" onClick={() => this.addDays()}> 
                                    {<TiPlus />}Voeg toe 
                              </Button>
                        </Col>
                  </Row>
            </Form>                 
            );
      }

      // Creates a unique ID for the holiday period
      private addDays() {
            let a = this.props.activeId.toString();
            let b = Math.floor((Math.random() * 100) + 1).toString();
            let c = a + b;
            let id = Number(c);
      
            // When the Id already exists a new one will be created
            while (!(typeof(this.props.idList.find(item => item === id )) !== undefined)) {
                  a = this.props.activeId.toString();
                  b = Math.floor((Math.random() * 100) + 1).toString();
                  c = a + b;
                  id = Number(c);
            }
            this.props.insert(id, this.beginDate.value, this.endDate.value );
      }
}

export default AddDay;