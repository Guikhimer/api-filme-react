import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { GENRE_MAP } from "../mockData";

export const NavbarContainer = styled.nav`
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: rgba(11, 15, 25, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.3s ease;

    @media (max-width: 900px) {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }
`;

export const Logo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #f59e0b 0%, #e11d48 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.03);
    }
`;

export const CategoriesList = styled.ul`
    display: flex;
    list-style: none;
    gap: 0.5rem;
    margin: 0;
    padding: 0;

    @media (max-width: 900px) {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        justify-content: flex-start;
        
        /* Hide scrollbars */
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const CategoryItem = styled.li`
    button {
        background: ${props => props.active ? "rgba(245, 158, 11, 0.15)" : "transparent"};
        color: ${props => props.active ? "#f59e0b" : "#94a3b8"};
        border: 1px solid ${props => props.active ? "rgba(245, 158, 11, 0.3)" : "transparent"};
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        font-weight: 600;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;

        &:hover {
            color: #f59e0b;
            background: rgba(245, 158, 11, 0.08);
            border-color: rgba(245, 158, 11, 0.15);
        }
    }
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 900px) {
        width: 100%;
        justify-content: space-between;
    }
`;

export const SearchForm = styled.form`
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9999px;
    padding: 0.35rem 1rem 0.35rem 2.5rem;
    transition: all 0.25s ease;

    &:focus-within {
        background: rgba(255, 255, 255, 0.07);
        border-color: rgba(245, 158, 11, 0.5);
        box-shadow: 0 0 15px rgba(245, 158, 11, 0.15);
    }

    svg {
        position: absolute;
        left: 0.9rem;
        color: #64748b;
        width: 1rem;
        height: 1rem;
    }

    input {
        background: transparent;
        border: none;
        outline: none;
        color: #f8fafc;
        font-size: 0.85rem;
        width: 160px;
        font-family: inherit;
        transition: width 0.25s ease;

        &::placeholder {
            color: #64748b;
        }

        &:focus {
            width: 200px;
        }

        @media (max-width: 600px) {
            width: 120px;
            &:focus {
                width: 140px;
            }
        }
    }
`;

export const KeyButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background: ${props => props.hasKey ? "rgba(34, 197, 94, 0.1)" : "rgba(245, 158, 11, 0.1)"};
    border: 1px solid ${props => props.hasKey ? "rgba(34, 197, 94, 0.25)" : "rgba(245, 158, 11, 0.25)"};
    color: ${props => props.hasKey ? "#22c55e" : "#f59e0b"};
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 12px ${props => props.hasKey ? "rgba(34, 197, 94, 0.2)" : "rgba(245, 158, 11, 0.2)"};
    }

    &::after {
        content: "";
        position: absolute;
        top: 2px;
        right: 2px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${props => props.hasKey ? "#22c55e" : "#f59e0b"};
        box-shadow: 0 0 6px ${props => props.hasKey ? "#22c55e" : "#f59e0b"};
    }
`;

/* Modal Styles */
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(2, 6, 23, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1.5rem;
`;

export const ModalContent = styled.div`
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    position: relative;
    animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes modalIn {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    h3 {
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
        color: #f8fafc;
    }

    p {
        font-size: 0.9rem;
        color: #94a3b8;
        line-height: 1.5;
        margin-bottom: 1.5rem;
    }

    input {
        width: 100%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 0.8rem 1rem;
        color: white;
        font-size: 0.95rem;
        margin-bottom: 1.5rem;
        outline: none;
        transition: all 0.2s ease;

        &:focus {
            border-color: #f59e0b;
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);
        }
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;

        button {
            padding: 0.6rem 1.2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .cancel {
            background: transparent;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.08);
            &:hover {
                background: rgba(255, 255, 255, 0.03);
            }
        }

        .save {
            background: #f59e0b;
            color: #0f172a;
            border: none;
            &:hover {
                background: #d97706;
                transform: translateY(-1px);
            }
        }

        .clear {
            background: rgba(239, 68, 68, 0.15);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.3);
            margin-right: auto;
            &:hover {
                background: rgba(239, 68, 68, 0.25);
            }
        }
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
        color: #f8fafc;
        background: rgba(255, 255, 255, 0.04);
    }
`;

