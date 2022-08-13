import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import formatDate from 'common/utils/formatDate'
import ArticlesService from 'services/Articles.service'

import {
  Container,
  ContentNotices,
  NewsTitle,
  NewsPreview,
  ContainerImage,
  DateNews,
  NewsContent,
} from './styles'

export function Article() {
  const [article, setArticle] = useState<any>([])
  const { id } = useParams<{ id: any }>()

  useEffect(() => {
    async function loadArticle() {
      const splitedId = id.split(':')[1]

      console.log(splitedId)

      const { data: OneArticle } = await ArticlesService.getById(
        splitedId
      ).then((response: any) => response)

      setArticle(OneArticle)
    }
    loadArticle()
  }, [id])

  return (
    <>
      <Container>
        <ContentNotices>
          <NewsTitle> {article.title}</NewsTitle>
          <NewsPreview>{article.preview}</NewsPreview>
          <div className="lineDate">
            <DateNews> Criado em {formatDate(article.updatedAt)}</DateNews>
          </div>
          <ContainerImage>
            <img src={article.url} alt="imagem da notícia"></img>
          </ContainerImage>
          <NewsContent>{article.content}</NewsContent>
        </ContentNotices>
      </Container>
    </>
  )
}
