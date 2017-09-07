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
       // tslint:disable-next-line:no-console
        console.log('we are in component willmount');
        const url = 'http://localhost:9000/api/vakantie';
        // fetch(url)
        //   .then(response => response.json())
        //   .then((json) => {
        //       // tslint:disable-next-line:no-console
        //       console.log(json);
        //       this.setState({
        //       medewerkers: json
        //     });    
        //   })
        //   // tslint:disable-next-line:no-console
        //   .catch( error => console.log('Error Fetch : ' + error ));    

        fetch(url, {
            method: 'GET',
            })
            .then(res => res.json())
            .then((json) => {
            // tslint:disable-next-line:no-console
            console.log(json);
            this.setState({
                    medewerkers: json
                });   
            });
        }

    //   addCountry() {
    //     // tslint:disable-next-line:no-console
    //     let newdata = {
    //          naam : 'Test Naam',
    //          id : '023',
    //          inDienstDatum : '2017/01/02',
    //          uitDienstDatum : '2016/02/04',
    //          vakantieDagen : '25'

    //     };
    
    //     var request = new Request('http://localhost:3000/api/addtest', {
    //       method: 'POST',
    //       headers: new  Headers({'Content-Type': 'application/json'}),
    //       body: JSON.stringify(newdata)
    //     });
    
    //     // xmlHttpRequest()
    //     fetch(request)
    //       .then(function(res: Response){
    //         res.json()
    //           // tslint:disable-next-line:no-empty
    //           .then(function(data: {}){
    //             });
    //           });
    //   }
    
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
       //  let activeDat: IMedewerker = this.state.medewerkers.find( item => item.id === this.state.activeId );
        // tslint:disable-next-line:no-console
       //  var test = this.state.medewerkers.indexOf(, this.state.activeId);

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
                {(this.state.isSelected) ? <Overview /> : null}
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
    indexOf(index: number);
  }

export default Main;