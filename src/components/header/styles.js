import styled from 'styled-components';

export const Container = styled.header`
    grid-area: header;
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, ;
    font-weight: 700;
    height: 105px;
    width: 100%;

    display: flex;
    align-items: center;
    padding:0px;

    justify-content: center;

    gap: 1rem;

    >img{
        width: 80px;
        height: 80px;
        
    }
    
    > p {
        font-size: 1.5rem;
    }
`;