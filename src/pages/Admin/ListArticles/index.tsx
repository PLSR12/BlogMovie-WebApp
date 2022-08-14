import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import tableIcons from 'common/styles/MaterialTableIcons'
import Edit from '@material-ui/icons/Edit'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { ArticlesAll } from 'models/IArticles'
import ArticlesService from 'services/Articles.service'

import { ContainerTable } from './styles'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Modal from 'components/Organisms/Modal'

const MaterialTable = require('material-table').default

export default function ListArticles() {
  const [articles, setArticles] = useState<ArticlesAll[]>([])
  const [articleSelected, setArticleSelected] = useState<number>()
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)
  const [modalConfirmDeleteIsOpen, setModalConfirmDeleteIsOpen] =
    useState<boolean>(false)
  const { push } = useHistory()

  const titleModalDelete = 'Excluir Artigo'

  const textModalDelete = '\nDeseja realmente excluir esse Artigo? '

  useEffect(() => {
    async function loadArticle() {
      const { data: allArticles } = await ArticlesService.getAll().then(
        (response: any) => response
      )

      setArticles(allArticles)
      setModalLoadingIsOpen(false)
    }
    loadArticle()
  }, [])

  function handleModalConfirmDelete(event: any, rowData: any) {
    const { id } = rowData

    setArticleSelected(id)

    setModalConfirmDeleteIsOpen(true)
  }

  const handleModalConfirmDeleteYes = async () => {
    const id = articleSelected

    ArticlesService.del(id)

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
      <ContainerTable>
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
      </ContainerTable>
    </>
  )
}
