import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    margin-bottom: 20px;
    padding-left: 30px;
    width: 90%;
    border-radius: 4px;

    form {
        label {
            display: flex;
            font-size: 14px;
            color: #444444;
            margin-bottom: 7px;
            font-weight: bold;
            text-transform: uppercase;
        }

        input {
            border: solid -1px;
            border-radius: 3px;
            padding: 4px;
            height: 45px;
            width: 100%;
        }

        button {
            height: 43px;
            background: #ee4d64;
        }

        button {
            display: flex;
            color: #fff;
            justify-content: center;
            font-weight: bold;
            align-items: center;
            border-radius: 6px;
            border: 0;
            font-size: 14px;
            transition: background 0.3s;
            width: 100%;
            margin-top: 17px;
        }
    }
`;

export const LogoGympointImage = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 12px;
`;

export const LogoGympoint = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    margin-bottom: 30px;
`;
