import React, { useState, useEffect } from 'react'

import * as S from './styles'

import * as Templates from 'components/Templates'

import { CategoriesAll } from 'models/ICategories'
import { ArticlesAll } from 'models/IArticles'

import CategoryService from 'services/Categories.service'
import ArticlesService from 'services/Articles.service'

export function Home({ state }: any) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }
  const [articles, setArticles] = useState<ArticlesAll[]>([])
  const [categories, setCategories] = useState<CategoriesAll[]>()
  const [filteredArticles, setFilteredArticles] = useState<ArticlesAll[]>([])
  const [activeCategories, setActiveCategorie] = useState<number>(categoryId)

  useEffect(() => {
    async function loadCategory() {
      const { data: allCategories } = await CategoryService.getAll().then(
        (response: any) => response
      )

      const newCategory = [{ id: 0, name: 'Todas' }, ...allCategories]

      setCategories(newCategory)
    }

    async function loadArticle() {
      const { data: allArticles } = await ArticlesService.getAll().then(
        (response: any) => response
      )

      setArticles(allArticles)
    }
    loadCategory()
    loadArticle()
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
    <S.Container>
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
        {filteredArticles &&
          filteredArticles.map((article: { id: number }) => (
            <Templates.CardArticle key={article.id} article={article} />
          ))}
      </S.ArticlesContainer>
    </S.Container>
  )
}
