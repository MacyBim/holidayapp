import * as React from 'react';

import './main.css';
import AddDay from './addDay';
import { Button, Row, Col } from 'reactstrap';
import TiPlus from 'react-icons/lib/ti/plus';
import TiMinus from 'react-icons/lib/ti/minus';

interface MyProps {
    name: string;
    activeId: number;
}

interface MyState {
    willAdd: boolean;
}

class AddButton extends React.Component<MyProps, MyState> {

    constructor() {
        super();
        this.state = {
            willAdd : false
        };
    }

    render() {
          return (
            <div>
                <Row className="buttonRow">
                    <Col sm="6" xs="12"><h2>{this.props.name}</h2></Col>
                    <Col sm="6" xs="12" className="button">
                        <Button color="secondary" onClick={() => this.changeStatus()}> 
                            {(this.state.willAdd) ? '' : 'Voeg vakantiedagen toe '}
                            {(this.state.willAdd) ? <TiMinus/> : <TiPlus />}  
                        </Button>
                    </Col>
                </Row>
                {(this.state.willAdd) ? <AddDay 
                    activeId={this.props.activeId}
                /> : <div />}
            </div>    
        );
    }

    private changeStatus() {
        this.setState({
            willAdd: !this.state.willAdd
        });
    }
}

export default AddButton;