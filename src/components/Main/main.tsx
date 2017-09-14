import * as React from 'react';

import './main.css';
import AddButton from './addButton';
import Overview from './overview';
import DropdownList from './dropdownList';

// tslint:disable-next-line:interface-name
interface IProps {
}

// tslint:disable-next-line:interface-name
interface IState {
    activeEm: string;
    activeId: number;
    medewerkers: IMedewerker[];
    names: string[];
    isSelected: boolean;
    uniqueId: number;
    willAdd: boolean;
}
  // tslint:disable-next-line:interface-name
export interface IMedewerker {
    id: number;
    naam: string;
    indienstdatum: string;
    uitdienstdatum: string;
    vakantiedagen: number;
}

class Main extends React.Component <IProps, IState> {
    constructor() {
        super();
        this.willAddDay = this.willAddDay.bind(this);
        this.person = this.person.bind(this);
        this.state = {
          medewerkers: [],
          names: [],
          activeEm: '',
          activeId: 0,
          isSelected: false,
          uniqueId: 0,
          willAdd: false
        };
      }

    componentWillMount() {
        this.fetchData();
    }
    
    render() {  
        let name = this.state.activeEm;
        let inDienst = '';
        let uitDienst = '';
        let vakDagen = 0;
        if (this.state.activeId !== 0) {
            let activeDat: IMedewerker = this.state.medewerkers.filter(item => item.id === this.state.activeId )[0];
            inDienst = activeDat.indienstdatum;
            uitDienst = activeDat.uitdienstdatum;
            vakDagen = activeDat.vakantiedagen;
        }

        return ( 
            <div className="main">
                <DropdownList 
                    medewerkers={this.state.medewerkers}
                    person={this.person}
                />
                {(this.state.isSelected) ? <AddButton 
                    name={name} 
                    activeId={this.state.activeId}
                    willAdd={this.state.willAdd}
                    willAddDay={this.willAddDay}
                /> : null}

                {(this.state.isSelected) ? <Overview 
                    inDienst={inDienst} 
                    uitDienst={uitDienst} 
                    vakDagen={vakDagen} 
                    activeId={this.state.activeId}
                    willAdd={this.state.willAdd}
                    willAddDay={this.willAddDay}
                /> 
                : null}
            </div>
    
        );
    }

    // Gets the data from 'medewerker'
    private fetchData() {
        const url = 'http://localhost:9000/api/medewerker';
        fetch(url, {
            method: 'GET',
            })
            .then(res => res.json())
            .then((json) => {
            this.setState({
                    medewerkers: json
                });   
            })// tslint:disable-next-line:no-console
            .catch( error => console.log('Error Fetch : ' + error )); 
    }
  
    // When an employee is selected 
    private person(name: string, id: number) {
        this.setState({
            activeEm: name,
            activeId: id,
            isSelected: true
        });
    }

    // Change status when somebody clicks on the 'voeg vakantiedagen toe' button
    private willAddDay() {
        this.setState({
            willAdd : !this.state.willAdd
        });
    }
}

export default Main;