import * as Yup from 'yup'

export const NewCategorySchema = Yup.object().shape({
  name: Yup.string().required('O campo "Nome" é obrigatório'),
  file: Yup.mixed().test('required', 'Carregue uma imagem', (value: any) => {
    return value && value.length > 0
  }),
})
