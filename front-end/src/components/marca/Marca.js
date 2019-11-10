import React, { Component } from 'react';
import MarcaList from './MarcaList';
import NewMarcaForm from './../../components/marca/NewMarcaForm';
import {
    Row, Col, Container, Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import MarcaService from './../../services/MarcaService';
import PubSub from './../../utils/PubSub';

class Marca extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marcas: [],
            modal: false,
            form: {
                titulo: "",
                marca: {},
                editando:true
              }
        };
        this.service = new MarcaService();

        PubSub.on('marcas.save', () => {
            this.toggleModal();
        });
        
    }

    toggleModal = () => {
        this.setState({
          modal: !this.state.modal
        })
    }

    formEdicao = (marca) => {
        this.setState({
          form: {
            titulo: "Editar marca",
            marca,
            editando:true
          }
        })
        this.toggleModal();
    }

    formCriacao = () => {
        this.setState({
          form: {
            titulo: "Nova marca",
            editando:false
          }
        })
        this.toggleModal();
    }

    criarMarca(){
        this.formCriacao();
    }

    render() {
        const { form } = this.state;
        return (
            <Container>
                <MarcaList formEdicao={ (marca) => this.formEdicao(marca) }></MarcaList>
                <Row>
                    <Col>
                        <Button color="primary" onClick={() => this.criarMarca()}>Adicionar outra</Button>
                    </Col>
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{form.titulo}</ModalHeader>
                    <ModalBody>
                        <NewMarcaForm editando={this.state.form.editando} marca={this.state.form.marca}></NewMarcaForm>
                        {/* <CategoriaForm categoria={form.categoria}></CategoriaForm> */}    
                    </ModalBody>
                </Modal>
            </Container>
        );
    }

}

export default Marca;