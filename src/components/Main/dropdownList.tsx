import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';

import { IMedewerker } from './main';

// tslint:disable-next-line:interface-name
interface IProps {
    medewerkers: IMedewerker[];
    person(name: string, id: number);
}

// tslint:disable-next-line:interface-name
interface IState {
    dropdownOpen2: boolean;
}

class DropdownList extends React.Component<IProps, IState> {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen2: false
        };
    }

    render() {
        let rows = this.makeMenuList();

        return (
            <Row className="dropdown">
                <Col lg="6" sm="6" xs="12">
                    <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle}>
                        <DropdownToggle caret={true}>
                        Selecteer medewerker...
                        </DropdownToggle>
                    <DropdownMenu className="menu">
                        {rows}
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
        );
    }

    // Puts all the employees in the dropdown menu
    private makeMenuList () {

        this.putInOrder();

        let rows: Array<DropdownItem> = []; 
        for (let i = 0; i < this.props.medewerkers.length; i++) {
            let naam = this.props.medewerkers[i].naam;
            let id = this.props.medewerkers[i].id;

            rows.push(
                <DropdownItem 
                    key={i} 
                    onClick={() => this.props.person(naam, id)}
                > 
                    {this.props.medewerkers[i].naam}
                </DropdownItem>);
        }
        return rows;
    }

    // Puts list on alphabetical order
    private putInOrder() {
        this.props.medewerkers.sort(function (a: IMedewerker, b: IMedewerker) {
            var nameA = a.naam.toUpperCase();
            var nameB = b.naam.toUpperCase();
            return (nameA < nameB ) ? - 1 : (nameA > nameB) ? 1 : 0;
        });
    }

    // Toggle for the dropdownmenu
    private toggle() {
        this.setState({
        dropdownOpen2: !this.state.dropdownOpen2
        });
    }
}

export default DropdownList; 