import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display:flex ;
    flex-direction: column;
    gap: 0.4rem;
    
    margin-bottom: 8px;
    
    div>input{
        &:placeholder{
            color: white;
        }
        background-color:transparent;
        flex:1;
        border: none;
        padding:12px ;
    }

    div> svg{
       margin:0;
       margin-left:8px;
       
    }

    
    > div {
        display: flex;
        align-items: center;
        height:42px;
        width:100%;
        background-color: #f1f1f1;
        border:0;
        border-radius:5px;
        gap:0.5rem;
    }

`;