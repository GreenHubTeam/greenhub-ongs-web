import { Container } from './styles';


export function Header() {

    return (
        <Container>
            <img src='/public/logogreenhub.png' alt='Logo do Greenhub' />
            <p>
                <span style={{ color: '#22703E' }}>Gre</span>
                <span style={{ color: '#3A914D' }}>en</span>
                <span style={{ color: '#3A914D' }}>Hub</span>
            </p>
        </Container>
    );
}