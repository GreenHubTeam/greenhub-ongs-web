import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin:0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background-color: '#DFDEDE';
    }

    button{
        cursor: pointer;
        transition-timing-function: filter 0.2s;

    }

    button:hover{
        filter: brightness(0.9);
    }
`;