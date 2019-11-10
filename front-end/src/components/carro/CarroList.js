import React, { Component } from 'react';
import {
    Button, Card, CardBody, CardTitle, Table
} from 'reactstrap';
import CarroService from '../../services/CarroService';
import PubSub from './../../utils/PubSub';

class CarroList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            namespace : "carros",
            carros: []
        };

        this.service = new CarroService();

        PubSub.on(this.state.namespace + '.list', data => {
            this.setState({
                carros: data
            });
        });

        PubSub.on(this.state.namespace + '.save', () => {
            this.service.list();
        });

        PubSub.on(this.state.namespace + '.deleted', () => {
            this.service.list();
        });

    }

    componentDidMount() {
        this.service.list();
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle><h4 className="pull-left">Carros</h4></CardTitle>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th>Marca</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.carros.map(carro => {
                                    return (
                                        <tr key={carro.id}>
                                            <td>{carro.id}</td>
                                            <td>{carro.modelo}</td>
                                            <td>{carro.ano}</td>
                                            <td>{carro.marca_id}</td>
                                            <td>
                                                <Button color="info" onClick={() => this.editar(carro)}>Editar</Button>
                                                <Button className="ml-1" color="danger" onClick={() => this.remover(carro.id)}>Apagar</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }

}

export default CarroList;