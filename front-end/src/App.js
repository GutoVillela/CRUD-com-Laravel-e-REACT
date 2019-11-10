import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import Marca from './components/marca/Marca';
import './App.css';
import Carro from './components/carro/Carro';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    };
  }

  changeTab = (tab) => {
    this.setState({
      activeTab: tab
    });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { this.changeTab('1'); }}
                  >
                    Carros
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { this.changeTab('2'); }}
                  >
                    Marcas
            </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <Carro></Carro>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <Marca></Marca>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;