import * as React from 'react';

import './main.css';
import AddDay from './addDay';
import { Button, Row, Col } from 'reactstrap';
import TiPlus from 'react-icons/lib/ti/plus';
import TiMinus from 'react-icons/lib/ti/minus';

class AddButton extends React.Component<MyProps, MyState> {

    constructor() {
        super();
        this.state = {
            willAdd : false
        };
    }

    changeStatus () {
        this.setState({
            willAdd: !this.state.willAdd
        });
    }

    render() {
          let children =  this.props.children;
          
          return (
            <div>
                <Row className="buttonRow">
                    <Col sm="6" xs="12"><h2>{children}</h2></Col>
                    <Col sm="6" xs="12" className="button">
                        <Button color="secondary" onClick={() => this.changeStatus()}> 
                            {(this.state.willAdd) ? '' : 'Voeg vakantiedagen toe '}
                            {(this.state.willAdd) ? <TiMinus/> : <TiPlus />} 
                             
                        </Button>
                    </Col>
                </Row>
                {(this.state.willAdd) ? <AddDay /> : <div />}  
               
            </div>    
        );
    }
}

interface MyProps {}

interface MyState {
    willAdd: boolean;
}

export default AddButton;