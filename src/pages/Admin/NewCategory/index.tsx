import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Atoms from 'components/Atoms'
import * as Organisms from 'components/Organisms'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { CategoriesInput } from 'models/ICategories'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import CategoryService from 'services/Categories.service'
import { ToastService } from 'services/toast.service'
import * as S from './styles'
import { NewCategorySchema } from './validations'

export default function NewCategories() {
  const [fileName, setFileName] = useState(null)
  const history = useHistory()
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoriesInput>({ resolver: yupResolver(NewCategorySchema) })

  const onSubmit = async (data: CategoriesInput) => {
    try {
      setModalLoadingIsOpen(true)

      const categoryFormData = new FormData()

      categoryFormData.append('name', data.name)
      categoryFormData.append('file', data.file[0])

      await CategoryService.insert(categoryFormData)
      ToastService.success('Categoria criada com sucesso')
      setModalLoadingIsOpen(false)

      setTimeout(() => {
        history.push('/admin-articles')
      }, 3000)
    } catch (error) {
      ToastService.error('Erro ao criar Categoria ,tente novamente mais tarde')
      setModalLoadingIsOpen(false)
    }
  }

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
              text="Nome:"
              register={register}
              htmlFor="name"
              error={errors.name}
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
            <S.ButtonStyle type="submit"> Criar Categoria </S.ButtonStyle>
          </form>
        </Organisms.Box>
      </S.Container>
    </>
  )
}
