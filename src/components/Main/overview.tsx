import * as React from 'react';
import { Row, Col, Table, Input } from 'reactstrap';

import './main.css';
import AddDay from './addDay';
import TiEdit from 'react-icons/lib/ti/edit';
import TiTrash from 'react-icons/lib/ti/trash';
import TiTimes from 'react-icons/lib/ti/times';
import TiTick from 'react-icons/lib/ti/tick';

// tslint:disable-next-line:interface-name
interface IProps {
    inDienst: string;
    uitDienst: string;
    vakDagen: number;
    activeId: number;
    willAdd: boolean;
    willAddDay();
}

interface MyState {
    dagen: IDagen[];
    id: number;
    idList: number[];
    willChange: boolean;
    idToChange: number;
}

// tslint:disable-next-line:interface-name
interface IDagen {
    id: number;
    medewerkerId: number;
    startDatum: Date;
    eindDatum: Date;
}

class Overview extends React.Component<IProps, MyState> {

    private beginDate: HTMLInputElement;
    private endDate: HTMLInputElement;

    constructor(props: IProps) {
        super(props);
        this.insert = this.insert.bind(this);
        this.state = {
            dagen: [],
            id: 0,
            idList: [],
            willChange: false,
            idToChange: 0
        };
    }

    componentDidMount() {
        this.fetchDays(); 
    }

    render() {
        let rows = this.createTables();

        return (
        <div>
            {(this.props.willAdd) ? 
            <AddDay 
                    activeId={this.props.activeId}
                    insert={this.insert}
                    idList={this.state.idList}
            /> 
            : <div />}
            {rows}
        </div>    
        );
    }

    // Select data from 'vakantiedagen' 
    private fetchDays() {
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

        this.updateIdList();
    }

    // Insert a new holiday period 
    private insert(id: number, beginDate: String, endDate: String) {

        let newdata = {
                  id: id,
                  medewerkerId: this.props.activeId,
                  startDatum: beginDate,
                  eindDatum: endDate
        };

        const url = 'http://localhost:9000/api/postday';
        fetch(url, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(newdata)
        })
            .then(res => res.json())
            .then((json) => {
            this.setState({
            dagen: json,
            });   
        });

        this.props.willAddDay();
        this.updateIdList();
    }

    // Delete a holiday period
    private delete(id: number) {
        const url = 'http://localhost:9000/api/delete/' + id;
        fetch(url, {
            method: 'DELETE',
            })
            .then(res => res.json())
            .then((json) => {
            this.setState({
                dagen: json
            });   
            })// tslint:disable-next-line:no-console
            .catch( error => console.log('Error Fetch : ' + error ));
        
        this.updateIdList();
    }

    // Update a holidayperiod
    private update() {

        let updata = {
            startDatum: this.beginDate.value,
            eindDatum: this.endDate.value
        };
        const url = 'http://localhost:9000/api/update/' + this.state.idToChange;
        fetch(url, {
        method: 'PUT',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(updata)
        })
            .then(res => res.json())
            .then((json) => {
                this.setState({
                    dagen: json,
                });   
            });
        this.willUpdate(0);
    }

    // Creates tables for every year that the employee is working.
    private createTables () {
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
        let rows: Array<JSX.Element> = [];
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

                    let idHolidayPeriod = dagen[j].id;
                    if (this.state.willChange && idHolidayPeriod === this.state.idToChange ) {

                        // let value = new Date(dagen[j].startDatum);
                        // let value1 =  value.getDate() +  '-' + (value.getMonth() + 1 ) + '-' + value.getFullYear();
                        // value = new Date(dagen[j].eindDatum);
                        // // tslint:disable-next-line:max-line-length
                        // let value2 = value.getDate() +  '-' + (value.getMonth() + 1 ) + '-' + value.getFullYear();
                        // // tslint:disable-next-line:no-console
                        // console.log(value, value1);
                        days.push(
                        <tr>
                             {/* tslint:disable-next-line:max-line-length */}
                            <td><Input type="date" defaultValue="2017-01-01" getRef={(input) => (this.beginDate = input)}/> </td>
                            <td><Input type="date"  defaultValue="01-01-2017" getRef={(input) => (this.endDate = input)}/> </td>
                            <td> - </td>
                            <td> 
                                <a onClick={() => this.willUpdate(0)}><TiTimes size={28} /> </a>
                                <a onClick={() => this.update()}> <TiTick size={28} /> </a> 
                            </td>
                        </tr>
                        );
                    } else {
                        days.push( 
                            // tslint:disable-next-line:jsx-wrap-multiline
                            <tr> 
                                <td>{new Date(dagen[j].startDatum).toLocaleDateString()}</td>
                                <td>{new Date(dagen[j].eindDatum).toLocaleDateString()}</td>
                                <td>{workingdays}</td>
                                <td> 
                                    {!(this.state.willChange) ? 
                                    <div>
                                    <a onClick={() => this.willUpdate(idHolidayPeriod)}><TiEdit size={28} /> 
                                    </a>
                                    <a onClick={() => this.delete(idHolidayPeriod)}> <TiTrash size={28} /> 
                                    </a> </div> : null }
                                </td>
                            </tr>
                            );
                    } 
                }
            }

            let usedDays2 = (usedDays > this.props.vakDagen ) ?  <strong style={styles}>{usedDays}</strong> :
                <strong>{usedDays}</strong>;

            // tslint:disable-next-line:jsx-wrap-multiline
            rows.push( <Row className="infoRow">
            <Col xs="12" sm="3"><h4 className="year">{thisyear}</h4></Col>
            <Col xs="12" sm="3">Aantal vakantiedagen:  
                            <strong>{this.props.vakDagen}</strong></Col>
            <Col xs="12" sm="3">Gebruikte dagen: {usedDays2}</Col>
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
        return rows;
    }

     // Update a holiday period
     private willUpdate(idToUpdate: number) {
        this.setState({
            willChange: !this.state.willChange,
            idToChange: idToUpdate
        });
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

    private updateIdList() {
        let idList2 = this.state.dagen.map(function (dagene: IDagen) {
            return dagene.id;
        }); 
        this.setState({
            idList: idList2
        });
    }
}

export default Overview;