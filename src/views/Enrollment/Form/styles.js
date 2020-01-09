import styled from 'styled-components';

export const Container = styled.div`
    width: 80%;
    input {
        height: 36px;
    }
    `;
export const Label = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: ${props => (props.nospace ? '0px' : '15px')};
`;
