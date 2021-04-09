import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  p, strong {
    color: #EFEFEF;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #000;
  }

  html, body, #root{
    background: #ececec;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  }

  body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  body, input, button {
    font: 14px 'Roboto Slab', serif;
  }

  a{
    text-decoration: none;
  }

  ul{
    list-style: none;
  }

  button{
    cursor: pointer;
  }

`;
