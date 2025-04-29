// Entidad Principal
export class WordSearch {
    constructor(matrix, words) {
        this.matrix = matrix;
        this.words = words;
        this.results = [];
    }

    // Método para verificar si una palabra está en la matriz
    search() {
        this.results = this.words.map(word => ({
            word,
            ...this.isWordInMatrix(word)
        }));
        return this.results;
    }
    // Método para verificar si una palabra está en la matriz
    isWordInMatrix(word) {
        const directions = [
            { name: 'Horizontal derecha', dx: 1, dy: 0 },
            { name: 'horizontal izquierda', dx: -1, dy: 0 },
            { name: 'vertical abajo', dx: 0, dy: 1 },
            { name: 'vertical arriba', dx: 0, dy: -1 },
            { name: 'diagonal inferior derecha', dx: 1, dy: 1 },
            { name: 'diagonal superior derecha', dx: 1, dy: -1 },
            { name: 'diagonal inferior izquierda', dx: -1, dy: 1 },
            { name: 'diagonal superior izquierda', dx: -1, dy: -1 }
        ];
        // Recorremos la matriz buscando la palabra
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {

                // Explora cada posicion de la matriz
                // Si la letra coincide con la primera letra de la palabra
                if (this.matrix[y][x] === word[0]) {

                    // Recorre cada dirección
                    // y verifica si la palabra se encuentra en esa dirección
                    for (const direction of directions) {
                        const path = [];
                        let found = true;

                        // Verifica si la palabra se encuentra en la dirección actual
                        // Recorre cada letra de la palabra
                        // y verifica si coincide con la letra de la matriz
                        // en la dirección actual
                        for (let i = 0; i < word.length; i++) {
                            const newX = x + i * direction.dx;
                            const newY = y + i * direction.dy;
                            
                            // Verifica si la posición está dentro de los límites de la matriz
                            // y si la letra coincide con la letra de la palabra
                            // Si no coincide, la palabra no se encuentra en esa dirección
                            // y se sale del bucle
                            if (
                                newX < 0 || newX >= this.matrix[0].length ||
                                newY < 0 || newY >= this.matrix.length ||
                                this.matrix[newY][newX] !== word[i]
                            ) {
                                // La palabra no se encuentra en esa dirección
                                // y se sale del bucle
                                // Se agrega la posición a la ruta
                                // y se marca como no encontrada
                                found = false;
                                break;
                            }
                            path.push({row: newY, col: newX});
                        }
                        // La palabra fue encontrada
                        // Se retorna la dirección, la posición inicial
                        // y la ruta de la palabra
                        // Se retorna un objeto con la propiedad found en true
                        if (found) {
                            return {
                                found: true,
                                locations: [{
                                    direction: direction.name,
                                    startRow: y,
                                    startCol: x,
                                    path: path
                                }]
                            };
                        }
                    }
                }
            }
        }
        // La palabra no fue encontrada
        // Se retorna un objeto con la propiedad found en false
        return {found: false, locations: []};
    }

}