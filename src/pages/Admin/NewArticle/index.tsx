import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { ArticlesInput } from 'models/IArticles'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { CategoriesOptions } from 'models/ICategories'
import ArticlesService from 'services/Articles.service'
import CategoryService from 'services/Categories.service'
import { ToastService } from 'services/toast.service'
import * as S from './styles'
import { NewArticleSchema } from './validations'

export default function NewArticles() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState<CategoriesOptions[]>([])
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
      articleFormData.append('category_id', values.category)
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

        allCategories.map((category: { name: string; id: number }) => {
          const categroyId = category.id
          const categoryLabel = category.name

          const categoryOption = {
            id: `${categroyId}`,
            label: `${categoryLabel}`,
          }

          setCategories((prevState: any) => [...prevState, categoryOption])
          setModalLoadingIsOpen(false)
        })
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
              label="Titúlo:"
              {...register('title')}
              name="title"
              error={errors.title}
              placeholder="Digite o Titúlo:"
            />

            <Atoms.TextAreaComponent
              {...register('preview')}
              name="preview"
              label="Preview:"
              error={errors.preview}
              placeholder="Digite a prévia:"
            />

            <Atoms.TextAreaComponent
              label="Contéudo:"
              {...register('content')}
              name="content"
              error={errors.content}
              placeholder="Digite o contéudo:"
            />

            <div>
              <S.LabelUpload>
                {fileName || (
                  <>
                    <CloudUploadIcon />
                    Caregue a imagem do artigo
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
              <Atoms.SelectComponent
                label={'Selecione uma Categoria'}
                options={categories}
                {...register('category')}
                error={errors.category}
              />
            </div>
            <S.ButtonStyle type="submit"> Adicionar Artigo </S.ButtonStyle>
          </form>
        </Organisms.Box>
      </S.Container>
    </>
  )
}
