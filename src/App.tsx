import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BookDetailPage from "./pages/BookDetailPage"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookId" element={<BookDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
