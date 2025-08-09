import EmptyState from "@/components/EmptyState"
import { Input } from "@/components/ui/input"
import { useSearchBooksQuery } from "@/store/api/booksApi"
import { useState, useCallback, useEffect } from "react"
import { debounce } from "lodash"
import { Search, Loader2, BookOpen, Clock } from "lucide-react"
import PaginationControls from "@/components/PaginationControls"
import { BookCard } from "@/components/BookCard"
import type { Book, ViewedBook } from "@/types"
import { extractbookId } from "@/utils"
import { useNavigate } from "react-router-dom"

const IPP = 20 // Items per page
const STORAGE_KEY = "previously-viewed-books"

const getPreviouslyViewedBooks = (): ViewedBook[] | [] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return []
  }
}

const addToViewedBooks = (book: ViewedBook): ViewedBook[] | [] => {
  try {
    const existingBooks: ViewedBook[] = getPreviouslyViewedBooks()
    const filteredBooks = existingBooks.filter((b) => b.bookId !== book.bookId)

    const updatedBooks = [book, ...filteredBooks]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks))
    return updatedBooks
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return []
  }
}

const HomePage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [previouslyViewed, setPreviouslyViewed] = useState<ViewedBook[] | []>(
    []
  )

  const { data, isFetching } = useSearchBooksQuery(
    {
      title: debouncedSearchTerm,
      page: currentPage,
      ipp: IPP,
    },
    {
      skip: !debouncedSearchTerm.trim(),
    }
  )

  useEffect(() => {
    setPreviouslyViewed(getPreviouslyViewedBooks())
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const debouncedSetSearch = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term)
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSetSearch(searchTerm)
    return () => {
      debouncedSetSearch.cancel()
    }
  }, [searchTerm, debouncedSetSearch])

  const handleRecommendedClick = (title: string) => {
    setSearchTerm(title)
    debouncedSetSearch.cancel()
    setDebouncedSearchTerm(title)
  }

  const handleBookClick = (book: Book) => {
    const bookData: ViewedBook = {
      bookId: extractbookId(book.key),
      title: book.title,
      author: book.author_name?.[0] || "Unknown Author",
      clickedAt: new Date().toISOString(),
    }

    const updatedBooks = addToViewedBooks(bookData)
    setPreviouslyViewed(updatedBooks)
  }

  const renderContent = () => {
    if (isFetching) {
      return (
        <div className="flex flex-col items-center justify-center mt-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">
            Searching for books...
          </p>
        </div>
      )
    }
    if (!debouncedSearchTerm) {
      return <EmptyState onRecommendedClick={handleRecommendedClick} />
    }

    return (
      <div className="w-full px-6 pb-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {data?.docs.map((book) => (
            <div key={book.key}>
              <BookCard book={book} onBookClick={handleBookClick} />
            </div>
          ))}
        </div>
        {data && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={data.totalPages || Math.ceil(data.numFound / IPP)}
            onPageChange={(page) => {
              setCurrentPage(page)
            }}
            isLoading={isFetching}
          />
        )}
      </div>
    )
  }
  return (
    <div className="bg-gray-100 h-full flex">
      <div className="flex-1">
        <div className="w-full bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-3">
                <div className="bg-blue-600 p-3 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-gray-900">
                    BookFinder
                  </h1>
                  <p className="text-gray-600">Discover your next great read</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search books by title..."
                className="w-full pl-8 pr-4 py-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {debouncedSearchTerm && data && (
          <div className="w-full px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {data.numFound} books found
                </h2>
              </div>
            </div>
          </div>
        )}
        {renderContent()}
      </div>

      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Previously Viewed
          </h3>
        </div>

        {previouslyViewed.length === 0 ? (
          <div className="flex flex-col items-center gap-1 py-8">
            <BookOpen className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">No books viewed yet</p>
            <p className="text-gray-400 text-xs mt-1">
              Click on any book to see it here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {previouslyViewed.map((book, index) => (
              <div
                key={`${book.bookId}-${index}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 hover:bg-blue-300 cursor-pointer"
                onClick={() => {
                  navigate(`/book/${book.bookId}`)
                }}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {book.title}
                  </h4>
                  <p className="text-gray-600 text-xs mt-1">{book.author}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(book.clickedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
