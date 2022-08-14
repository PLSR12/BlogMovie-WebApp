import * as yup from 'yup';

export const LogInSchema = yup.object().shape({
  email: yup
    .string()
    .required(`O campo "email" deve ser preenchido!`)
    .email('E-mail inválido!'),
  password: yup
    .string()
    .required(`O campo "senha" deve possuir no mínino 6 caracteres.`)
    .min(6),
});
