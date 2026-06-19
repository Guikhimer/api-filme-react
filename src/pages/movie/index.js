import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { MOCK_MOVIES, GENRE_MAP } from "../../mockData";
import "./styles.css";
import { LoaderContainer, Container, EmptyState } from "../home/style";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const backdropPath = "https://image.tmdb.org/t/p/original";

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        const storedKey = localStorage.getItem("TMDB_API_KEY");
        const envKey = process.env.REACT_APP_KEY;
        const KEY = storedKey || envKey;

        // Fallback to load movie from mock list
        const loadMockMovie = () => {
            const parsedId = parseInt(id);
            const found = MOCK_MOVIES.find((m) => m.id === parsedId);
            if (found) {
                // Map genre ids to names for display compatibility
                const mappedGenres = found.genre_ids.map(gid => ({
                    id: gid,
                    name: GENRE_MAP[gid] || "Outro"
                }));
                
                setMovie({
                    ...found,
                    genres: mappedGenres,
                    runtime: 120 // mock value since it's not in standard search lists
                });
            } else {
                setError(true);
            }
            setLoading(false);
        };

        if (!KEY) {
            loadMockMovie();
            return;
        }

        // Fetch details from specific TMDB detail endpoint
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar detalhes");
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.title) {
                    setMovie(data);
                } else {
                    throw new Error("Filme não encontrado");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.warn("Falha ao carregar detalhes via API. Usando mock:", err);
                loadMockMovie();
            });
    }, [id]);

    return (
        <div>
            <Navbar />

            {loading ? (
                <LoaderContainer style={{ minHeight: "60vh" }}>
                    <div className="spinner" />
                    <p>Carregando informações do filme...</p>
                </LoaderContainer>
            ) : error || !movie ? (
                <Container>
                    <EmptyState style={{ minHeight: "60vh" }}>
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <h3>Filme não encontrado</h3>
                        <p>O filme solicitado não existe em nosso catálogo ou ocorreu um problema de rede.</p>
                        <Link to="/" style={{ display: "inline-block", marginTop: "1.5rem" }}>
                            <button className="btn-back-home">Voltar para a Home</button>
                        </Link>
                    </EmptyState>
                </Container>
            ) : (
                <div className="movie-detail-wrapper">
                    {movie.backdrop_path && (
                        <div 
                            className="movie-detail-bg" 
                            style={{ backgroundImage: `url(${backdropPath}${movie.backdrop_path})` }}
                        />
                    )}
                    
                    <div className="movie-detail-container">
                        <div className="movie-poster-side">
                            <img
                                src={movie.poster_path ? `${imagePath}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=Sem+Poster"}
                                alt={movie.title}
                            />
                        </div>

                        <div className="movie-info-side">
                            <h1>{movie.title}</h1>
                            {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}

                            <div className="movie-metadata">
                                {movie.vote_average > 0 && (
                                    <div className="meta-item rating">
                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        {movie.vote_average.toFixed(1)}
                                    </div>
                                )}
                                
                                {movie.release_date && (
                                    <div className="meta-item">
                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        {new Date(movie.release_date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                )}

                                {movie.runtime > 0 && (
                                    <div className="meta-item">
                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        {movie.runtime} min
                                    </div>
                                )}
                            </div>

                            {movie.genres && movie.genres.length > 0 && (
                                <div className="movie-genres-list">
                                    {movie.genres.map((g) => (
                                        <span key={g.id} className="genre-tag">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {movie.overview && (
                                <div className="movie-description-section">
                                    <h3>Sinopse</h3>
                                    <p>{movie.overview}</p>
                                </div>
                            )}

                            <Link to="/">
                                <button className="btn-back-home">
                                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                    Voltar
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie;
