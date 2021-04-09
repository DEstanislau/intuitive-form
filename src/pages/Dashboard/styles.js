import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background: #ffffff;
`;

export const Panel = styled.div`
  padding: 0 0 32px;
  width: 500px;

  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);

  h1 {
    margin-top: 30px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #285899;
  }

  div.sucess-div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  img.img-congratulations {
    display: flex;
    align-self: center;
  }
`;

export const PanelHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const PanelTitle = styled.h1`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #285899;
`;

export const PanelBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;

export const PanelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: block; */
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  margin-top: 20px;
  color: #fff;
  background-color: #285899;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }

  ${props =>
    props.disabled &&
    css`
      color: rgba(0, 0, 0, 0.2);
      background-color: rgba(0, 0, 0, 0.2);
    `}

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }

  div.c-loader {
    animation: is-rotating 1s infinite;
    border: 6px solid #e5e5e5;
    border-radius: 50%;
    border-top-color: #51d4db;
    height: 30px;
    width: 30px;
  }
`;

export const AddressFieldContainer = styled.div`
  border-top-width: 1px;
  border-top-color: #999;
  padding-top: 24px;

  ${props =>
    !props.show &&
    css`
      display: none;
    `}
`;
