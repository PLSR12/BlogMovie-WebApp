import { useEffect, useState } from 'react'

import * as S from './styles'

import * as Molecules from 'components/Molecules'

import GenericModal from 'components/Organisms/Modal/GenericModal'
import { ModalContentLoading } from 'components/Organisms/Modal/style'

import { ArticlesAll } from 'models/IArticles'
import { CategoriesAll } from 'models/ICategories'

import ArticlesService from 'services/Articles.service'
import CategoryService from 'services/Categories.service'
import { ToastService } from 'services/toast.service'

export function Home({ state }: any) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }
  const [articles, setArticles] = useState<ArticlesAll[]>([])
  const [categories, setCategories] = useState<CategoriesAll[]>()
  const [filteredArticles, setFilteredArticles] = useState<ArticlesAll[]>([])
  const [activeCategories, setActiveCategorie] = useState<number>(categoryId)
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState<boolean>(true)

  useEffect(() => {
    async function loadCategory() {
      try {
        const allCategories = await CategoryService.getAll().then(
          (response: any) => response
        )

        const newCategory = [{ id: 0, name: 'Todas' }, ...allCategories]

        setCategories(newCategory)
        setModalLoadingIsOpen(false)
      } catch (error) {
        ToastService.error(
          'Erro ao buscar as Categorias,tente novamente mais tarde'
        )
      }
    }

    async function loadArticle() {
      try {
        const allArticles = await ArticlesService.getAll().then(
          (response: any) => response
        )

        setArticles(allArticles)
        setModalLoadingIsOpen(false)
      } catch (error) {
        ToastService.error(
          'Erro ao buscar os Artigos,tente novamente mais tarde'
        )
      }
    }
    loadArticle()
    loadCategory()
  }, [])

  useEffect(() => {
    if (activeCategories === 0) {
      setFilteredArticles(articles)
    } else {
      const newFilteredArticles = articles.filter(
        (article: { category_id: number }) =>
          article.category_id === activeCategories
      )

      setFilteredArticles(newFilteredArticles)
    }
  }, [activeCategories, articles])

  return (
    <>
      <GenericModal isOpen={modalLoadingIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
        </ModalContentLoading>
      </GenericModal>
      <S.Container>
        <Molecules.HeaderComponent />

        <S.CategoriesMenu>
          {categories &&
            categories.map((category: { id: any; name: string }) => (
              <S.CategoryButton
                type="button"
                key={category.id}
                isActiveBrand={activeCategories === category.id}
                onClick={() => {
                  setActiveCategorie(category.id)
                }}
              >
                {category.name}
              </S.CategoryButton>
            ))}
        </S.CategoriesMenu>

        <S.ArticlesContainer>
          {Object.keys(filteredArticles).length <= 0 && (
            <p className="nothing-notice"> SEM ARTIGOS NESSA CATEGORIA </p>
          )}
          {filteredArticles &&
            filteredArticles.map((article: { id: number }) => (
              <Molecules.CardArticle key={article.id} article={article} />
            ))}
        </S.ArticlesContainer>
      </S.Container>
    </>
  )
}
