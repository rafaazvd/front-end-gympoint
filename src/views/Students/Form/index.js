import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';

import {
    Row,
    Title,
    Column,
    Buttons,
    Container,
    FormHeader,
    ContainerBody,
} from '../../../styles/form';
import {
    postInRequest,
    editInRequest,
} from '../../../store/modules/students/actions';


export default function Student({ location, match }) {
    const dispatch = useDispatch();
    const { id } = match.params;

    const stateStudent = (location.state) ? location.state.student : [];
    const initialData = stateStudent;
    const [student, setStudent] = useState(stateStudent);
    const schema = Yup.object().shape({
        name: Yup.string().required('O nome e obrigatorio'),
        email: Yup.string()
            .email(`Insira um e-mail valido`)
            .required('O e-mail e obrigatorio'),
        age: Yup.number()
            .typeError('Idade invalida')
            .positive()
            .required('A idade e obrigatoria'),
        weight: Yup.number()
            .typeError('Peso invalido')
            .positive()
            .required('O peso e obrigatorio'),
        height: Yup.number()
            .typeError('Altura invalida')
            .positive()
            .required('A altura e obrigatoria'),
    });

    async function handleSubmit({ ...data }) {
        if (id) {
            edit(data);
        } else {
            post(data);
        }
    }

    function post({ ...data }) {
        dispatch(postInRequest(data));
    }

    function edit({ ...data }) {
        dispatch(editInRequest({ ...data, id: student.id }));
    }

    return (
        <Container>
            <Form
            schema={schema}
            onSubmit={handleSubmit}
            initialData={initialData}
            >
                <FormHeader>
                    <Title>
                        <strong>
                         {id ? 'Editar aluno' : 'Cadastrar de aluno'}
                        </strong>
                    </Title>
                    <Buttons>
                        <Link to="/alunos" className="back">
                            <MdKeyboardArrowLeft size={22} color="#FFF" />
                            <span>Voltar</span>
                        </Link>
                        <button type="submit" className="btnSave">
                            <MdAdd size={22} color="#FFF" />
                            <span>Salvar</span>
                        </button>
                    </Buttons>
                </FormHeader>
                <ContainerBody>
                    <Row>
                        <Column>
                            <Input
                                style={{ width: '100%'}}
                                type="text"
                                name="name"
                                label="Nome completo"
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                style={{ width: '100%'}}
                                type="email"
                                name="email"
                                label="Endereco de e-mail"
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="age"
                                label="Idade"
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="weight"
                                label="Peso (em kg)"
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{}}
                                type="text"
                                name="height"
                                label="Altura"
                            />
                        </Column>
                    </Row>
                </ContainerBody>
            </Form>
        </Container>
    );
}
