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
              title="Dados pessoais"
              description="lorem impsun"
            />

            <Input
              label='Documento'
              placeholder='CNPJ'
              type='text'
              icons={AiOutlineUser}
            />

            <Input
              placeholder="Nome"
              text=""
              label="Nome Social"
              icon={FaPen}
            />

            <Input
              placeholder="Descrição da ONG"
              label="Descrição
                "
            />
          </div>
          <div>
            <Cardcontained
              title="Localização "
              description="lorem impsun"
            />

            <Input />
          </div>
        </Content>
      </main>
    </Container>
  )
}