import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Row,
    Container,
    Column,
} from '../../../styles/form';
import { postInRequest, editInRequest } from '../../../store/modules/Plans/actions';
import { formatPrice } from '../../../components/util/format';

export default function Registration({ location, match }) {

    const dispatch = useDispatch();
    const { id } = match.params;

    const statePlan = (location.state) ? location.state.plan :[];
    const initialData = statePlan;

    const [plan, setPlan] = useState(statePlan);
    const priceTotal = useMemo(() => {
        return formatPrice(plan.price * plan.duration);
    }, [plan]);

    const schema = Yup.object().shape({
    title: Yup.string().required('O título é obrigatório'),
    duration: Yup.string().required('A duração é obrigatória'),
    price: Yup.string().required('O valor é obrigatório'),
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
        dispatch(editInRequest({ ...data, id: plan.id }));
    }

    return (
        <Container>
            <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
                <FormHeader>
                    <Title>
                        <strong>
                         {id ? 'Edição de plano' : 'Cadastrando plano'}
                         </strong>
                    </Title>
                    <Buttons>
                        <Link to="/planos" className="back">
                            <MdKeyboardArrowLeft size={20} color="#FFF" />
                            <span>Voltar</span>
                        </Link>
                        <button type="submit" className="btnSave">
                            <MdAdd size={20} color="#FFF" />
                            <span>Salvar</span>
                        </button>
                    </Buttons>
                </FormHeader>
                <ContainerBody>
                    <Row>
                        <Column>
                            <Input
                                style={{ width: '83.6%'}}
                                type="text"
                                name="title"
                                label="Titulo do plano"
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                type="text"
                                name="duration"
                                label="Duracao (em meses)"
                                onBlur={(evt) => { setPlan({ ...plan, duration: evt.target.value }) }}
                            />
                        </Column>

                        <Column>
                            <Input
                                type="text"
                                name="price"
                                label="Preco mensal"
                                onBlur={(evt) => { setPlan({ ...plan, price: evt.target.value }) }}
                            />
                        </Column>

                        <Column>
                            <Input
                                style={{ backgroundColor: '#e9e9e9'}}
                                type="text"
                                name="height"
                                label="Preço total"
                                readOnly
                                value={priceTotal}
                            />
                        </Column>
                    </Row>
                </ContainerBody>
            </Form>
        </Container>
    );
}
