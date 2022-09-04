import { MdChevronRight } from 'react-icons/md'
import { ContainerBread } from './styles'

function currentPage(param: string) {
  switch (param) {
    case '/admin-articles':
      return ['Listagem dos Artigos']
    case '/new-article':
      return ['Criar Artigo']
    case '/edit-article/':
      return ['Editar Artigo']
    case '/new-category':
      return ['Criar Categoria']
  }
}

export function Breadcrumb() {
  const { pathname } = window.location
  const currentPathname = pathname.split(':')[0]

  return (
    <ContainerBread>
      <p>Você está aqui</p>
      <MdChevronRight />

      {[currentPage(currentPathname)].map((item: any) => {
        return item.map((i: string) => {
          return (
            <div key={i} className="item">
              <p className="currentPage">{i}</p>
              <MdChevronRight className="chevron" />
            </div>
          )
        })
      })}
    </ContainerBread>
  )
}
