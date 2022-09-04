import * as S from './styles'

import paths from '../../common/constants/paths'

import EditArticle from './EditArticle'
import ListArticles from './ListArticles'
import NewArticles from './NewArticle'
import NewCategories from './NewCategory'

export function Admin({ match: { path } }: any) {
  return (
    <S.Container>
      <S.ContainerItems>
        {path === paths.AdminArticles && <ListArticles />}
        {path === paths.NewArticles && <NewArticles />}
        {path === paths.NewCategories && <NewCategories />}
        {path === paths.EditArticle && <EditArticle />}
      </S.ContainerItems>
    </S.Container>
  )
}
