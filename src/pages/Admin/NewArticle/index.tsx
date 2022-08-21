import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { CategoriesAll } from 'models/ICategories'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ReactSelect from 'react-select'
import * as Yup from 'yup'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { ArticlesService } from 'services/Articles.service'
import CategoryService from 'services/Categories.service'
import { ToastService } from 'services/toast.service'
import * as S from './styles'

export default function NewArticles() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState<CategoriesAll[]>()
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)
  const history = useHistory()

  const schema = Yup.object().shape({
    title: Yup.string().required('O campo "nome" é obrigatório'),
    preview: Yup.string().required('O campo "preview" é obrigatória'),
    content: Yup.string().required('O campo "conteudo" é obrigatório'),
    category: Yup.object().required('Escolha uma categoria'),
    file: Yup.mixed().test('required', 'Carregue uma imagem', (value: any) => {
      return value && value.length > 0
    }),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data: any) => {
    try {
      const articleFormData = new FormData()

      articleFormData.append('title', data.title)
      articleFormData.append('preview', data.preview)
      articleFormData.append('content', data.content)
      articleFormData.append('category_id', data.category.id)
      articleFormData.append('file', data.file[0])

      await ArticlesService.insert(articleFormData)
      ToastService.success('Artigo criado com sucesso')
      setTimeout(() => {
        history.push('/admin-articles')
      }, 3000)
    } catch (error) {
      ToastService.error('Erro ao criar artigo ,tente novamente mais tarde')
    }
  }

  useEffect(() => {
    async function loadCategory() {
      try {
        const allCategories = await CategoryService.getAll().then(
          (response: any) => response
        )

        setCategories(allCategories)
        setModalLoadingIsOpen(false)
      } catch (error) {
        ToastService.error(
          'Erro ao buscar as Categorias,tente novamente mais tarde'
        )
      }
    }
    loadCategory()
  }, [])

  return (
    <>
      <GenericModal isOpen={modalLoadingIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
        </ModalContentLoading>
      </GenericModal>
      <S.Container>
        <Organisms.Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Atoms.InputComponent
              text="Titúlo:"
              register={register}
              htmlFor="title"
              error={errors.title}
            />
            <Atoms.TextAreaComponent
              text="Preview:"
              register={register}
              htmlFor="preview"
              error={errors.preview}
            />
            <Atoms.TextAreaComponent
              text="Contéudo:"
              register={register}
              htmlFor="content"
              error={errors.content}
            />
            <div>
              <S.LabelUpload>
                {fileName || (
                  <>
                    <CloudUploadIcon />
                    Caregue a imagem da notícia
                  </>
                )}
                <input
                  type="file"
                  {...register('file')}
                  onChange={(value: any): void => {
                    setFileName(value.target.files[0]?.name)
                  }}
                />
              </S.LabelUpload>
              <Organisms.ErrorMessage>
                {errors.file?.message}
              </Organisms.ErrorMessage>
            </div>
            <div>
              <Controller
                name="category"
                control={control}
                render={({ field }) => {
                  return (
                    <ReactSelect
                      {...field}
                      options={categories}
                      getOptionLabel={(ctg: { id: any; name: string }) =>
                        ctg.name
                      }
                      getOptionValue={(ctg: { id: any }) => ctg.id}
                      placeholder="Escolha uma categoria"
                    />
                  )
                }}
              ></Controller>
              <Organisms.ErrorMessage>
                {errors.category?.message}
              </Organisms.ErrorMessage>
            </div>
            <S.ButtonStyle type="submit"> Adicionar Noticia </S.ButtonStyle>
          </form>
        </Organisms.Box>
      </S.Container>
    </>
  )
}
