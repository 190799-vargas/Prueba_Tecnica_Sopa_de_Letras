// Caso de uso, que se encarga de la lógica de negocio.
import { WordSearch } from "../domain/WordSearch";

export class WordSearchService {
    execute(matrix, words) {
        const wordSearch = new WordSearch(matrix, words);
        return wordSearch.search();
    }
}