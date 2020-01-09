import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Content,
    HeaderStyle,
    HeaderLogo,
    Navigation,
    HeaderProfile,
} from './styles';
import logo1 from '../../assets/logo.svg';
import logo2 from '../../assets/gym.svg';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
    const dispatch = useDispatch();
    // const profile = useSelector(state => state.user.profile);
    // criando navegação estrutural
    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            route: '/alunos',
            label: 'ALUNOS',
            active: true,
        },
        {
            route: '/planos',
            label: 'PLANOS',
            active: false,
        },
        {
            route: '/matriculas',
            label: 'MATRÍCULAS',
            active: false,
        },
        {
            route: '/auxilio',
            label: 'PEDIDOS DE AUXÍLIO',
            active: false,
        },
    ]);

    function handleSignOut() {
        dispatch(signOut());
    }

    function handleChangeBreadcrumbs(label) {
        const data = breadcrumbs.map(breadcrumb => ({
            ...breadcrumb,
            active: breadcrumb.label === label && true,
        }));
        setBreadcrumbs(data);
    }

    return (
        <Content>
            <HeaderStyle>
                <HeaderLogo>
                    <img src={logo1} alt="Logo" />
                    <img src={logo2} alt="Gympoint" />
                </HeaderLogo>
                <Navigation active>
                    <nav>
                        {breadcrumbs.map(breadcrumb => (
                            <Link
                                key={breadcrumb.label}
                                className={breadcrumb.active ? 'active' : ''}
                                to={breadcrumb.route}
                                onClick={() =>
                                    handleChangeBreadcrumbs(breadcrumb.label)
                                }
                            >
                                {breadcrumb.label}
                            </Link>
                        ))}
                    </nav>
                </Navigation>
            </HeaderStyle>
            <HeaderProfile>
                <h3>profileDotname</h3>
                <button type="button" onClick={handleSignOut}>
                    <span>sair</span>
                </button>
            </HeaderProfile>
        </Content>
    );
}
