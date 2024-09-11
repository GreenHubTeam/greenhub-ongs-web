import { Container, Content, } from './styles.js';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { AiOutlineUser } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import { Cardcontained } from '../../components/cardcontained';

export function Cadastro() {
  return (
    <Container>
      <Header />
      <main>
        <Content>
          <div>
            <Cardcontained
              title="Dados pessoais:"
              description="Preencha com as informações da empresa."
            />

            <Input
              label='Documento'
              placeholder='CNPJ'
              type='text'
              icon={AiOutlineUser}
            />

            <Input
              placeholder="Nome"
              text="text"
              label="Nome Social"
              icon={FaPen}
            />

            <Input
              placeholder="Descrição da ONG"
              label="Descrição"
              type="text"
            />
          </div>
          <div>
            <Cardcontained
              title="Localização: "
              description="Insira a localização da sua empresa"
            />

            <Input />
          </div>
        </Content>
      </main>
    </Container>
  )
}