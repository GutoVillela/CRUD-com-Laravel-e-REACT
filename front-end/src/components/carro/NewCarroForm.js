import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CarroService from '../../services/CarroService';
import MarcaService from '../../services/MarcaService';
import PubSub from './../../utils/PubSub';


class NewCarroForm extends Component {
    constructor(props) {
        super(props);

        this.carro = this.props.carro || {};

        this.state = {
            estaEditando: this.props.editando,
            marcas: [],
            modeloCarro: this.carro.modelo || '',
            anoCarro: this.carro.ano || '',
            marcaCarro: this.carro.marca_id || '',
        }

        PubSub.on('marcas.list', data => {
            if (this._isMounted) {
                this.setState({
                    marcas: data
                });
            }
        });

        this.service = new CarroService();
        this.marcaService = new MarcaService();

    }

    componentDidMount() {
        this._isMounted = true;
        this.marcaService.list();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
    }

    salvar = (e) => {
        e.preventDefault();
        console.log('Modelo: ' + this.state.modeloCarro + ' - Ano: ' + this.state.anoCarro + ' - Marca: ' + this.state.marcaCarro);
        this.carro.modelo = this.state.modeloCarro;
        this.carro.ano = this.state.anoCarro;
        this.carro.marca_id = this.state.marcaCarro;
        this.service.save(this.carro);
    }


    render() {
        return (
            <Row>
                <Col>
                    <Form onSubmit={this.salvar}>
                        <FormGroup>
                            <Label for="modeloCarro">Modelo</Label>
                            <Input onChange={this.handleChange} type="text" name="modeloCarro"
                                id="modeloCarro" value={this.state.nomeMarca} placeholder="Modelo do carro" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="anoCarro">Ano</Label>
                            <Input onChange={this.handleChange} type="number" name="anoCarro"
                                id="anoCarro" value={this.state.nomeMarca} placeholder="Ano do carro" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="marcaCarro">Marca</Label>
                            <Input type="select" name="marcaCarro" id="marcaCarro" onChange={this.handleChange} >
                                {
                                    this.state.marcas.map(marca => {
                                        return (
                                            <option key={marca.id} value={marca.id}>{marca.nome}</option>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>
                        <Button>{this.state.estaEditando ? 'Editar' : 'Cadastrar'}</Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default NewCarroForm;