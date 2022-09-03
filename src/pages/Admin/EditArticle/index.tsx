import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'
import { ArticlesInput } from 'models/IArticles'
import { CategoriesAll } from 'models/ICategories'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import ReactSelect from 'react-select'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { ArticlesService } from 'services/Articles.service'
import CategoryService from 'services/Categories.service'
import { ToastService } from 'services/toast.service'
import * as S from './styles'
import { EditArticleSchema } from './validations'

export default function EditArticle() {
  const [fileName, setFileName] = useState(null)
  const [article, setArticle] = useState<any>()
  const [categories, setCategories] = useState<CategoriesAll[]>()
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
      articleFormData.append('category_id', values.category.id)
      articleFormData.append('file', values.file[0])

      await ArticlesService.update(articleFormData) // chamo meu service de put passando o dado q desejo enviar a API

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

  // verficiar se o default de imagem funcionou
  useEffect(() => {
    setValue('title', article?.title)
    setValue('preview', article?.preview)
    setValue('content', article?.content)
    setValue('file', article?.url)

    setFileName(article?.path)
  }, [article])

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
                      defaultValue={article?.category}
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
