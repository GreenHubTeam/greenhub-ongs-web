import {Container, Content,} from './styles.js';
import Logo from '../../../public/logogreenhub.png'

import {Header} from '../../components/header';
import {Input}  from '../../components/input';
import { Cardcontained } from '../../components/cardcontained';

import {AiOutlineUser} from 'react-icons/ai';
import { FaPen} from 'react-icons/fa';

export function Cadastro (){

    return(
        
        <Container>
           
          <Header/>
          <main>
            <Content>
              <div>
                <div>
                  <Cardcontained>
                    <p>box</p>
                  </Cardcontained>
                    
                </div>

                
                 
                  <Input
                   label= ''
                   placeholder='CNPJ'
                   type= 'text'
                   icons={AiOutlineUser}
                   />

                  <p>Nome social</p>
                  <Input 
                  placeholder="Nome"
                  text=""
                  icon={FaPen}
                  />

                  <p>Descrição da ONG</p>
                  <Input placeholder=""/>

                
              </div>
            </Content>
          </main>  

        </Container>
        
    )
}