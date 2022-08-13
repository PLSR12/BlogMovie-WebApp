import React from 'react'

import { Body, Container, ContainerPage } from './styles'

export default function Layout({ children }: { children: any }) {
  return (
    <Container>
      <ContainerPage>
        <Body>{children}</Body>
      </ContainerPage>
    </Container>
  )
}
