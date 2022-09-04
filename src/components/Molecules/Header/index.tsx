import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { FiMenu } from 'react-icons/fi'

import * as S from './styles'

export function HeaderComponent() {
  const [showNav, setShowNav] = useState(false)

  return (
    <>
      <S.MainContainer>
        <S.ContainerLeft>
          <Link to="/">
            <h1>BlogMovie</h1>
          </Link>
          <S.Nav>
            <NavLink
              to="/"
              activeStyle={{
                paddingBottom: '6px',
                borderBottom: '2px solid var(--color-primary-first-darker)',
              }}
            >
              Artigos
            </NavLink>
          </S.Nav>
        </S.ContainerLeft>

        <S.ContainerRight></S.ContainerRight>

        <S.MenuHamburguer>
          <FiMenu onClick={() => setShowNav(!showNav)} />
          {showNav && (
            <nav
              className={`navHamburguer ${showNav ? 'navTrue' : 'navFalse'}`}
            >
              <li>
                <Link to="/" onClick={() => setShowNav(false)}>
                  Artigos
                </Link>
              </li>
            </nav>
          )}
        </S.MenuHamburguer>
      </S.MainContainer>
    </>
  )
}
