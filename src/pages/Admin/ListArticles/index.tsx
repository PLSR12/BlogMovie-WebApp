import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Edit from '@material-ui/icons/Edit'
import tableIcons from 'common/styles/MaterialTableIcons'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { ArticlesAll } from 'models/IArticles'
import ArticlesService from 'services/Articles.service'
import { ToastService } from 'services/toast.service'

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Modal from 'components/Organisms/Modal'
import * as S from './styles'

const MaterialTable = require('material-table').default

export default function ListArticles() {
  const [articles, setArticles] = useState<ArticlesAll[]>([])
  const [articleSelected, setArticleSelected] = useState<number>()
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)
  const [modalConfirmDeleteIsOpen, setModalConfirmDeleteIsOpen] = useState<
    boolean
  >(false)
  const { push } = useHistory()

  const titleModalDelete = 'Excluir Artigo'

  const textModalDelete = '\nDeseja realmente excluir esse Artigo? '

  useEffect(() => {
    async function loadArticle() {
      /*
      Nesse caso eu encapsulo dentro de um (try,catch) pois minha chamada a API pode dar erro e eu preciso estar preparado para isso, 
      se cair no catch chamo meu toast service de error e exibo ao usuário  */
      try {
        const allArticles = await ArticlesService.getAll().then(
          (response: any) => response
        ) // chamo meu service de get

        setArticles(allArticles) // seto no state esse dado recebido da API
        setModalLoadingIsOpen(false)
      } catch (error) {
        ToastService.error('Erro ao listar Artigos,tente novamente mais tarde') // chamo meu toast service de erro em caso de falha na requisição
      }
    }
    loadArticle()
  }, [])

  function handleModalConfirmDelete(event: any, rowData: any) {
    const { id } = rowData

    setArticleSelected(id)

    setModalConfirmDeleteIsOpen(true)
  }

  const handleModalConfirmDeleteYes = async () => {
    const id = articleSelected // o id do dado que desejo apagar

    ArticlesService.del(id) // chamo meu service de delete, passando o id do dado que desejo apagar

    setTimeout(() => {
      setModalConfirmDeleteIsOpen(false)
      window.location.reload()
    }, 2000)
  }

  function editArticle(event: any, rowData: any) {
    const { id } = rowData

    push(`/edit-article/:${id}`)
  }

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'TÍTULO',
      field: 'title',
    },
    {
      title: 'PREVIEW',
      field: 'preview',
    },
    {
      title: 'CATEGORIA',
      field: 'category.name',
    },
  ]
  return (
    <>
      <GenericModal isOpen={modalLoadingIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
        </ModalContentLoading>
      </GenericModal>
      <Modal
        isOpen={modalConfirmDeleteIsOpen}
        onRequestClose={() => setModalConfirmDeleteIsOpen(false)}
        ariaHideApp
        title={titleModalDelete}
        text={textModalDelete}
        handleNo={() => setModalConfirmDeleteIsOpen(false)}
        textNo="Não"
        handleYes={handleModalConfirmDeleteYes}
        textYes="Sim, excluir"
      />
      <S.ContainerTable>
        <MaterialTable
          data={articles}
          loading={false}
          columns={columns}
          title={'Artigos'}
          onRowClick={editArticle}
          icons={tableIcons}
          actions={[
            {
              icon: Edit,
              tooltip: 'Editar',
              onClick: { editArticle },
            },
            {
              icon: DeleteOutline,
              tooltip: 'Deletar',
              onClick: handleModalConfirmDelete,
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            showTextRowsSelected: false,
            columnsButton: false,
            pageSize: 10,
            draggable: false,
            debounceInterval: 200,
            showFirstLastPageButtons: false,

            headerStyle: {
              borderBottom: '1px solid #F4F6F8',
              color: '#BDB59D',
              fontSize: '12px',
              fontWeight: 500,
            },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: 'Nenhum registro para exibir',
            },
            header: {
              actions: '',
            },
            toolbar: {
              nRowsSelected: '{0} linha(s) selecionada(s)',
              searchPlaceholder: 'Buscar',
              searchTooltip: 'Buscar',
              exportTitle: 'Exportar',
              exportCSVName: 'Exportar como CSV',
              showColumnsTitle: 'Exibir colunas',
              showColumnsAriaLabel: 'Adicionar ou remover colunas',
              addRemoveColumns: 'Adicionar ou remover colunas',
              exportAriaLabel: 'Exportar',
            },
            pagination: {
              labelRowsSelect: '',
              labelDisplayedRows: '{from}-{to} de {count}',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Próxima página',
            },
          }}
        />
      </S.ContainerTable>
    </>
  )
}
