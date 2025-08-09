import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  ExternalLink,
  Loader2,
} from "lucide-react"
import {
  useGetAuthorDetailsQuery,
  useGetBookByIdQuery,
} from "@/store/api/booksApi"
import { getBio, getCoverUrl, getDescription } from "@/utils"

export const BookDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const { bookId } = useParams<{ bookId: string }>()

  const { data: bookDetails, isLoading: isBookLoading } = useGetBookByIdQuery(
    bookId || "",
    {
      skip: !bookId,
    }
  )

  const firstAuthorKey = bookDetails?.authors?.[0]?.author?.key
  const { data: authorData, isLoading: authorLoading } =
    useGetAuthorDetailsQuery(firstAuthorKey || "", {
      skip: !firstAuthorKey,
    })

  const isLoading = isBookLoading || authorLoading

  if (isLoading) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin  mb-4" />
          <p className="text-gray-600 text-lg">Loading book details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>
        </div>
      </div>
      {bookDetails && (
        <div className="px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl mb-8">
            <div className="flex flex-col lg:flex-row gap-8 p-8">
              <div className="flex-shrink-0">
                <img
                  src={getCoverUrl(bookDetails.covers[0], "L")}
                  alt={bookDetails.title}
                  className="w-full lg:w-64 h-96 object-cover rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {bookDetails.title}
                </h1>
                {authorData && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-xl text-blue-700 font-semibold">
                      {authorData.name}
                    </span>
                    {authorData.birth_date && (
                      <span className="text-gray-500">
                        {`(${authorData.birth_date} - ${
                          authorData.death_date ?? "Present"
                        })`}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center text-gray-600 gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">
                    First published:{" "}
                    {bookDetails.first_publish_date ?? "Unknown"}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Description
                  </h2>

                  <p className="text-gray-700 text-justify text-md">
                    {getDescription(bookDetails.description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {bookDetails.subjects ? (
                <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Subjects & Topics
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {bookDetails.subjects.slice(0, 20).map((subject, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Subjects & Topics
                  </h2>

                  <p className="text-gray-600">
                    No subjects and topics available available
                  </p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                External Links
              </h3>
              <div className="flex flex-col gap-2 text-start">
                {bookDetails.links ? (
                  bookDetails.links.map((link) => {
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {link.title + " ->"}
                      </a>
                    )
                  })
                ) : (
                  <p className="text-gray-600">No external links available</p>
                )}
              </div>
            </div>
            {authorData && (
              <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Author
                </h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-2xl">
                    {authorData.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {getBio(authorData.bio)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetailsPage
