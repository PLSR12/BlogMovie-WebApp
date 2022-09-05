import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { ArticlesInput } from 'models/IArticles'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { CategoriesOptions } from 'models/ICategories'

import { ArticlesService } from 'services/Articles.service'
import CategoryService from 'services/Categories.service'
import { ToastService } from 'services/toast.service'
import * as S from './styles'
import { EditArticleSchema } from './validations'

export default function EditArticle() {
  const [fileName, setFileName] = useState(null)
  const [article, setArticle] = useState<any>()
  const [categories, setCategories] = useState<CategoriesOptions[]>([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)
  const history = useHistory()
  const { id } = useParams<{ id: any }>()

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ArticlesInput>({ resolver: yupResolver(EditArticleSchema) })

  const onSubmit = async (values: ArticlesInput) => {
    try {
      setModalLoadingIsOpen(true)

      const splitedId = id.split(':')[1]
      const articleFormData = new FormData()

      articleFormData.append('title', values.title)
      articleFormData.append('preview', values.preview)
      articleFormData.append('content', values.content)
      articleFormData.append('category_id', values.category)
      articleFormData.append('file', values.file[0])

      await ArticlesService.update({ data: articleFormData, id: splitedId }) // chamo meu service de put passando o dado q desejo enviar a API

      ToastService.success('Artigo editado com sucesso') // chamo meu toast service de sucesso passando a mensagem q desejo exibir
      setModalLoadingIsOpen(false)

      setTimeout(() => {
        history.push('/admin-articles')
      }, 3000)
    } catch (error) {
      ToastService.error('Erro ao editar artigo ,tente novamente mais tarde') // chamo meu toast service de erro  passando a mensagem q desejo exibir
      setModalLoadingIsOpen(false)
    }
  }

  useEffect(() => {
    async function oneArticle() {
      /*
      Nesse caso eu encapsulo dentro de um (try,catch) pois minha chamada a API pode dar erro e eu preciso estar preparado para isso, 
      se cair no catch chamo meu toast service de error e exibo ao usuário  */
      try {
        const splitedId = id.split(':')[1]

        const OneArticle = await ArticlesService.getById(splitedId).then(
          (response: any) => response
        ) // chamo meu service getById passando meu splitedId(id do dado que quero buscar na API)

        setArticle(OneArticle) // seto no state esse dado recebido da API
        setModalLoadingIsOpen(false)
      } catch (error) {
        ToastService.error('Erro ao buscar artigo, tente novamente mais tarde') // chamo meu toast service de erro em caso de falha na requisição
      }
    }
    oneArticle()
  }, [id])

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

  useEffect(() => {
    setValue('title', article?.title)
    setValue('preview', article?.preview)
    setValue('content', article?.content)
    setValue('file', article?.url)
    setValue('category', article?.category_id)
    setFileName(article?.path)
  }, [article, categories])

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
            <Controller
              control={control}
              name="title"
              render={({ field }: any) => (
                <Atoms.InputComponent
                  label="Titúlo:"
                  {...field}
                  error={errors.title}
                  placeholder="Digite o Titúlo:"
                />
              )}
            />
            <Controller
              control={control}
              name="preview"
              render={({ field }: any) => (
                <Atoms.TextAreaComponent
                  {...field}
                  label="Preview:"
                  error={errors.preview}
                  placeholder="Digite a prévia:"
                />
              )}
            />
            <Controller
              control={control}
              name="content"
              render={({ field }: any) => (
                <Atoms.TextAreaComponent
                  label="Contéudo:"
                  {...field}
                  error={errors.content}
                  placeholder="Digite o contéudo:"
                />
              )}
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
                label={'Selecione uma Categoria:'}
                options={categories}
                {...register('category')}
                error={errors.category}
              />
            </div>
            <S.ButtonStyle type="submit"> Editar Artigo </S.ButtonStyle>
          </form>
        </Organisms.Box>
      </S.Container>
    </>
  )
}
