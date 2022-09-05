interface CategoriesAll {
  id: string
  name: string
  url: string
}

interface CategoriesOptions {
  id: numebr
  name: string
}

interface CategoriesInput {
  name: string
  file: string
}

export { CategoriesAll, CategoriesInput, CategoriesOptions }
