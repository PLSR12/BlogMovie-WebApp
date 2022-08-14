import paths from '../../../common/constants/paths'

import { IconDashboard } from '../../Atoms/Icons'

import NewspaperIcon from '@mui/icons-material/Newspaper'
import FiberNewIcon from '@mui/icons-material/FiberNew'

export const navBar = {
  menu: [
    {
      icon: NewspaperIcon,
      pathname: 'admin-articles',
      label: 'Listar Notícias',
      link: paths.AdminArticles,
    },
    {
      icon: FiberNewIcon,
      pathname: 'new-article',
      label: 'Nova Notícia',
      link: paths.NewArticles,
    },
    {
      icon: IconDashboard,
      pathname: 'new-category',
      label: 'Nova Categoria',
      link: paths.NewCategory,
    },
  ],
}
