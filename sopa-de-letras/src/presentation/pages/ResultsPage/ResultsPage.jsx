import { useLocation, useNavigate } from "react-router-dom";
import { WordSearchResults } from "../../components/WordSearchResults/WordSearchResults";
import "./ResultsPage.css";

export const ResultsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state?.results) {
        navigate('/');
        return null;
    }


    
    const handleEdit = () => {
        navigate('/edit', { state });
    };

    return (
        <div className="results-page">
            <WordSearchResults
                results={state.results}
                matrix={state.matrix}
                words={state.words}
                onBack={() => navigate('/')}
                onEdit={handleEdit}
            />
        </div>
    );
};