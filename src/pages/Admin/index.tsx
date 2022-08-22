import * as S from './styles'

import paths from '../../common/constants/paths'

import * as Organisms from '../../components/Organisms'

import EditArticle from './EditArticle'
import ListArticles from './ListArticles'
import NewArticles from './NewArticle'
import NewCategories from './NewCategory'

export function Admin({ match: { path } }: any) {
  return (
    <S.Container>
      <Organisms.SideMenuAdmin />
      <S.ContainerItems>
        {path === paths.AdminArticles && <ListArticles />}
        {path === paths.NewArticles && <NewArticles />}
        {path === paths.NewCategories && <NewCategories />}
        {path === paths.EditArticle && <EditArticle />}
      </S.ContainerItems>
    </S.Container>
  )
}
