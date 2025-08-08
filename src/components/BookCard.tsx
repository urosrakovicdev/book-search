import React from "react"
import { BookOpen, Calendar, Globe } from "lucide-react"
import type { Book } from "@/types"
import {
  extractbookId,
  getAccessBadgeColor,
  getAccessBadgeText,
  getAuthorNames,
  getCoverUrl,
} from "@/utils"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

interface BookCardProps {
  book: Book
  onBookClick: (book: Book) => void
}

export const BookCard: React.FC<BookCardProps> = ({ book, onBookClick }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (onBookClick) {
      onBookClick(book)
    }
    navigate(`/book/${extractbookId(book.key)}`)
  }
  return (
    <div className="bg-white rounded-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <img
          src={getCoverUrl(book.cover_i!, "L")}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {book.ebook_access && (
          <span
            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getAccessBadgeColor(
              book.ebook_access
            )}`}
          >
            {getAccessBadgeText(book.ebook_access)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-bold text-lg text-gray-900  ">{book.title}</h3>

        <p className="text-blue-700 font-medium ">{getAuthorNames(book)}</p>

        <div className="space-y-2">
          {book.first_publish_year && (
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              First published {book.first_publish_year}
            </div>
          )}

          {book.edition_count && (
            <div className="flex items-center text-gray-600 text-sm">
              <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
              {book.edition_count} editions
            </div>
          )}

          {book.language && book.language.length > 0 && (
            <div className="flex items-center text-gray-600 text-sm">
              <Globe className="w-4 h-4 mr-2 text-gray-400" />
              {book.language.length} languages
            </div>
          )}
        </div>

        <Button
          onClick={handleCardClick}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
        >
          View Details
        </Button>
      </div>
    </div>
  )
}
