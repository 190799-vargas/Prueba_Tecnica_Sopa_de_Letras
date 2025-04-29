// Formulario para ingresar palabras y tamaño de la matriz
import { useState } from "react";
import "./WordSearchForm.css";

export const WordSearchForm = ({ onSubmit }) => {
    const [words, setWords] = useState("");
    const [matrix, setMatrix] = useState("");
    const [matrixSize, setMatrixSize] = useState("16");
    const [wordList, setWordList] = useState([]);
    const [errors, setErrors] = useState({
        words: '',
        matrix: '',
        general: ''
    });

    const validateWord = (word) => {
        if (!word.trim()) return "La lista de palabras no puede estar vacía.";
        if (/[a-z]/.test(word)) return "Solo se permiten letras MAYUSCULAS";
        if(!/^[A-Z]+$/.test(word)) return "Solo letras de A-Z sin espacios ni caracteres especiales";
        if(word.length < 3) return "La palabra debe tener al menos 3 letras";
        if(word.length > 15) return "La palabra no puede tener más de 15 letras";
        if(wordList.includes(word)) return "La palabra ya fue agregada";
        if(!/^[A-ZÁÉÍÓÚÜÑ]+$/.test(word)) return "No se permiten caracteres especiales";
        
        return "";
    };

    const validateMatrix = (matrix) => {
        const rows = matrix.split("\n").filter(row => row.trim());

        if (rows.length === 0) return "La matriz no puede estar vacía.";

        const size = parseInt(matrixSize);
        if (rows.length !== size) {
            return `La matriz debe tener exactamente ${size} filas`;
        }

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].split(',').map(cell => cell.trim());
            
            if (cells.length !== size) {
                return `Fila ${i + 1}: debe tener ${size} columnas`;
            }

            for (let j = 0; j < cells.length; j++) {
                if (cells[j].length !== 1) {
                    return `Fila ${i + 1}, Columna ${j + 1}: debe ser un solo carácter`;
                }
                if (!/^[A-Z]$/.test(cells[j])) {
                    return `Fila ${i + 1}, Columna ${j + 1}: solo letras MAYÚSCULAS (A-Z)`;
                }
            }
        }

        return '';
    };

    // Metodo para agregar una palabra a la lista
    const handleAddWord = () => {
        const validationError = validateWord(words);
        if (validationError) {
            setErrors({ ...errors, words: validationError });
            return;
        }

        setWordList([...wordList, words.trim()]);
        setWords("");
        setErrors({ ...errors, words: '' });
    };
    
    // Metodo para eliminar una palabra de la lista
    const handleRemoveWord = (index) => {
        const newWordList = [...wordList];
        newWordList.splice(index, 1);
        setWordList(newWordList);
    };

    // Metodo para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (wordList.length === 0) {
            setErrors({ ...errors, words: "La lista de palabras no puede estar vacía." });
            return;
        }

        // Convertir la matriz de texto a un array
        const matrixError = validateMatrix(matrix);
        if (matrixError) {
            setErrors({ ...errors, matrix: matrixError, general: '' });
            return;
        }

        // Verificar si hay errores en la matriz
        const matrixArray = matrix.split("\n")
            .filter(row => row.trim())
            .map(row => row.split(",").map(cell => cell.trim().toUpperCase()));

        // Verificar si la matriz tiene el tamaño correcto
        onSubmit(matrixArray, wordList);
        setErrors({ words: '', matrix: '', general: '' });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {errors.general && (
                    <div className="error-message general-error">
                        {errors.general}
                    </div>
                )}
                <div className="form-group">
                    <label>Tamaño de la matríz:</label>
                    <select
                        value={matrixSize}
                        onChange={(e) => setMatrixSize(e.target.value)}
                        className="form-select"
                    >
                        <option value="14">14x14</option>
                        <option value="16">16x16</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Palabras a buscar (MAYÚSCULAS):</label>
                    <div className="word-input-container">
                        <input
                            type="text"
                            value={words}
                            onChange={(e) => {
                                setWords(e.target.value.toUpperCase());
                                setErrors({ ...errors, words: '' });
                            }}
                            placeholder="Ingrese palabra en MAYÚSCULAS"
                            className={`form-input ${errors.words ? 'input-error': ''}`}
                        />
                        <button
                            type="button"
                            onClick={handleAddWord}
                            className="form-button"
                        >
                            Agregar
                        </button>
                    </div>
                    {errors.words && (
                        <div className="error-message">
                            {errors.words}
                        </div>
                    )}
                    {wordList.length > 0 && (
                        <ul className="word-list">
                            {wordList.map((word, index) => (
                                <li key={index} className="word-list-item">
                                    {word}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveWord(index)}
                                        className="word-remove-button"
                                    >
                                        x
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="form-group">
                    <label>Matriz de caracteres (MAYÚSCULAS, separar filas con Enter y columnas por comas):</label>
                    <textarea
                        value={matrix}
                        onChange={(e) => {
                            setMatrix(e.target.value.toUpperCase());
                            setErrors({ ...errors, matrix: '' });
                        }}
                        placeholder={
                            `Ejemplo para 14x14:\nA,B,C,D,E,F,G,H,I,J,K,L,M,N\nA,B,C,D,E,F,G,H,I,J,K,L,M,N\n` +
                            `\nEjemplo para 16x16:\nA,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P\nA,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P
                            `
                            
                        }
                        rows={matrixSize}
                        className={`form-textarea ${errors.matrix ? 'input-error' : ''}`}
                    />
                    {errors.matrix && (
                        <div className="error-message">
                            {errors.matrix}
                        </div>
                    )}
                </div>

                <button type="submit" className="form-submit-button">
                    Buscar Palabras
                </button>
            </form>
        </div>
    );
};