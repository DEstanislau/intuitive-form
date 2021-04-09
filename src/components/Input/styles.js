import styled, { css } from 'styled-components';

import Warning from '~/components/Warning';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & + & {
    margin-top: 24px;
  }

  &:last-of-type {
    text-align: center;
    margin-bottom: 20px;
  }

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    !props.isErrored &&
    css`
      color: green;
      border-color: green;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: green;
    `}

  input {
    padding: 7px 0;
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #ddd;
    border-left: 0;
    transition: border-bottom-color 0.25s ease-in;

    &:focus {
      border-bottom-color: #285899;
      outline: 0;
    }
  }
  svg {
    margin-right: 16px;
  }

  div.container-check {
    height: 20px;
    margin-left: 16px;

    svg {
      margin: 0;
    }
  }
`;

export const Error = styled(Warning)`
  ${props =>
    props.disappear &&
    css`
      display: none;
    `}

  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
