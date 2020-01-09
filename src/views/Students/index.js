import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import api from '../../services/api';
import AlertConfirm from '../../components/Alert';

import {
    FormHeader,
    Title,
    Buttons,
    Container,
    ContainerBody,
    Search,
    Table,
} from '../../styles/form';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState([]);

    useEffect(() => {
        async function getStudents() {
            try {
                const response = await api.get('students');
                setStudents(response.data);
                setStudent(response.data);
            } catch (err) {
                toast.error('Houve uma falha ao carregar os dados.');
            }
        }
        getStudents();
    }, []);

    const options = useMemo(
        () =>
            students.map(student => ({
                value: student.id,
                label: student.name,
            })),
        [students]
    );

    function handleChange(event) {
        const filter = [students.find(student => student.id === event.value)];
        setStudent(filter);
    }

    const customStyles = {
        valueContainer: base => ({
            ...base,
            padding: '0px 6px',
        }),
        input: base => ({
            ...base,
            margin: 0,
            padding: 0,
        }),
    };

    async function handleDelete(id) {
        try {
            const response = await api.delete(`students/${id}`);
            if (response) {
                toast.info('Registro deletado!');

                const filter = students.filter(function (student) {
                    return student.id === id;
                });
                for (let student of filter) {
                    let index = students.indexOf(student);
                    students.splice(index, 1);
                }

                setStudents(students);

            }
        } catch (err) {
            toast.error(err.response.data.error);
        }

    }

    return (
        <>
            <Container>
                <Form>
                    <FormHeader>
                        <Title>Gerenciando alunos</Title>
                        <Buttons>
                            <Buttons>
                                <Link to="/alunos/cadastro">
                                    <MdAdd size={20} color="#FFF" />
                                    <span>Cadastrar</span>
                                </Link>
                            </Buttons>
                            <Search>
                                <Select
                                    onChange={handleChange}
                                    styles={customStyles}
                                    options={options}
                                />
                            </Search>
                        </Buttons>
                    </FormHeader>
                </Form>

                <ContainerBody>
                    <Table>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th className="tdCenter">Idade</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {student.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td className="tdCenter">
                                            {student.age}
                                        </td>
                                        <td className="td1">
                                            <Link
                                                className="editar"
                                                to={{
                                                    pathname: `/alunos/${student.id}`,
                                                    state: {
                                                        student: student
                                                    }
                                                }}
                                            >
                                                <span>editar</span>
                                            </Link>
                                            <AlertConfirm confirm={
                                                () => handleDelete(student.id)
                                            } title="apagar" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Table>
                </ContainerBody>
            </Container>
        </>
    );
}
