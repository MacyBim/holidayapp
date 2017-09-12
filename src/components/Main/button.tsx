import * as React from 'react';

import './main.css';
// import AddDay from './addDay';
import { Button, Row, Col } from 'reactstrap';
import TiPlus from 'react-icons/lib/ti/plus';
import TiMinus from 'react-icons/lib/ti/minus';

interface MyProps {
    name: string;
    activeId: number;
    willAdd: boolean;
    willAddDay();
}

class AddButton extends React.Component<MyProps> {

    render() {
          return (
            <div>
                <Row className="buttonRow">
                    <Col sm="6" xs="12"><h2>{this.props.name}</h2></Col>
                    <Col sm="6" xs="12" className="button">
                        <Button color="secondary" onClick={() => this.props.willAddDay()}> 
                            {(this.props.willAdd) ? '' : 'Voeg vakantiedagen toe '}
                            {(this.props.willAdd) ? <TiMinus/> : <TiPlus />}  
                        </Button>
                    </Col>
                </Row>
            </div>    
        );
    }
}

export default AddButton;