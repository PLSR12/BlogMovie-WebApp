import { IconLogout, IconProfile } from 'components/Atoms/Icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  BodyProfile,
  Container,
  FooterProfile,
  HeaderProfile,
  NavProfileOpitions,
  ProfileContainer,
  ThumbUserLogged,
} from './styles'

interface UserConfigProps {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

function UserConfig({ isVisible, setIsVisible }: UserConfigProps) {
  const thumbProfileRef = useRef<HTMLButtonElement>(null)
  const menuProfileRef = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const [userData, setUserData] = useState<any>({})

  const keyPress = useCallback(
    (e: { key: string }) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false)
      }
    },
    [setIsVisible, isVisible]
  )

  const showMenuProfile: any = (e: any) => {
    if (
      thumbProfileRef.current &&
      !thumbProfileRef.current.contains(e.target)
    ) {
      setIsVisible(false)
    }
  }
  const getInitials: any = (name: string) => {
    if (!name) {
      return ''
    }
    const parts = name.split(' ')
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : `${name[0]}${name[1]}`.toUpperCase()
  }
  const changeVisibility = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    document.addEventListener('click', showMenuProfile, true)

    return () => {
      document.removeEventListener('keydown', keyPress)
      document.removeEventListener('click', showMenuProfile, true)
    }
  }, [keyPress])

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('blogmovie:userData')

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }
    loadUserData()
  }, [])

  const logout = async () => {
    await localStorage.removeItem('blogmovie:userData')

    setTimeout(() => {
      history.push('/login')
    }, 1000)
  }

  return (
    <Container>
      <ThumbUserLogged onClick={() => changeVisibility()} ref={thumbProfileRef}>
        <p>{getInitials}</p>
      </ThumbUserLogged>

      <NavProfileOpitions
        isVisible={isVisible}
        ref={menuProfileRef}
        onClick={() => setIsVisible(true)}
      >
        <ProfileContainer>
          <HeaderProfile>
            <h4>{userData?.name}</h4>
            <p>{userData?.email}</p>
          </HeaderProfile>

          <BodyProfile>
            <button type="button">
              <IconProfile /> <p>Perfil</p>
            </button>
          </BodyProfile>
          <FooterProfile>
            <button
              type="button"
              className="btnLogout"
              onClick={() => logout()}
            >
              <IconLogout /> <p>Sair</p>
            </button>
          </FooterProfile>
        </ProfileContainer>
      </NavProfileOpitions>
    </Container>
  )
}

export default UserConfig
