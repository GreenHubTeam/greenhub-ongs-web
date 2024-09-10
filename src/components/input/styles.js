import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display:flex ;
    flex-direction: column;
    gap: 0.4rem;
    
    margin-bottom: 8px;
    div>input{
        height:42px;
        width:100%;
        padding:12px;
        background-color: #A3A2A2;
        border:0;
        border-radius:5px;

        &:placeholder{
            color: white;
        }
    }

    div> svg{
        margin-left:16px;
    }

    
    > div {
        display: flex;
        align-items: center;
    }
`;