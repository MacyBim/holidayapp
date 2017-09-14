import * as React from 'react';
import { Row, Col, Table, Input } from 'reactstrap';
import { IDagen } from './overview';

import TiEdit from 'react-icons/lib/ti/edit';
import TiTrash from 'react-icons/lib/ti/trash';
import TiTimes from 'react-icons/lib/ti/times';
import TiTick from 'react-icons/lib/ti/tick';

// tslint:disable-next-line:interface-name
interface IProps {
    inDienst: string;
    uitDienst: string;
    daysPp: IDagen[];
    vakDagen: number;
    delete(idHolidayPeriod: number);
    update(idToChange: number, beginDate: string, endDate: string);
}

// tslint:disable-next-line:interface-name
interface IState {
    willChange: boolean;
    idToChange: number;
}

class Tables extends React.Component<IProps, IState> {

    private beginDate: HTMLInputElement;
    private endDate: HTMLInputElement;

    constructor(props: IProps) {
        super(props);
        this.state = {
            willChange: false,
            idToChange: 0,
        };
    }

    render() {    
        let rowstest = this.createTables();

        return(
            <div>
                {rowstest}
            </div>
        );
    }

    // Create table for every year
    private createTables () {
   
        let inDienst = new Date(this.props.inDienst).getFullYear();
        let uitDienst = new Date(this.props.uitDienst).getFullYear();
        let today = new Date().getFullYear();

        uitDienst = ((uitDienst === 1970) ?  today : uitDienst);
        let jaarVerschil = uitDienst - inDienst;

        let rows: Array<JSX.Element> = [];
        for ( var i = 0; i < jaarVerschil + 1; i++) {
            let usedDays = 0;
            let thisyear = uitDienst - i;

            let offDays = this.props.vakDagen;

            // To determine how many off days someone has 
            if (inDienst === thisyear) {
                let daysTot = new Date(this.props.inDienst).valueOf() - new Date(thisyear, 0, 0).valueOf();
                daysTot = daysTot / 1000 / 60 / 60 / 24;
                offDays = Math.round((offDays / 365 ) * (365 - daysTot));

            } else if (uitDienst === thisyear) {
                if (new Date(this.props.uitDienst).getFullYear() === 1970) {
                    offDays = offDays;
                } else {
                let daysTot = new Date(this.props.uitDienst).valueOf() - new Date(thisyear, 0, 0).valueOf();
                daysTot = daysTot / 1000 / 60 / 60 / 24;
                offDays = Math.round((offDays / 365 ) *  daysTot);
                }
            }

            // Create rows in the table for a holiday period
            let days: Array<JSX.Element> = [];
            for (var j = 0; j < this.props.daysPp.length; j++) {
                let year = new Date(this.props.daysPp[j].startDatum).getFullYear();
                if ( year === thisyear) { 
                    let workingdays = this.countWorkindays(new Date(this.props.daysPp[j].startDatum), 
                                                           new Date(this.props.daysPp[j].eindDatum));
                    usedDays = usedDays + workingdays;
                    days.push(this.createRows(j, workingdays));
                }
            }

            let usedDays2 = (usedDays > offDays ) ?  
                            <strong style={{color: '#FF3C3C'}}>{usedDays}</strong> :
                            <strong>{usedDays}</strong>;

            // tslint:disable-next-line:jsx-wrap-multiline
            rows.push( <Row className="infoRow">
            <Col xs="12" sm="3"><h4 className="year">{thisyear}</h4></Col>
            <Col xs="12" sm="3">Aantal vakantiedagen:  
                            <strong>{offDays}</strong></Col>
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

    // create rows in the table
    private createRows(j: number, workingdays: number) {

        let day: JSX.Element = <div />;
        let idHolidayPeriod = this.props.daysPp[j].id;
        if (this.state.willChange && idHolidayPeriod === this.state.idToChange ) {

            let value = new Date(this.props.daysPp[j].startDatum);
            let valueMonth = ((value.getMonth() + 1) < 10) ? '0' + (value.getMonth() + 1) : (value.getMonth() + 1);
            let valueday = (value.getDate() < 10) ? '0' + value.getDate() : value.getDate();
            let value1 = value.getFullYear() + '-' + valueMonth + '-' + valueday ;
            value = new Date(this.props.daysPp[j].eindDatum);
            valueMonth = ((value.getMonth() + 1) < 10) ? '0' + (value.getMonth() + 1) : (value.getMonth() + 1);
            valueday = (value.getDate() < 10) ? '0' + value.getDate() : value.getDate();
            let value2 = value.getFullYear() + '-' + valueMonth + '-' + valueday ;
       
            day = (
                <tr>
                {/* tslint:disable-next-line:max-line-length */}
                    <td><Input type="date" defaultValue={value1} getRef={(input) => (this.beginDate = input)}/> </td>
                    <td><Input type="date" defaultValue={value2} getRef={(input) => (this.endDate = input)}/> </td>
                    <td> - </td>
                    <td> 
                        <a onClick={() => this.willUpdate(0)}><TiTimes size={28} /> </a>
                        <a onClick={() => this.goingToUpdate()}> <TiTick size={28} /> </a> 
                    </td>
                </tr>
            );
        } else {
            day = ( 
            // tslint:disable-next-line:jsx-wrap-multiline
                <tr> 
                    <td>{new Date(this.props.daysPp[j].startDatum).toLocaleDateString()}</td>
                    <td>{new Date(this.props.daysPp[j].eindDatum).toLocaleDateString()}</td>
                    <td>{workingdays}</td>
                    <td> 
                        {!(this.state.willChange) ? 
                        <div>
                            <a onClick={() => this.willUpdate(idHolidayPeriod)}><TiEdit size={28} /> 
                            </a>
                            <a onClick={() => this.props.delete(idHolidayPeriod)}> <TiTrash size={28} /> 
                            </a> </div> 
                        : null }
                    </td>
                </tr>
            );
        }
        return day;
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

     // Update a holiday period
     private willUpdate(idToUpdate: number) {
        this.setState({
            willChange: !this.state.willChange,
            idToChange: idToUpdate
        });
    }

    // When the holiday period will be updated
    private goingToUpdate() {
        this.props.update(this.state.idToChange, this.beginDate.value, this.endDate.value);
        this.setState({
            willChange: !this.state.willChange,
        });
    }

}

export default Tables;