import { useContext, useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link, useHistory } from 'react-router-dom'

import 'react-pro-sidebar/dist/css/styles.css'
import { SideBarNavContext } from '../../../context/sideBarNavContext'
import { IconToogleSidebar, IconToogleSidebarActive } from '../../Atoms/Icons'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

import {
  ContainerSideNav,
  ContainerButtonToogle,
  ButtonToogleSidebar,
  HeaderSidebar,
} from './styles'

import { navBar } from './menu-list'

export function SideMenuAdmin() {
  const { isColapsed, setIsColapsed } = useContext(SideBarNavContext)
  const [navBarMenu, setNavBarMenu] = useState<any>({})
  const { pathname } = window.location
  const { push } = useHistory()

  useEffect(() => {
    setNavBarMenu(navBar)
  }, [])

  const logout = async () => {
    await localStorage.removeItem('blogmovie:userData')

    setTimeout(() => {
      push('/login')
    }, 1000)
  }

  return (
    <ContainerSideNav collapsed={isColapsed}>
      <ProSidebar collapsed={isColapsed} collapsedWidth={96}>
        <HeaderSidebar>
          <LibraryBooksIcon style={{ color: 'white', width: 30, height: 30 }} />
        </HeaderSidebar>
        <ContainerButtonToogle>
          <ButtonToogleSidebar onClick={() => setIsColapsed(!isColapsed)}>
            {isColapsed ? <IconToogleSidebar /> : <IconToogleSidebarActive />}
          </ButtonToogleSidebar>
        </ContainerButtonToogle>

        <Menu>
          {navBarMenu?.menu?.map((value: any, index: any) => (
            <MenuItem
              key={index}
              icon={<value.icon />}
              className={isColapsed ? 'displayColapsed' : ''}
              active={pathname.includes(value.pathname)}
            >
              <Link to={value.link}>{value.label}</Link>
            </MenuItem>
          ))}
        </Menu>
        <button onClick={() => logout()}> LOGOUT </button>
      </ProSidebar>
    </ContainerSideNav>
  )
}
