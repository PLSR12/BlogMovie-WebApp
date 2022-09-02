import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { ArticlesInput } from 'models/IArticles'
import { CategoriesAll } from 'models/ICategories'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ReactSelect from 'react-select'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { ArticlesService } from 'services/Articles.service'
import CategoryService from 'services/Categories.service'
import { ToastService } from 'services/toast.service'
import * as S from './styles'
import { NewArticleSchema } from './validations'

export default function NewArticles() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState<CategoriesAll[]>()
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)
  const history = useHistory()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ArticlesInput>({ resolver: yupResolver(NewArticleSchema) })

  const onSubmit = async (values: ArticlesInput) => {
    try {
      setModalLoadingIsOpen(true)

      const articleFormData = new FormData()

      articleFormData.append('title', values.title)
      articleFormData.append('preview', values.preview)
      articleFormData.append('content', values.content)
      articleFormData.append('category_id', values.category.id)
      articleFormData.append('file', values.file[0])

      await ArticlesService.insert(articleFormData) // chamo meu service de post passando o dado q desejo enviar a API

      ToastService.success('Artigo criado com sucesso') // chamo meu service de sucesso passando a mensagem q desejo exibir
      setModalLoadingIsOpen(false)

      setTimeout(() => {
        history.push('/admin-articles')
      }, 3000)
    } catch (error) {
      ToastService.error('Erro ao criar artigo ,tente novamente mais tarde') // chamo meu service de erro  passando a mensagem q desejo exibir
      setModalLoadingIsOpen(false)
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
