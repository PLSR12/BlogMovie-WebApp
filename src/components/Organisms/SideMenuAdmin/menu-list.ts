import paths from '../../../common/constants/paths'

import { IconDashboard } from '../../Atoms/Icons'

import FiberNewIcon from '@mui/icons-material/FiberNew'
import NewspaperIcon from '@mui/icons-material/Newspaper'

const logout = async () => {
  await localStorage.removeItem('blogmovie:userData')
}
export const navBar = {
  menu: [
    {
      icon: NewspaperIcon,
      pathname: 'admin-articles',
      label: 'Listar Artigos',
      link: paths.AdminArticles,
      action: () => {},
    },
    {
      icon: FiberNewIcon,
      pathname: 'new-article',
      label: 'Novo Artigo',
      link: paths.NewArticles,
      action: () => {},
    },
    {
      icon: IconDashboard,
      pathname: 'new-category',
      label: 'Nova Categoria',
      link: paths.NewCategories,
      action: () => {},
    },
  ],
}
