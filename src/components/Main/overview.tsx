import * as React from 'react';

import './main.css';
import Tables from './tables';
import AddDay from './addDay';

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
}

// tslint:disable-next-line:interface-name
export interface IDagen {
    id: number;
    medewerkerId: number;
    startDatum: Date;
    eindDatum: Date;
}

class Overview extends React.Component<IProps, MyState> {

    constructor(props: IProps) {
        super(props);
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            dagen: [],
            id: 0,
            idList: [],
            willChange: false,
        };
    }

    componentDidMount() {
        this.fetchDays(); 
    }

    render() {

        let daysPp = this.state.dagen.filter(item => item.medewerkerId === this.props.activeId );

        return (
        <div>
            {(this.props.willAdd) ? 
            <AddDay 
                    activeId={this.props.activeId}
                    insert={this.insert}
                    idList={this.state.idList}
            /> 
            : <div />}
            <Tables 
                    inDienst={this.props.inDienst}
                    uitDienst={this.props.uitDienst}
                    daysPp={daysPp}
                    update={this.update}
                    delete={this.delete}
                    vakDagen={this.props.vakDagen}
            />
        </div>    
        );
    }

    // SELECT data from 'vakantiedagen' 
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

    // INSERT a new holiday period 
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

    // DELETE a holiday period
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

     // UPDATE a holidayperiod
     private update(idToChange: number, beginDate: string, endDate: string) {

        let updata = {
            startDatum: beginDate,
            eindDatum: endDate
        };
        const url = 'http://localhost:9000/api/update/' + idToChange;
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