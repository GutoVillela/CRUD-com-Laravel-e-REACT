import React, { Component } from 'react';
import {
    Button, Card, CardBody, CardTitle, Table
} from 'reactstrap';
import MarcaService from './../../services/MarcaService';
import PubSub from './../../utils/PubSub';

class MarcaList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marcas: []
        };
        this.service = new MarcaService();

        PubSub.on('marcas.list', data => {
            this.setState({
                marcas: data
            });
        });

        PubSub.on('marcas.save', () => {
            this.service.list();
        });

        PubSub.on('marcas.deleted', () => {
            this.service.list();
        });
    }


    componentDidMount() {
        this.service.list();
    }

    editar = (marca) => {
        this.props.formEdicao(marca);
    }

    remover = (id) => {
        this.service.remove(id);
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle><h4 className="pull-left">Marcas</h4></CardTitle>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.marcas.map(marca => {
                                    return (
                                        <tr key={marca.id}>
                                            <td>{marca.id}</td>
                                            <td>{marca.nome}</td>
                                            <td>
                                                <Button color="info" onClick={() => this.editar(marca)}>Editar</Button>
                                                <Button className="ml-1" color="danger" onClick={() => this.remover(marca.id)}>Apagar</Button>
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

export default MarcaList;