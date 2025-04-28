// Página principal
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WordSearchService } from "../../../core/services/WordSearchService";
import { WordSearchForm } from "../../components/WordSearchForm/WordSearchForm";
import { WordSearchResults } from "../../components/WordSearchResults/WordSearchResults";
import "./HomePage.css";

export const HomePage = () => {
    const navigate = useNavigate();
    const [matrix, setMatrix] = useState([]);
    const [wordList, setWordList] = useState([]);

    // Metodo para manejar el submit del formulario
    const handleSubmit = (matrixArray, words) => {
        const service = new WordSearchService();
        const searchResults = service.execute(matrixArray, words);

        // Navegar a la pagina resultados
        navigate('/results', {
            state: {
                results: searchResults,
                matrix: matrixArray,
                words: words
            }
        });
    };

    return (
        <div className="home-page">
            <h1 className="page-title">Resolvedor de Sopa de Letras</h1>
            <WordSearchForm onSubmit={handleSubmit}/>
        </div>
    );
};