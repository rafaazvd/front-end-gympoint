import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Select = styled(AsyncSelect)`
  .react-select__control {
    height: 42px;
    width: 100%;
    margin: 8px 0 22px;
  }
  .react-select__value-container {
    display: flex;
    height: 45px;
    align-items: center;
  }
  .react-select__input input {
    height: 14px;
  }
`;
