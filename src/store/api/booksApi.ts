import type { AuthorDetails, BookDetails, BookSearchResponse } from "@/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface SearchBooksParams {
  title: string
  page?: number
  IPP: number
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://openlibrary.org/",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    searchBooks: builder.query<BookSearchResponse, SearchBooksParams>({
      query: ({ title, page = 1, IPP }) => {
        const offset = (page - 1) * IPP
        return `search.json?q=title:${encodeURIComponent(
          title
        )}+AND+cover_i:*&limit=${IPP}&offset=${offset}`
      },

      transformResponse: (
        response: BookSearchResponse,
        _meta,
        arg
      ): BookSearchResponse => {
        return {
          ...response,
          currentPage: arg.page || 1,
          totalPages: Math.ceil(response.numFound / arg.IPP),
        }
      },

      providesTags: ["Book"],
    }),

    getBookById: builder.query<BookDetails, string>({
      query: (bookId) => `works/${bookId}.json`,
    }),

    getAuthorDetails: builder.query<AuthorDetails, string>({
      query: (authorKey) => `${authorKey}.json`,
    }),
  }),
})

export const {
  useSearchBooksQuery,
  useGetBookByIdQuery,
  useGetAuthorDetailsQuery,
} = booksApi
