import * as Yup from 'yup'

export const EditArticleSchema = Yup.object().shape({
  title: Yup.string().required('O campo "Titúlo" é obrigatório'),
  preview: Yup.string().required('O campo "Preview" é obrigatória'),
  content: Yup.string().required('O campo "Conteudo" é obrigatório'),
  category: Yup.object().required('Escolha uma categoria'),
  file: Yup.mixed().test('required', 'Carregue uma imagem', (value: any) => {
    return value && value.length > 0
  }),
})
