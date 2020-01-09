import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import {
    FormHeader,
    Title,
    Buttons,
    Container,
    ContainerBody,
    Table,
} from '../../styles/form';
import api from '../../services/api';
import { formatPrice } from '../../components/util/format';
import AlertConfirm from '../../components/Alert';
import { deleteInRequest } from '../../store/modules/Plans/actions';

export default function Plans() {
    const dispatch = useDispatch();
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        async function getPlans() {
            const response = await api.get('plans');

            const data = response.data.map(plan => {
                return {
                  ...plan,
                  priceFormatted: formatPrice(plan.price),
                };
              });

            setPlans(data);
        }
        getPlans();
    }, []);

    function handleDelete(plan) {
        dispatch(deleteInRequest(plan));
    }

    return (
        <Container>
            <Form>
                <FormHeader>
                    <Title>Gerenciando planos</Title>
                    <Buttons>
                        <Link to="/planos/cadastro">
                            <MdAdd size={20} color="#FFF" />
                            <span>Cadastrar</span>
                        </Link>
                    </Buttons>
                </FormHeader>
            </Form>

            <ContainerBody>
                <Table>
                    <table>
                        <thead>
                            <tr>
                                <th>TÍTULO</th>
                                <th className="tdCenter">DURAÇÃO</th>
                                <th className="tdCenter">VALOR P/ MÊS</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {plans.map(plan => (
                                <tr key={plan.id}>
                                    <td>{plan.title}</td>
                                    <td className="tdCenter">
                                    { plan.duration > 1 ? `${plan.duration} meses` : `${plan.duration} mês`}
                                    </td>
                                    <td className="tdCenter">
                                        {plan.priceFormatted}
                                    </td>
                                    <td className="td1">
                                        <Link
                                            to={{
                                                pathname: `/planos/${plan.id}`,
                                                state: {
                                                    plan: plan
                                                }
                                            }}
                                            className="editar"
                                        >
                                            <span>editar</span>
                                        </Link>
                                        <AlertConfirm confirm={() => handleDelete(plan)} title="apagar" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Table>
            </ContainerBody>
        </Container>
    );
}
