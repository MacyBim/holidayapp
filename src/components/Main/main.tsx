import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import './main.css';
import AddButton from './button';
import Overview from './overview';

// tslint:disable-next-line:interface-name
interface IProps {
}

// tslint:disable-next-line:interface-name
interface IState {
    dropdownOpen: boolean;
    activeEm: string;
    activeId: number;
    medewerkers: IMedewerker[];
    names: string[];
    isSelected: boolean;
    uniqueId: number;
 
}
  // tslint:disable-next-line:interface-name
interface IMedewerker {
    id: number;
    naam: string;
    inDienstDatum: string;
    uitDienstDatum: string;
    vakantieDagen: number;
}

class Main extends React.Component <IProps, IState> {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          medewerkers: [],
          names: [],
          activeEm: '',
          activeId: 0,
          isSelected: false,
          uniqueId: 0
        };
      }

    componentDidMount() {
        this.fetchData();
    }
    
    render() {  
        let name = this.state.activeEm;

        let inDienst = '';
        let uitDienst = '';
        let vakDagen = 0;
        if (this.state.activeId !== 0) {
        let activeDat: IMedewerker = this.state.medewerkers.filter(item => item.id === this.state.activeId )[0];
         // tslint:disable-next-line:no-console
        inDienst = activeDat.inDienstDatum;
        uitDienst = activeDat.uitDienstDatum;
        vakDagen = activeDat.vakantieDagen;
        }

        // Puts all the employees in the list
        let rows: Array<DropdownItem> = []; 
        for (let i = 0; i < this.state.medewerkers.length; i++) {
                let naam = this.state.medewerkers[i].naam;
                let id = this.state.medewerkers[i].id;
                // tslint:disable-next-line:jsx-wrap-multiline
                rows.push(<DropdownItem key={i} onClick={() => this.person(naam, id)}> 
                  {this.state.medewerkers[i].naam}</DropdownItem>);
          }

        return ( 
            <div className="main">
                <Row className="dropdown">
                    <Col lg="6" sm="6" xs="12">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret={true}>
                            Selecteer medewerker...
                            </DropdownToggle>
                            <DropdownMenu className="menu">
                                {rows}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row> 
                {(this.state.isSelected) ? <AddButton 
                    name={name} 
                    activeId={this.state.activeId}
                /> : null}

                {(this.state.isSelected) ? <Overview 
                    inDienst={inDienst} 
                    uitDienst={uitDienst} 
                    vakDagen={vakDagen} 
                    activeId={this.state.activeId}
                /> 
                : null}
            </div>
    
        );
    }

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

    // Toggle for the dropdown
    private toggle() {
        this.setState({
        dropdownOpen: !this.state.dropdownOpen
        });
    }
  
    // When an employee is selected 
    private person(name: string, id: number) {
        this.setState({
            activeEm: name,
            activeId: id,
            isSelected: true
        });
    }
}

export default Main;