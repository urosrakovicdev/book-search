import type { Book, EbookAccess } from "./types"

export const getCoverUrl = (coverId: number, size: "S" | "M" | "L"): string => {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

export const getAuthorNames = (book: Book): string => {
  if (!book.author_name || book.author_name.length === 0)
    return "Unknown Author"
  return book.author_name.join(", ")
}

export const getAccessBadgeColor = (access?: string): string => {
  switch (access) {
    case "public":
      return "text-green-700 bg-green-100"
    case "borrowable":
      return "text-blue-700 bg-blue-100"
    case "no_ebook":
      return "text-gray-700 bg-gray-200"
    case "printdisabled":
      return "text-purple-700 bg-purple-100"
    default:
      return "text-gray-700 bg-gray-200"
  }
}

export const getAccessBadgeText = (access?: EbookAccess): string => {
  switch (access) {
    case "no_ebook":
      return "No eBook"
    case "borrowable":
      return "Borrow"
    case "printdisabled":
      return "Accessible Only"
    case "public":
      return "Free"
    default:
      return "No ebook"
  }
}

export function extractbookId(key: string): string {
  return key.split("/works/")[1] || ""
}

export const getDescription = (
  description?: string | { type: string; value: string }
): string => {
  if (!description) return "No description available for this book."
  if (typeof description === "string") return description
  return description.value
}

export const getBio = (
  bio?: string | { type: string; value: string }
): string => {
  if (!bio) return ""
  if (typeof bio === "string") return bio
  return bio.value || ""
}
