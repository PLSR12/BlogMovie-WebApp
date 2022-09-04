import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'
import { Container } from './styles'
import UserConfig from './UserConfig'

export function Header() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const location = useLocation()

  useEffect(() => {
    setIsVisible(false)
  }, [location])

  return (
    <Container>
      <Breadcrumb />
      <UserConfig isVisible={isVisible} setIsVisible={setIsVisible} />
    </Container>
  )
}
