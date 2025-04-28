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
                if (this.matrix[y][x] === word[0]) {
                    for (const direction of directions) {
                        const path = [];
                        let found = true;

                        for (let i = 0; i < word.length; i++) {
                            const newX = x + i * direction.dx;
                            const newY = y + i * direction.dy;
                            
                            if (
                                newX < 0 || newX >= this.matrix[0].length ||
                                newY < 0 || newY >= this.matrix.length ||
                                this.matrix[newY][newX] !== word[i]
                            ) {
                                found = false;
                                break;
                            }
                            path.push({row: newY, col: newX});
                        }
                        // La palabra fue encontrada
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
        return {found: false, locations: []};
    }

}