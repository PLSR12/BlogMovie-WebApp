import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import formatDate from 'common/utils/formatDate'
import ArticlesService from 'services/Articles.service'
import { ToastService } from 'services/toast.service'

import * as S from './styles'

export function Article() {
  const [article, setArticle] = useState<any>([])
  const { id } = useParams<{ id: any }>()

  useEffect(() => {
    async function oneArticle() {
      try {
        const splitedId = id.split(':')[1]

        const OneArticle = await ArticlesService.getById(splitedId).then(
          (response: any) => response
        )

        setArticle(OneArticle)
      } catch (error) {
        ToastService.error('Erro ao buscar artigo, tente novamente mais tarde')
      }
    }
    oneArticle()
  }, [id])

  return (
    <>
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
