import { Container } from './styles';

export function Input({ icon: Icon, label, ...rest }) {

    return (
        <Container>
            <label
                htmlFor={label}
            >
                {label}
            </label>
            <div>
                {Icon && <Icon size={20} />}
                <input
                    {...rest}
                    id={label}
                />
            </div>
        </Container>
    )
}