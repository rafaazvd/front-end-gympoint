import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import { Container } from './styles';

export default function AlertConfirm({ confirm, title }) {
    const [state, setState] = useState({ alert: null });

    function onCancel() {
        setState({});
    }

    function handleConfirm() {
        confirm();
        onCancel();
    }

    function deleteThisGoal() {
        const getAlert = () => (
            <SweetAlert
                showCancel
                confirmBtnText="Sim, Confirmar"
                confirmBtnStyle={{ backgroundColor: '#ee4d64' }}
                cancelBtnText="Cancelar"
                cancelBtnStyle={{ backgroundColor: '#dddddd' }}
                title="Confirmar ação!"
                onConfirm={handleConfirm}
                onCancel={onCancel}
                focusCancelBtn
            >
                Este registro sera permanentemente apagado!
            </SweetAlert>
        );

        setState({
            alert: getAlert(),
        });
    }

    return (
        <Container>
            <a
                type="button"
                className="apagar"
                onClick={() => deleteThisGoal()}
            >
                {title}
                {state.alert}
            </a>
        </Container>
    );
}
