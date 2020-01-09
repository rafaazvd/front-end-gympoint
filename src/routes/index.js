import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../views/SignIn';
import Students from '../views/Students';
import StudentsForm from '../views/Students/Form';
import Plans from '../views/Plans';
import PlansForm from '../views/Plans/Form';
import Enrollments from '../views/Enrollment';
import EnrollmentForm from '../views/Enrollment/Form';
import HelpOrders from '../views/HelpOrders';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route
                path="/alunos/cadastro"
                exact
                isPrivate
                component={StudentsForm}
            />
            <Route
                path="/alunos/:id"
                exact
                isPrivate
                component={StudentsForm}
            />
            <Route
                path="/alunos"
                exact
                isPrivate
                component={Students}
            />
            <Route
                path="/planos/cadastro"
                exact
                isPrivate
                component={PlansForm}
            />
            <Route
                path="/planos/:id"
                exact
                isPrivate
                component={PlansForm}
            />
            <Route
                path="/planos"
                exact
                isPrivate
                component={Plans}
            />
            <Route
                path="/matriculas"
                isPrivate
                exact
                component={Enrollments}
            />
            <Route
                path="/matriculas/cadastro"
                isPrivate
                exact
                component={EnrollmentForm}
            />
            <Route
                path="/matriculas/:id"
                isPrivate
                exact
                component={EnrollmentForm}
            />
            <Route
                path="/auxilio"
                isPrivate
                exact
                component={HelpOrders}
            />
        </Switch>
    );
}
