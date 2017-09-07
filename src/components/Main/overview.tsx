import * as React from 'react';
import { Row, Col, Table } from 'reactstrap';

import './main.css';
import TiEdit from 'react-icons/lib/ti/edit';
import TiTrash from 'react-icons/lib/ti/trash';

class Overview extends React.Component<IProps, MyState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            total: 25,
            used: 29,
        };
    }

    render() {

        var styles = {
            color: '#FF3C3C'
        };
        let diff = this.state.total - this.state.used;
        let usedDays; 
        if (diff < 0 ) {
             usedDays = <strong style={styles}>{this.state.used}</strong>;
        }
    
        return (

        <div>
            <Row className="infoRow">
                <Col xs="12" sm="3"><h4 className="year">2017</h4></Col>
                <Col xs="12" sm="3">Aantal vakantiedagen: 
                                <strong>{this.state.total}</strong></Col>
                <Col xs="12" sm="3">Gebruikte dagen: {usedDays} </Col>
                <Col xs="12" sm="9">
                    <Table striped={true} className="table" reponsive={true}>
                        <thead>
                            <tr>
                                <th>Startdatum</th>
                                <th>Einddatum</th>
                                <th>Aantal werkdagen</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01-01-2017</td>
                                <td>01-04-2017</td>
                                <td>3</td>
                                <td> <TiEdit size={28} /><TiTrash size={28} /></td>
                            </tr>
                            <tr>
                                <td>01-01-2017</td>
                                <td>01-04-2017</td>
                                <td>3</td>
                                <td> <TiEdit size={28} /><TiTrash size={28} /></td>
                            </tr>
                        </tbody>
                    </Table> 
                </Col>
            </Row>
        </div> 
            
        );
    }
}
// tslint:disable-next-line:interface-name
interface IProps {

}
interface MyState {
    total: number;
    used: number;
}

export default Overview;