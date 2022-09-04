import { ReactNode } from 'react'

import * as Molecules from 'components/Molecules'
import * as Organisms from 'components/Organisms'

import { Body, Container, ContainerPage } from './styles'

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <Container>
      <Organisms.SideMenuAdmin />
      <ContainerPage>
        <Molecules.Header />
        <Body>{children}</Body>
      </ContainerPage>
    </Container>
  )
}
