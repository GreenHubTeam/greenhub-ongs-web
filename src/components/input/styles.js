import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display:flex ;
    align-items: center;
    
    margin-bottom: 8px;
    border-radius: 10px;
    margin-inline:15px;

    >input{
        height:42px;
        width:100%;


        padding:12px;

        background-color: #A3A2A2;
        border:0;
        border-radius:10px;

        &:placeholder{
            color: white;
        }
    }

    > svg{
        margin-left:16px;
    }

    >p{
        margin-right: 16px;
    }
`;