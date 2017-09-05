import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './main.css';
import AddButton from './button';
import Overview from './overview';

class Main extends React.Component < MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          employees: ['Macy Sharoubim', 'Victor Pantaleev', 'Mehdi Ebadi', 'Tessa van Alphen'],
          activeEm: '',
          isSelected: false
        };
      }
    
      // Toggle for the dropdown
      toggle() {
          this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      // When an employee is selected 
      person(name: string) {
            this.setState({
                activeEm: name,
                isSelected: true
            });
      }
    
      render() {  
          let name = this.state.activeEm;

          // Puts all the employees in the list
          let rows: Array<DropdownItem> = []; 
          for (let i = 0; i < this.state.employees.length; i++) {
              // tslint:disable-next-line:jsx-wrap-multiline
              rows.push(<DropdownItem key={i} onClick={() => this.person(this.state.employees[i])}> 
                  {this.state.employees[i]}</DropdownItem>);
          }

          return ( 
            <div className="main">
                <Dropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret={true}>
                   Selecteer medewerker...
                     </DropdownToggle>
                    <DropdownMenu className="menu">
                    {rows}
                    </DropdownMenu>
                </Dropdown>
                {(this.state.isSelected) ? <AddButton> {name}</AddButton> : null}     
                {(this.state.isSelected) ? <Overview /> : null}          
            </div>
    
        );
    }
}

interface Employ {
    [index:  number]: string;
    length: number;
}

interface MyProps {
} 

interface MyState {
    dropdownOpen: boolean;
    activeEm: string;
    employees: Employ;
    isSelected: boolean;
}

export default Main;