import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { MOCK_MOVIES, GENRE_MAP } from "../../mockData";
import {
    Container,
    DemoBanner,
    SectionTitle,
    MovieList,
    MovieCard,
    ImageContainer,
    RatingBadgeCard,
    MovieInfo,
    DetailsBtn,
    LoaderContainer,
    EmptyState
} from "./style";

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [searchParams] = useSearchParams();

    // Read search params
    const genre = searchParams.get("genre") || "0";
    const search = searchParams.get("search") || "";

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUsingMock, setIsUsingMock] = useState(false);

    useEffect(() => {
        setLoading(true);
        const storedKey = localStorage.getItem("TMDB_API_KEY");
        const envKey = process.env.REACT_APP_KEY;
        const KEY = storedKey || envKey;

        // Fallback helper to use mock data
        const loadMockData = () => {
            let filtered = [...MOCK_MOVIES];
            
            if (search.trim()) {
                filtered = filtered.filter(
                    (m) =>
                        m.title.toLowerCase().includes(search.toLowerCase()) ||
                        m.overview.toLowerCase().includes(search.toLowerCase())
                );
            } else if (genre !== "0") {
                filtered = filtered.filter((m) =>
                    m.genre_ids.includes(parseInt(genre))
                );
            }
            
            setMovies(filtered);
            setIsUsingMock(true);
            setLoading(false);
        };

        if (!KEY) {
            // No API Key, use mock data immediately
            loadMockData();
            return;
        }

        // Determine URL based on parameters
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`;

        if (search.trim()) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${encodeURIComponent(search)}&language=pt-BR`;
        } else if (genre !== "0") {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genre}&language=pt-BR&sort_by=popularity.desc`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na resposta da API");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results && Array.isArray(data.results)) {
                    // Filter results without poster to keep quality high
                    const validMovies = data.results.filter(m => m.poster_path);
                    setMovies(validMovies);
                    setIsUsingMock(false);
                } else {
                    throw new Error("Formato de dados inválido");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.warn("Falha ao buscar filmes da API, usando mock:", err);
                loadMockData();
            });
    }, [genre, search]);

    // Active category label
    const categoryLabel = search
        ? `Resultados para "${search}"`
        : GENRE_MAP[genre] || "Filmes";

    // Select a featured movie for the Hero Banner
    // We only show Hero if there's no active search, and we are in "Populares" (genre "0")
    const showHero = genre === "0" && !search && movies.length > 0;
    const featuredMovie = showHero ? movies[0] : null;
    
    // Grid movies (exclude the featured one if Hero is shown to prevent duplication)
    const gridMovies = showHero ? movies.slice(1) : movies;

    // Trigger key modal opening by dispatching a click event or reload
    const openKeySettings = () => {
        // We can find the key button and click it to open the modal
        const keyBtn = document.querySelector('[title*="TMDB"]');
        if (keyBtn) {
            keyBtn.click();
        }
    };

    return (
        <div>
            <Navbar />
            
            <Container>
                {isUsingMock && (
                    <DemoBanner>
                        <p>
                            <strong>Modo de Demonstração Ativo:</strong> Você está visualizando dados locais offline. 
                            Para obter filmes reais e atualizados do The Movie Database (TMDB), configure sua Chave de API.
                        </p>
                        <button onClick={openKeySettings}>Configurar Chave</button>
                    </DemoBanner>
                )}

                {loading ? (
                    <LoaderContainer>
                        <div className="spinner" />
                        <p>Carregando catálogo cinematográfico...</p>
                    </LoaderContainer>
                ) : (
                    <>
                        {showHero && featuredMovie && (
                            <Hero movie={featuredMovie} />
                        )}

                        <SectionTitle>{categoryLabel}</SectionTitle>

                        {gridMovies.length === 0 ? (
                            <EmptyState>
                                <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                                <h3>Nenhum filme encontrado</h3>
                                <p>Tente alterar sua busca ou escolher outra categoria.</p>
                            </EmptyState>
                        ) : (
                            <MovieList>
                                {gridMovies.map((movie) => (
                                    <MovieCard key={movie.id}>
                                        <ImageContainer>
                                            <img
                                                src={movie.poster_path ? `${imagePath}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=Sem+Poster"}
                                                alt={movie.title}
                                                loading="lazy"
                                            />
                                            {movie.vote_average > 0 && (
                                                <RatingBadgeCard>
                                                    <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" stroke="currentColor">
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                    </svg>
                                                    {movie.vote_average.toFixed(1)}
                                                </RatingBadgeCard>
                                            )}
                                        </ImageContainer>
                                        <MovieInfo>
                                            <span className="title" title={movie.title}>{movie.title}</span>
                                            <Link to={`/${movie.id}`} style={{ width: "100%" }}>
                                                <DetailsBtn>Detalhes</DetailsBtn>
                                            </Link>
                                        </MovieInfo>
                                    </MovieCard>
                                ))}
                            </MovieList>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}

export default Home;
