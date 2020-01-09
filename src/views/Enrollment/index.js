import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Table,
    Container,
} from '../../styles/form';
import { deleteInRequest } from '../../store/modules/enrollment/actions';
import api from '../../services/api';
import AlertConfirm from '../../components/Alert';


export default function Enrollment() {
    const dispatch = useDispatch();

    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        async function index() {
            const response = await api.get('enrollment');
            const data = response.data.map(enrollment => ({
                ...enrollment,
                startFormatted: format(
                    parseISO(enrollment.start_date),
                    "d 'de' MMMM 'de' yyyy",
                    {
                        locale: pt,
                    }
                ),
                endFormatted: format(
                    parseISO(enrollment.end_date),
                    "d 'de' MMMM 'de' yyyy",
                    {
                        locale: pt,
                    }
                ),
                activeText: enrollment.active ? 'Sim' : 'Nao',
            }));

            setEnrollments(data);
        }
        index();
    }, []);
    function handleDelete(enrollment) {
        dispatch(deleteInRequest(enrollment));
    }
    return (
        <Container>
            <Form>
                <FormHeader>
                    <Title>Gerenciando matrículas</Title>
                    <Buttons>
                        <Link to="/matriculas/cadastro">
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
                                <th>Aluno</th>
                                <th className="tdCenter">Plano</th>
                                <th className="tdCenter">Inicio</th>
                                <th>Termino</th>
                                <th>Ativa</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.map(enrollment => (
                                <tr key={enrollment.id}>
                                    <td>{enrollment.student.name}</td>
                                    <td>{enrollment.plan.title}</td>
                                    <td>{enrollment.startFormatted}</td>
                                    <td>{enrollment.endFormatted}</td>
                                    <td>{enrollment.activeText}</td>
                                    <td className="td1">
                                        <Link
                                            to={{
                                                pathname: `/matriculas/${enrollment.id}`,
                                                state: {
                                                    enrollment: enrollment,
                                                },
                                            }}
                                            className="editar"
                                        >
                                            <span>editar</span>
                                        </Link>
                                        <AlertConfirm confirm={() => handleDelete(enrollment)} title="apagar" />
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
