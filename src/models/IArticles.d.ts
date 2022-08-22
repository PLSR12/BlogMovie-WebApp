interface ArticlesAll {
  id: number
  title: string
  preview: string
  content: string
  category_id: number
  url: string
  category: ICategory[{}]
}

interface ArticlesInput {
  name: string
  title: string
  preview: string
  content: string
  category_id: number
  category: {
    id: any
    name: string
  }
  file: string
}

interface ICategory {
  id: string
  name: string
  url: string
  path: string
}

export { ArticlesAll, ArticlesInput }
