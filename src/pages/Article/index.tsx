import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import formatDate from 'common/utils/formatDate'
import ArticlesService from 'services/Articles.service'
import { ToastService } from 'services/toast.service'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import * as S from './styles'

export function Article() {
  const [article, setArticle] = useState<any>([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)

  const { id } = useParams<{ id: any }>()

  useEffect(() => {
    async function oneArticle() {
      try {
        const splitedId = id.split(':')[1]

        const OneArticle = await ArticlesService.getById(splitedId).then(
          (response: any) => response
        )

        setArticle(OneArticle)
        setModalLoadingIsOpen(false)
      } catch (error) {
        ToastService.error('Erro ao buscar artigo, tente novamente mais tarde')
      }
    }
    oneArticle()
  }, [id])

  return (
    <>
      <GenericModal isOpen={modalLoadingIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
        </ModalContentLoading>
      </GenericModal>
      <S.Container>
        <S.ContentNotices>
          <S.NewsTitle> {article.title}</S.NewsTitle>
          <S.NewsPreview>{article.preview}</S.NewsPreview>
          <div className="lineDate">
            <S.DateNews> Criado em {formatDate(article.updatedAt)}</S.DateNews>
          </div>
          <S.ContainerImage>
            <img src={article.url} alt="imagem da notícia"></img>
          </S.ContainerImage>
          <S.NewsContent>{article.content}</S.NewsContent>
        </S.ContentNotices>
      </S.Container>
    </>
  )
}
