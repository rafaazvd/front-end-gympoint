import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdAdd, MdKeyboardArrowLeft } from 'react-icons/md';
import { Select, Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { addMonths, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { formatPrice } from '../../../components/util/format';
import api from '../../../services/api';
import AsyncSelect from '../../../components/AsyncSelect';
import Date from './Date';
import {
    FormHeader,
    Title,
    Buttons,
    ContainerBody,
    Row,
    Column,
} from '../../../styles/form';
import { postInRequest, editInRequest } from '../../../store/modules/enrollment/actions';
import { Container, Label } from './styles';

export default function Enrollment({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const schema = Yup.object().shape({
        plan_id: Yup.string().required('É obrigatório selecionar um plano'),
        start_date: Yup.string().required('É obrigatório selecionar uma data'),
    });
    const [duration, setDuration] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [plans, setPlans] = useState([]);
    const [Students, setStudents] = useState('');
    const [planId, setPlanId] = useState([]);

  useEffect(() => {
    async function getEnrollment() {
      if (id) {
        const response = await api.get(`enrollment/${id}`);
        const { student, plan, start_date } = response.data;
        setStudents({ id: student.id, title: student.name });
        setPlanId(plan.id);
        setDuration(plan.duration);
        setTotalPrice(plan.price);
        setStartDate(parseISO(start_date));
      }
    }
    getEnrollment();
  }, [id]);

  const formattedPrice = useMemo(() => {
    return formatPrice(duration * totalPrice);
  }, [duration, totalPrice]);

  const endDate = useMemo(() => {
    if (startDate && duration) {
      const changeDate = addMonths(startDate, duration);
      return format(changeDate, 'dd/MM/yyyy', { locale: pt });
    }
    return '';
  }, [startDate, duration]);

  async function getPlans() {
    const response = await api.get('plans');

    setPlans(response.data);
  }

  useEffect(() => {
    getPlans();
  }, []);
  async function handleSubmit({ ...data }) {
    if (id) {
      const price = duration * totalPrice;
      const end_date = addMonths(startDate, duration);
      const data1 = Object.assign(data, {
        student_id: Students.id,
        end_date,
        price,
      });
      edit(data1);

    } else {
        const price = duration * totalPrice;
        const end_date = addMonths(startDate, duration);
        const data1 = Object.assign(data, {
            student_id: Students.id,
            end_date,
            price,
        });
        post(data1);
    }
}

function post({ ...data }) {
    dispatch(postInRequest(data));
}

function edit({ ...data }) {
    dispatch(editInRequest({ ...data, id: id }));
}

  async function getStudents(inputValue) {
    const response = await api.get(`students`, {
      params: {
        search: inputValue,
      },
    });

    const data = response.data.map(student => {
      return {
        id: student.id,
        title: student.name,
      };
    });

    return data;
  }

  function onPlanChange(e) {
    const find = plans.find(plan => String(plan.id) === e.target.value);
    setPlanId(e.target.value);
    setDuration(find.duration);
    setTotalPrice(find.price);
  }

    return (
        <Container>
            <Form schema={schema} onSubmit={handleSubmit}>
                <FormHeader>
                    <Title>
                        <strong>
                         {id ? 'Edição de matrícula' : 'Cadastro de matrícula'}
                        </strong>
                    </Title>
                    <Buttons>
                        <Link to="/matriculas" className="back">
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
                <Column>
          <Label nospace>
            <strong>ALUNO</strong>
            <AsyncSelect
              name="student_id"
              placeholder="Buscar aluno"
              value={Students}
              onChange={change => setStudents(change)}
              loadOptions={getStudents}
            />
          </Label>
          <Row>
            <Label nospace>
              <strong>PLANO</strong>
              <Select
                name="plan_id"
                placeholder="Selecione o plano"
                options={plans}
                value={planId}
                onChange={onPlanChange}
              />
            </Label>
            <Label>
              <strong>DATA DE INÍCIO</strong>
              <Date
                name="start_date"
                placeholder="Escolha a data"
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </Label>
            <Label>
              <strong>DATA DE TÉRMINO</strong>
              <Input name="end_date" value={endDate} disabled />
            </Label>
            <Label>
              <strong>VALOR TOTAL</strong>
              <Input name="price" value={formattedPrice} disabled />
            </Label>
          </Row>
        </Column>
                </ContainerBody>
            </Form>
        </Container>
    );
}
