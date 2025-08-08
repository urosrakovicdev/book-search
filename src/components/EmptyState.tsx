import { Badge } from "./ui/badge"

const recommendedBooks = [
  { id: 0, title: "The Hunger Games" },
  { id: 1, title: "Pride and Prejudice" },
  { id: 2, title: "The Great Gatsby" },
  { id: 3, title: "Harry Potter" },
  { id: 4, title: "The Lord of the Rings" },
]

interface EmptyStateProps {
  onRecommendedClick?: (title: string) => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRecommendedClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Welcome to your book search!
      </h3>

      <p className="text-gray-500 max-w-md mb-6">
        Ready to discover something great? Simply type a book title above to get
        started on your literary journey.
      </p>

      <div className="space-y-3">
        <p className="text-sm text-gray-400 font-medium">
          Popular searches to get you started:
        </p>
        <div className="flex flex-wrap gap-2 justify-center max-w-md">
          {recommendedBooks.map((book) => {
            return (
              <Badge
                key={book.id}
                variant="outline"
                className="text-gray-500 cursor-pointer hover:bg-gray-100 px-3 py-1 text-sm"
                onClick={() => onRecommendedClick?.(book.title)}
              >
                {book.title}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EmptyState
