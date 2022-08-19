import * as S from './styles'

import paths from '../../common/constants/paths'

import * as Organisms from '../../components/Organisms'

import ListArticles from './ListArticles'
import NewArticles from './NewArticle'

export function Admin({ match: { path } }: any) {
  return (
    <S.Container>
      <Organisms.SideMenuAdmin />
      <S.ContainerItems>
        {path === paths.AdminArticles && <ListArticles />}
        {path === paths.NewArticles && <NewArticles />}
      </S.ContainerItems>
    </S.Container>
  )
}
