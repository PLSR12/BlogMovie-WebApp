interface ArticlesAll {
  id: number
  name: string
  title: string
  preview: string
  content: string
  category_id: number
  url: string
  category: ICategory[{}]
}

interface ICategory {
  id: string
  name: string
  url: string
  path: string
}

export { ArticlesAll }