function Navbar() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Parse current search params
    const currentGenre = searchParams.get("genre") || "0";
    const currentSearch = searchParams.get("search") || "";
    
    const [searchInput, setSearchInput] = useState(currentSearch);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiKeyInput, setApiKeyInput] = useState("");
    const [hasKey, setHasKey] = useState(false);

    // Check if key exists on mount
    useEffect(() => {
        const storedKey = localStorage.getItem("TMDB_API_KEY");
        const envKey = process.env.REACT_APP_KEY;
        const activeKey = storedKey || envKey;
        setHasKey(!!activeKey);
        if (storedKey) {
            setApiKeyInput(storedKey);
        }
    }, [isModalOpen]);

    // Update input when query params change (e.g. back navigation)
    useEffect(() => {
        setSearchInput(currentSearch);
    }, [currentSearch]);

    const handleGenreChange = (genreId) => {
        // Clear search input local state
        setSearchInput("");
        // Reset query params to target genre
        setSearchParams({ genre: genreId });
        // Make sure we are on home page
        navigate(`/?genre=${genreId}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchParams({ genre: "0", search: searchInput });
            navigate(`/?search=${encodeURIComponent(searchInput)}`);
        } else {
            setSearchParams({ genre: "0" });
            navigate("/");
        }
    };

    const handleSaveKey = () => {
        if (apiKeyInput.trim()) {
            localStorage.setItem("TMDB_API_KEY", apiKeyInput.trim());
        } else {
            localStorage.removeItem("TMDB_API_KEY");
        }
        setIsModalOpen(false);
        // Force refresh to reload app state with new key
        window.location.reload();
    };

    const handleClearKey = () => {
        localStorage.removeItem("TMDB_API_KEY");
        setApiKeyInput("");
        setIsModalOpen(false);
        window.location.reload();
    };

    return (
        <>
            <NavbarContainer>
                <Logo to="/" onClick={() => handleGenreChange("0")}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                        <line x1="7" y1="2" x2="7" y2="22"></line>
                        <line x1="17" y1="2" x2="17" y2="22"></line>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <line x1="2" y1="7" x2="7" y2="7"></line>
                        <line x1="2" y1="17" x2="7" y2="17"></line>
                        <line x1="17" y1="17" x2="22" y2="17"></line>
                        <line x1="17" y1="7" x2="22" y2="7"></line>
                    </svg>
                    CineReact
                </Logo>

                <CategoriesList>
                    {Object.entries(GENRE_MAP).map(([id, label]) => (
                        <CategoryItem key={id} active={currentGenre === id && !currentSearch}>
                            <button onClick={() => handleGenreChange(id)}>
                                {label}
                            </button>
                        </CategoryItem>
                    ))}
                </CategoriesList>

                <ActionsContainer>
                    <SearchForm onSubmit={handleSearchSubmit}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar filmes..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </SearchForm>

                    <KeyButton 
                        hasKey={hasKey} 
                        onClick={() => setIsModalOpen(true)}
                        title={hasKey ? "Chave TMDB conectada" : "Chave TMDB ausente (dados mock)"}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                        </svg>
                    </KeyButton>
                </ActionsContainer>
            </NavbarContainer>

            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setIsModalOpen(false)}>
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </CloseButton>

                        <h3>Chave API do TMDB</h3>
                        <p>
                            Para carregar filmes atualizados do The Movie Database (TMDB), insira sua chave abaixo. Caso contrário, o site utilizará uma seleção de filmes em cache local.
                        </p>

                        <input
                            type="password"
                            placeholder="Insira sua API Key (ex: abc123xyz...)"
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                        />

                        <div className="buttons">
                            {localStorage.getItem("TMDB_API_KEY") && (
                                <button className="clear" onClick={handleClearKey}>
                                    Excluir
                                </button>
                            )}
                            <button className="cancel" onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </button>
                            <button className="save" onClick={handleSaveKey}>
                                Salvar Chave
                            </button>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}

export default Navbar;
