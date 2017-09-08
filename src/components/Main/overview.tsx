import * as React from 'react';
import { Row, Col, Table } from 'reactstrap';

import './main.css';
import TiEdit from 'react-icons/lib/ti/edit';
import TiTrash from 'react-icons/lib/ti/trash';

// tslint:disable-next-line:interface-name
interface IProps {
    inDienst: string;
    uitDienst: string;
    vakDagen: number;
    activeId: number;

}
interface MyState {
    dagen: IDagen[];
}

// tslint:disable-next-line:interface-name
interface IDagen {
    id: number;
    medewerkerId: number;
    startDatum: Date;
    eindDatum: Date;
}

class Overview extends React.Component<IProps, MyState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            dagen: []
        };
    }

    componentDidMount() {
        const url = 'http://localhost:9000/api/vakantiedagen';

        fetch(url, {
            method: 'GET',
            })
            .then(res => res.json())
            .then((json) => {
            this.setState({
                    dagen: json
                });   
            })// tslint:disable-next-line:no-console
            .catch( error => console.log('Error Fetch : ' + error )); 
        }

    render() {
        var styles = {
            color: '#FF3C3C'
        };
        
        let inDienst = new Date(this.props.inDienst).getFullYear();
        let uitDienst = new Date(this.props.uitDienst).getFullYear();
        let today = new Date().getFullYear();

        uitDienst = ((uitDienst === 1970) ?  today : uitDienst);
        let jaarVerschil = uitDienst - inDienst;

        let dagen = this.state.dagen.filter(item => item.medewerkerId === this.props.activeId );

        // Create a table for every year
        let rows: Array<Row> = [];
        for ( var i = 0; i < jaarVerschil + 1; i++) {
            let thisyear = uitDienst - i;
            let usedDays = 0;

            // Create rows in the table for a holiday period
            let days: Array<JSX.Element> = [];
            for (var j = 0; j < dagen.length; j ++) {
                let year = new Date(dagen[j].startDatum).getFullYear();
                if ( year === thisyear) {

                    let workingdays = this.countWorkindays(new Date(dagen[j].startDatum), new Date(dagen[j].eindDatum));
                    usedDays = usedDays + workingdays;
                    days.push( 
                    // tslint:disable-next-line:jsx-wrap-multiline
                    <tr>   
                          <td>{new Date(dagen[j].startDatum).toLocaleDateString()}</td>
                          <td>{new Date(dagen[j].eindDatum).toLocaleDateString()}</td>
                          <td>{workingdays}</td>
                          <td> <TiEdit size={28} /><TiTrash size={28} /></td>
                      </tr>
                    );
                }
            }

            let usedDays2 = (usedDays > this.props.vakDagen ) ?  <strong style={styles}>{usedDays}</strong> :
                <strong>{usedDays}</strong>;

            // tslint:disable-next-line:jsx-wrap-multiline
            rows.push( <Row className="infoRow">
            <Col xs="12" sm="3"><h4 className="year">{thisyear}</h4></Col>
            <Col xs="12" sm="3">Aantal vakantiedagen:  
                            <strong>{this.props.vakDagen}</strong></Col>
            <Col xs="12" sm="3">Gebruikte dagen: {usedDays2} </Col>
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
                        {days}
                    </tbody>
                </Table> 
            </Col>
        </Row> );
        }

        return (
        <div>
            {rows}
        </div> 
            
        );
    }

    // Count the workingdays in the holiday period
    private countWorkindays(begin: Date, eind: Date) {

        let days = (new Date(eind)).valueOf() - (new Date(begin)).valueOf();
        days = (days / (1000 * 60 * 60 * 24)) + 1;
    
        let workingdays = 0;
        let day = begin;
        day.setDate(day.getDate() - 1);

        for (var k = 0; k < days; k++) {
            day.setDate(day.getDate() + 1 );
            let dayString = day.toDateString();
            if (!dayString.includes('Sun') && !dayString.includes('Sat')) {
                workingdays ++;
            }
        }
        return workingdays;
    }
}

export default Overview;