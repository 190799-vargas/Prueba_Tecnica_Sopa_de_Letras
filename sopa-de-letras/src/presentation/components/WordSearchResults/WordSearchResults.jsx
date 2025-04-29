// Pagina de resultados de la sopa de letras
import { useNavigate } from "react-router-dom";
import "./WordSearchResults.css";

export const WordSearchResults = ({ results, matrix, words, onRemoveWord, onBack, onEdit }) => {
    const navigate = useNavigate();

    if (!results || results.length === 0) return null; 

    // Renderizamos la matriz
    const renderMatrix = () => {
        if (!matrix || matrix.length === 0) return null;

        return (
            <div className="matrix-container">
                <h3>Sopa de Letras {matrix.length}x{matrix[0].length}</h3>
                <div className="matrix-grid">
                    {matrix.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} className="matrix-row">
                            {row.map((cell, colIndex) => {
                                const isHighlighted = results.some(result =>
                                    result.found && result.locations?.some(loc =>
                                        loc.path.some(pos => pos.row === rowIndex && pos.col === colIndex)
                                    )
                                );
                                return (
                                    <div
                                        key={`cell-${rowIndex}-${colIndex}`}
                                        className={`matrix-cell ${isHighlighted ? "highlighted" : ""}`}
                                    >
                                        {cell}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="results-container">
            <h2 className="results-title">Resultados de la búsqueda</h2>

            {/*Mostrar la matriz */}
            {renderMatrix()}

            {/*Lista de palabras*/}
            <div className="words-section">
                <h3>Palabras Buscadas:</h3>
                <ul className="word-list">
                    {words.map((word, index) => (
                        <li key={`word-${index}`} className="word-item">
                            <div className="word-content">
                                <span className={`word-text ${results[index]?.found ? "found" : "not-found"}`}>
                                    {word}
                                </span>
                                {results[index]?.found && (
                                    <span className="word-location">
                                        ({results[index].locations[0].direction},
                                        fila {results[index].locations[0].startRow + 1},
                                        columna {results[index].locations[0].startCol + 1})
                                    </span>
                                )}
                            </div>
                                <button
                                    className="remove-word-button"
                                    onClick={() => onRemoveWord(word)}
                                >
                                    x
                                </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/*Leyenda de colores */}
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-color found"></div>
                        <span>Palabra encontrada</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color not-found"></div>
                            <span>Palabra no encontrada</span>
                        </div>
                    </div>

                {/*Botónes */}
                <div className="results-buttons">
                    <button
                        className="back-button"
                        onClick={onBack}
                    >
                        Volver al formulario
                    </button>
                    <button
                        className="edit-button"
                        onClick={onEdit}
                    >
                        Editar búsqueda
                    </button>
                </div>
            </div>
    );
};