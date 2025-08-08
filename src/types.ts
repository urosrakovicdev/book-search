export interface BookSearchResponse {
  numFound: number
  start: number
  numFoundExact: boolean
  num_found: number
  documentation_url: string
  q: string
  offset: null | number
  docs: Book[]
  currentPage?: number
  totalPages?: number
}

export interface Book {
  author_key?: string[]
  author_name?: string[]
  cover_edition_key?: string
  cover_i?: number
  ebook_access?: EbookAccess
  has_fulltext?: boolean
  public_scan_b?: boolean
  edition_count?: number
  first_publish_year?: number
  ia?: string[]
  ia_collection_s?: string
  lending_edition_s?: string
  lending_identifier_s?: string
  key: string
  language?: string[]
  title: string
  subtitle?: string
}

export type EbookAccess = "no_ebook" | "borrowable" | "printdisabled" | "public"

export interface BookDetails {
  key: string
  title: string
  description?: string | { type: string; value: string }
  covers: number[]
  authors?: Array<{
    author: {
      key: string
    }
    type?: {
      key: string
    }
  }>
  subjects: string[]
  subject_places?: string[]
  subject_times?: string[]
  first_publish_date?: string
  latest_revision?: number
  revision?: number
  created?: {
    type: string
    value: string
  }
  last_modified?: {
    type: string
    value: string
  }
  links?: BookDetailsLinks[]
}

interface BookDetailsLinks {
  title: string
  url: string
  type: {
    key: string
  }
}

export interface AuthorDetails {
  key: string
  name: string
  birth_date?: string
  death_date?: string
  bio?: string | { type: string; value: string }
  photos?: number[]
}

export interface ViewedBook {
  bookId: string
  title: string
  author: string
  clickedAt: string
}
