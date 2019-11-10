import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import MarcaService from '../../services/MarcaService';

class NewMarcaForm extends Component {
    constructor(props) {
        super(props);

        this.marca = this.props.marca || {};

        this.state = {
            estaEditando: this.props.editando,
            nomeMarca: this.marca.nome || '',
        }

    }

    salvar = (e) => {
        e.preventDefault();
        this.marca.nome = this.state.nomeMarca;
        (new MarcaService()).save(this.marca);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Row>
                <Col>
                    <Form onSubmit={this.salvar}>
                        <FormGroup>
                            <Label for="nomeMarca">Nome da marca</Label>
                            <Input onChange={this.handleChange} type="text" name="nomeMarca" id="nomeMarca" value={this.state.nomeMarca} placeholder="Nova marca" />
                        </FormGroup>
                        <Button>{this.state.estaEditando ? 'Editar' : 'Cadastrar'}</Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default NewMarcaForm;