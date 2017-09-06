import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import './main.css';
import AddButton from './button';
import Overview from './overview';

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
        };
      }

      componentDidMount() {
        const url = 'http://localhost:9000/api/vakantie';
        fetch(url)
          .then(response => response.json())
          .then((json) => {
            this.setState({
              medewerkers: json
            });    
          })
          // tslint:disable-next-line:no-console
          .catch( error => console.log('Error Fetch : ' + error ));      
      }
    
      // Toggle for the dropdown
      toggle() {
          this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      // When an employee is selected 
      person(name: string, id: number) {
            this.setState({
                activeEm: name,
                activeId: id,
                isSelected: true
            });
      }
    
      render() {  
        let name = this.state.activeEm;
        let arr = this.state.medewerkers.find( item => item.id === this.state.activeId );

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
                {(this.state.isSelected) ? <AddButton>{name}</AddButton> : null}
                {(this.state.isSelected) ? <Overview data={array}/> : null}
            </div>
    
        );
    }
}

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
 
}
  // tslint:disable-next-line:interface-name
interface IMedewerker {
    id: number;
    naam: string;
    inDienstDatum: Date;
    uitDienstDatum: Date;
    vakantieDagen: number;
  }

export default Main;