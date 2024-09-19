import { z } from 'zod';

export const registerFormSchema = z.object({
    documento: z.string().min(1, 'Documento é obrigatório'),
    nomeSocial: z.string().min(1, 'Nome social é obrigatório'),
    descricao: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
    cep: z.string().min(1, 'CEP é obrigatório'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().min(1, 'Complemento é obrigatório'),
    bairro: z.string().min(1, 'Bairro é obrigatório'),
    estado: z.string().min(1, 'Estado é obrigatório'),
    telefone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.string().email('E-mail inválido'),
    nomeResponsavel: z.string().min(1, 'Nome do responsável é obrigatório'),
    cpfResponsavel: z.string().min(1, 'CPF do responsável é obrigatório'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmarSenha: z.string().min(6, 'Confirmação de senha deve ter no mínimo 6 caracteres'),
});