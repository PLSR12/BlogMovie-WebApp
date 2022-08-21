import {
  ContainerCard,
  ContainerImage,
  ContainerText,
  NewsTitle,
  NewsPreview,
} from './styles'
import { useHistory } from 'react-router-dom'

export function CardArticle({ article }: any) {
  const { push } = useHistory()

  function getArticle() {
    const id = article.id

    push(`/article/:${id}`)
  }

  return (
    <ContainerCard onClick={getArticle}>
      <ContainerImage>
        <img src={article.url} alt="imagem da notícia"></img>
      </ContainerImage>
      <ContainerText>
        <NewsTitle> {article.title}</NewsTitle>
        <hr className="line"></hr>
        <NewsPreview>{article.preview}</NewsPreview>
      </ContainerText>
    </ContainerCard>
  )
}
