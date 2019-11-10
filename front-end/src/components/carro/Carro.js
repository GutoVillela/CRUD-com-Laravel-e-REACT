import React, { Component } from 'react';
import CarroService from '../../services/CarroService';
import {
    Row, Col, Container, Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import CarroList from '../carro/CarroList';
import NewCarroForm from '../carro/NewCarroForm';

class Carro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carros: [],
            modal: false,
            form: {
                titulo: "",
                carro : {},
                editando: true
            }
        }

        this.service = new CarroService();
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    formEdicao = (carro) => {
        this.setState({
            form: {
                titulo: "Editar carro",
                carro,
                editando: true
            }
        })
        this.toggleModal();
    }

    formCriacao = () => {
        this.setState({
            form: {
                titulo: "Novo carro",
                editando: false
            }
        })
        this.toggleModal();
    }

    criarCarro() {
        this.formCriacao();
    }

    render() {
        return (
            <Container>
                <CarroList></CarroList>
                <Row>
                    <Col>
                        <Button color="primary" onClick={() => this.criarCarro()}>Adicionar outro</Button>
                    </Col>
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.form.titulo}</ModalHeader>
                    <ModalBody>
                        <NewCarroForm editando={this.state.form.editando} carro={this.state.form.carro}></NewCarroForm>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default Carro;