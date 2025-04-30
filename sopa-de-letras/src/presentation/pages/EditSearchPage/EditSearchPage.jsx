import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WordSearchService } from "../../../core/services/WordSearchService";
import "./EditSearchPage.css";

export const EditSearchPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Estado inicial seguro con valores por defecto
    const [formData, setFormData] = useState({
        size: '14',
        newWord: '',
        words: [],
        matrix: []
    });
    
    const [matrixInput, setMatrixInput] = useState('');
    const [errors, setErrors] = useState({
        newWord: '',
        words: '',
        matrix: ''
    });

    // Cargar datos iniciales con validación segura
    useEffect(() => {
        if (state) {
            const safeMatrix = Array.isArray(state.matrix) ? state.matrix : [];
            const safeWords = Array.isArray(state.words) ? state.words : [];
            
            setFormData({
                size: safeMatrix.length?.toString() || '14',
                words: safeWords,
                matrix: safeMatrix
            });
            
            // Convertir matriz a string con protección contra undefined/null
            const matrixString = safeMatrix
                .map(row => Array.isArray(row) ? row.join(',') : '')
                .join('\n') || '';
                
            setMatrixInput(matrixString);
        }
    }, [state]);

    // Validación en tiempo real para nueva palabra
    useEffect(() => {
        const word = (formData.newWord || '').trim().toUpperCase();
        
        if (!word) {
            setErrors(prev => ({ ...prev, newWord: '' }));
            return;
        }

        const validationRules = [
            {
                condition: !/^[A-ZÁÉÍÓÚÜÑ]+$/.test(word), 
                message: "Solo letras MAYÚSCULAS" 
            },
            {
                condition: word.length < 3,
                message: "Mínimo 3 letras"
            },
            { 
                condition: word.length > 15, 
                message: "Máximo 15 letras" 
            },
            { 
                condition: formData.words.includes(word), 
                message: "Palabra ya existe" 
            }
        ];

        const error = validationRules.find(rule => rule.condition)?.message || '';
        setErrors(prev => ({ ...prev, newWord: error }));
    }, [formData.newWord, formData.words]);

    // Validación en tiempo real para la matriz con protección completa
    useEffect(() => {
        if (typeof matrixInput !== 'string') {
            setMatrixInput('');
            return;
        }

        const trimmedInput = matrixInput.trim();
        
        if (!trimmedInput) {
            setErrors(prev => ({ ...prev, matrix: '' }));
            return;
        }

        const rows = trimmedInput.split('\n')
            .filter(row => row && typeof row === 'string' && row.trim());
            
        const size = parseInt(formData.size) || 14;
        let matrixError = '';

        // Validar estructura de la matriz
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.split(',')
                .map(cell => typeof cell === 'string' ? cell.trim() : '')
                .filter(Boolean);

            if (cells.length > size) {
                matrixError = `Fila ${i+1}: máximo ${size} columnas`;
                break;
            }

            for (let j = 0; j < cells.length; j++) {
                if (!/^[A-ZÁÉÍÓÚÜÑ]$/.test(cells[j])) {
                    matrixError = `Fila ${i+1}, Col ${j+1}: Solo MAYÚSCULAS (A-Z, Á-Ú, Ü, Ñ)`;
                    break;
                }
            }
            
            if (matrixError) break;
        }

        setErrors(prev => ({ ...prev, matrix: matrixError }));
    }, [matrixInput, formData.size]);

    // Manejar agregar palabra con validación
    const handleAddWord = () => {
        const word = (formData.newWord || '').trim().toUpperCase();
        
        if (!word || errors.newWord) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            words: [...prev.words, word],
            newWord: ''
        }));
    };

    // Manejar eliminar palabra
    const handleRemoveWord = (index) => {
        setFormData(prev => {
            const newWords = [...prev.words];
            newWords.splice(index, 1);
            return { ...prev, words: newWords };
        });
    };

    // Manejar cambio en matriz con protección
    const handleMatrixChange = (e) => {
        const value = e.target?.value || '';
        setMatrixInput(typeof value === 'string' ? value.toUpperCase() : '');
    };
    
    // Validación completa del formulario al enviar
    const validateForm = () => {
        const newErrors = {
            newWord: '',
            words: formData.words.length === 0 ? 'Ingrese al menos una palabra' : '',
            matrix: ''
        };

        // Validación robusta de la matriz
        const rows = (matrixInput || '')
            .split('\n')
            .filter(row => row && typeof row === 'string' && row.trim());
            
        if (rows.length === 0) {
            newErrors.matrix = 'Ingrese la matriz de caracteres';
        } else {
            const size = parseInt(formData.size) || 14;
            
            if (rows.length !== size) {
                newErrors.matrix = `Debe tener exactamente ${size} filas`;
            } else {
                for (let i = 0; i < rows.length; i++) {
                    const cells = rows[i]
                        .split(',')
                        .map(cell => typeof cell === 'string' ? cell.trim() : '')
                        .filter(Boolean);

                    if (cells.length !== size) {
                        newErrors.matrix = `Fila ${i + 1} debe tener ${size} columnas`;
                        break;
                    }

                    for (let j = 0; j < cells.length; j++) {
                        if (!/^[A-ZÁÉÍÓÚÜÑ]$/.test(cells[j])) {
                            newErrors.matrix = `Fila ${i + 1}, Col ${j + 1}: Solo MAYÚSCULAS (A-Z, Á-Ú, Ü, Ñ)`;
                            break;
                        }
                    }
                    
                    if (newErrors.matrix) break;
                }
            }
        }

        setErrors(newErrors);
        return !newErrors.words && !newErrors.matrix;
    };

    // Renderizar matriz con protección completa
    const renderMatrix = () => {
        if (!Array.isArray(formData.matrix)) {
            return null;
        }

        const service = new WordSearchService();
        const currentResults = service.execute(formData.matrix, formData.words);
        const highlightedCells = new Set();
        
        currentResults.forEach(result => {
            if (result?.found && Array.isArray(result.locations)) {
                result.locations.forEach(loc => {
                    if (Array.isArray(loc?.path)) {
                        loc.path.forEach(pos => {
                            if (typeof pos.row === 'number' && typeof pos.col === 'number') {
                                highlightedCells.add(`${pos.row},${pos.col}`);
                            }
                        });
                    }
                });
            }
        });

        return (
            <div className="matrix-preview">
                <h3>Vista Previa de la Matriz</h3>
                <div className="matrix-grid">
                    {formData.matrix.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} className="matrix-row">
                            {(Array.isArray(row) ? row : []).map((cell, colIndex) => (
                                <div
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    className={`matrix-cell ${
                                        highlightedCells.has(`${rowIndex},${colIndex}`) ? 'highlighted' : ''
                                    }`}
                                >
                                    {typeof cell === 'string' ? cell : ''}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Enviar formulario con validación final
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Procesamiento seguro de la matriz
        const matrix = (matrixInput || '')
            .split('\n')
            .filter(row => row && typeof row === 'string')
            .map(row => row
                .split(',')
                .map(cell => (cell || '').trim().toUpperCase())
                .filter(cell => /^[A-ZÁÉÍÓÚÜÑ]$/.test(cell))
            .filter(row => row.length > 0));

        const size = parseInt(formData.size) || 14;
        
        // Validación final del tamaño
        if (matrix.length !== size || matrix.some(row => row.length !== size)) {
            setErrors(prev => ({ ...prev, matrix: `La matriz debe ser exactamente ${size}x${size}` }));
            return;
        }

        // Ejecutar búsqueda y navegar
        const service = new WordSearchService();
        const results = service.execute(matrix, formData.words);
        
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
                            value={formData.newWord || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                newWord: typeof e.target.value === 'string' ? e.target.value : ''
                            })}
                            onKeyUp={(e) => e.key === 'Enter' && handleAddWord()}
                            placeholder="Nueva palabra (MAYÚSCULAS)"
                            className={`word-input ${errors.newWord ? 'error' : ''}`}
                            maxLength={15}
                        />
                        <button
                            type="button"
                            onClick={handleAddWord}
                            className="add-word-button"
                            disabled={!!errors.newWord || !formData.newWord?.trim()}
                        >
                            Agregar
                        </button>
                    </div>
                
                    {errors.newWord && (
                        <div className="error-message">{errors.newWord}</div>
                    )}
                    
                    {errors.words && (
                        <div className="error-message">{errors.words}</div>
                    )}
                
                    <div className="word-list">
                        {formData.words.map((word, index) => (
                            <div key={index} className="word-tag">
                                {typeof word === 'string' ? word : ''}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveWord(index)}
                                    className="remove-word-button"
                                    aria-label={`Eliminar palabra ${word}`}
                                >
                                    ×
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
                            onChange={(e) => setFormData({
                                ...formData, 
                                size: e.target.value
                            })}
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
                        rows={parseInt(formData.size) || 14}
                        placeholder={`Ingrese ${formData.size}x${formData.size} caracteres separados por comas`}
                        spellCheck="false"
                    />
                    
                    {errors.matrix && (
                        <div className="error-message">{errors.matrix}</div>
                    )}
                    
                    {renderMatrix()}
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={
                            formData.words.length === 0 || 
                            !!errors.matrix || 
                            !matrixInput.trim()
                        }
                    >
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