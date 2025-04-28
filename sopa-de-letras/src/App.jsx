import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Footer from "./presentation/components/Footer/Footer"
import { Navbar } from "./presentation/components/Navbar/Navbar"
import { AboutPage } from "./presentation/pages/AboutPage/AboutPage"
import { EditSearchPage } from "./presentation/pages/EditSearchPage/EditSearchPage"
import { HomePage } from "./presentation/pages/HomePage/HomePage"
import { ResultsPage } from "./presentation/pages/ResultsPage/ResultsPage"
import "./presentation/styles/global.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/edit" element={<EditSearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );

}
export default App
