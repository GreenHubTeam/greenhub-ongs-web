import { z } from 'zod';

export const registerFormSchema = z.object({
        documento: z.string().min(1, (value => /^\d{14}$/.test(value), {message: 'CNPJ inválido',}), 'Documento é obrigatório'),
        nomeSocial: z.string().min(1, 'Nome social é obrigatório'),
        descricao: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
        cep: z.string().min(1, (value => /^\d{5}-?\d{3}$/.test(value), {message: 'CEP inválido',}), 'CEP é obrigatório'),
        cidade: z.string().min(1, 'cidade é obrigatório'),
        rua: z.string().min(1, 'rua é obrigatório'),
        numero: z.string().min(1, 'Número é obrigatório'),
        complemento: z.string().min(1, 'Complemento é obrigatório'),
        bairro: z.string().min(1, 'Bairro é obrigatório'),
        estado: z.string().min(1, 'Estado é obrigatório'),
        telefone: z.string().min(1, (value =>/^\(?\d{2}\)?[-\s]?\d{4,5}[-\s]?\d{4}$/.test(value), { message: 'Telefone inválido' }), 'Telefone é obrigatório'),
        email: z.string() .toLowerCase() .email('E-mail inválido'),
        nomeResponsavel: z.string().min(1, 'Nome do responsável é obrigatório'),
        cpfResponsavel: z.string().min(1, (value => /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(value), {message: 'CPF inválido',}), 'CPF do responsável é obrigatório'),
        senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
        confirmarSenha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});