import { Contained } from './styles';

export function Cardcontained({ title, description }) {
    return (
        <Contained>
            <h1>{title}</h1>
            <p>{description}</p>
        </Contained>
    )
}