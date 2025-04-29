import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WordSearchService } from "../../../core/services/WordSearchService";
import "./EditSearchPage.css";

export const EditSearchPage = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    // Estado para almacenar los datos del formulario
    // y los errores de validación
    const [formData, setFormData] = useState({
        size: '14',
        newWord: '',
        words: [],
        matrix: []
        
    });
    const [matrixInput, setMatrixInput] = useState('');
    const [errors, setErrors] = useState({});

    // Cargar datos iniciales
    useEffect(() => {
        // Cargar datos del estado
        // Si no hay estado, redirigir a la página de resultados
        if (state) {
            setFormData({
                size: state.matrix?.length.toString() || '14',
                words: state.words || [],
                matrix: state.matrix || []
            });
            setMatrixInput(
                state.matrix?.map(row => row.join(',')).join('\n') || ''
            );
        }
    }, [state]);

    // Manejar agregar palabra
    const handleAddWord = () => {
        const word = formData.newWord.trim().toUpperCase();
        if (!word) return;

        if (!/^[A-ZÁÉÍÓÚÜÑ]+$/.test(word)) {
            setErrors({...errors, words: "Solo letras MAYÚSCULAS"});
            return;
        }
        if (word.length < 3 || word.length > 15) {
            setErrors({
                ...errors,
                words: "La palabra debe tener entre 3 y 15 letras.",
            });
            return;
        }
        if (word.length >= 15){
            setErrors({
                ...errors,
                words: "La palabra no puede tener más de 15 letras.",
            });
            return;
        }
        if (formData.words.includes(word)) {
            setErrors({ ...errors, words: "La palabra ya fue agregada." });
            return;
        }
        setFormData({
            ...formData,
            words: [...formData.words, word],
            newWord: ''
        });
        setErrors({...errors, words: ''});
    };

    // Manejar eliminar palabra
    const handleRemoveWord = (index) => {
        const newWords = [...formData.words];
        newWords.splice(index, 1);
        setFormData({...formData, words: newWords});
    };

    // Manejar cambio en matriz
    const handleMatrixChange = (e) => {
        setMatrixInput(e.target.value.toUpperCase());
        setErrors({...errors, matrix: ''});
    };
    
    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

    // Validar palabras
    if (formData.words.length === 0) {
        newErrors.words = 'Ingrese al menos una palabra';
    }
    
    // Validar matriz
    const rows = matrixInput.split('\n').filter(row => row.trim());
    if (rows.length === 0) {
        newErrors.matrix = 'Ingrese la matriz de caracteres';
    } else {
        const size = parseInt(formData.size);
        if (rows.length !== size) {
            newErrors.matrix = `Debe tener exactamente ${size} filas`;
        }
        
        rows.forEach((row, i) => {
            const cells = row.split(',').map(cell => cell.trim());
            if (cells.length !== size) {
                newErrors.matrix = `Fila ${i + 1} debe tener ${size} columnas`;
            }
        
            cells.forEach((cell, j) => {
                if (!/^[A-ZÁÉÍÓÚÜÑ]$/.test(cell)) {
                    newErrors.matrix = `Fila ${i + 1}, Columna ${j + 1}: Solo letras MAYÚSCULAS`;
                }
            });
        });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    // Renderizar matriz con palabras resaltadas
    const renderMatrix = () => {
        if (!formData.matrix || formData.matrix.length === 0) return null;

    // Obtener ubicaciones de palabras encontradas
    const service = new WordSearchService();
    const currentResults = service.execute(formData.matrix, formData.words);
    const highlightedCells = new Set();
    
    currentResults.forEach(result => {
        if (result.found) {
            result.locations.forEach(loc => {
                loc.path.forEach(pos => {
                    highlightedCells.add(`${pos.row},${pos.col}`);
                });
            });
        }
    });

    return (
        <div className="matrix-preview">
            <h3>Vista Previa de la Matriz</h3>
            <div className="matrix-grid">
            {formData.matrix.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="matrix-row">
                {row.map((cell, colIndex) => (
                    <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`matrix-cell ${
                        highlightedCells.has(`${rowIndex},${colIndex}`) ? 'highlighted' : ''
                    }`}
                    >
                    {cell}
                    </div>
                ))}
                </div>
            ))}
            </div>
        </div>
        );
    };

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Procesar matriz
        const matrix = matrixInput
        .split('\n')
        .map(row => row.split(',').map(cell => cell.trim().toUpperCase()));

        // Ejecutar búsqueda
        const service = new WordSearchService();
        const results = service.execute(matrix, formData.words);
        
        // Actualizar estado y navegar
        setFormData({...formData, matrix});
        navigate('/results', {
        state: {
            results,
            matrix,
            words: formData.words
        }
        });
    };

    return (
        <div className="edit-search-page">
            <h1>Editar Búsqueda</h1>
        
            <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-section">
                    <h2>Palabras a Buscar</h2>
                
                    <div className="word-input-group">
                        <input
                            type="text"
                            value={formData.newWord}
                            onChange={(e) => setFormData({
                                ...formData,
                                newWord: e.target.value.toUpperCase()
                            })}
                            onKeyUp={(e) => e.key === 'Enter' && handleAddWord()}
                            placeholder="Nueva palabra (MAYÚSCULAS)"
                            className="word-input"
                        />
                        <button
                            type="button"
                            onClick={handleAddWord}
                            className="add-word-button"
                        >
                            Agregar
                        </button>
                    </div>
                
                    {errors.words && <div className="error-message">{errors.words}</div>}
                
                    <div className="word-list">
                        {formData.words.map((word, index) => (
                        <div key={index} className="word-tag">
                            {word}
                            <button
                                type="button"
                                onClick={() => handleRemoveWord(index)}
                                className="remove-word-button"
                                >
                                    x
                            </button>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h2>Matriz de Búsqueda</h2>
                    
                    <div className="form-group">
                        <label>Tamaño de la matriz:</label>
                        <select
                            value={formData.size}
                            onChange={(e) => setFormData({...formData, size: e.target.value})}
                            className="size-selector"
                            >
                            <option value="14">14×14</option>
                            <option value="16">16×16</option>
                        </select>
                    </div>
                    
                    <textarea
                        value={matrixInput}
                        onChange={handleMatrixChange}
                        className={`matrix-textarea ${errors.matrix ? 'error' : ''}`}
                        rows={parseInt(formData.size)}
                        placeholder={`Ejemplo para ${formData.size}x${formData.size}:\nA,B,C,...\nD,E,F,...`}
                    />
                    {errors.matrix && <div className="error-message">{errors.matrix}</div>}
                    
                    {renderMatrix()}
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        Actualizar Búsqueda
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate('/results', { state })}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};