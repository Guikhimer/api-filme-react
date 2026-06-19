import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeroContainer = styled.div`
    position: relative;
    height: 70vh;
    min-height: 450px;
    max-height: 650px;
    width: 100%;
    display: flex;
    align-items: center;
    background-image: ${props => `url(https://image.tmdb.org/t/p/original${props.backdrop})`};
    background-size: cover;
    background-position: center 20%;
    margin-bottom: 2rem;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

    /* Left and bottom dark overlay for text readability */
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(11, 15, 25, 0.95) 30%, rgba(11, 15, 25, 0.6) 65%, rgba(11, 15, 25, 0) 100%),
                    linear-gradient(to top, #0b0f19 0%, rgba(11, 15, 25, 0) 30%);
        z-index: 1;
    }

    @media (max-width: 768px) {
        height: 55vh;
        border-radius: 0;
        &::before {
            background: linear-gradient(to top, #0b0f19 70%, rgba(11, 15, 25, 0.3) 100%);
        }
    }
`;

export const HeroContent = styled.div`
    position: relative;
    z-index: 2;
    max-width: 600px;
    padding: 3rem;
    color: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
        justify-content: flex-end;
        height: 100%;
    }
`;

export const RatingBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.3);
    padding: 0.3rem 0.7rem;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.8rem;
    width: fit-content;
`;

export const HeroTitle = styled.h2`
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1px;
    margin: 0;
    background: linear-gradient(to right, #ffffff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const HeroOverview = styled.p`
    font-size: 0.95rem;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 768px) {
        font-size: 0.85rem;
        -webkit-line-clamp: 3;
    }
`;

export const HeroButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #f59e0b;
    color: #0f172a;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.8rem 1.8rem;
    border-radius: 12px;
    width: fit-content;
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
    transition: all 0.25s ease;

    &:hover {
        background: #d97706;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45);
    }
`;

function Hero({ movie }) {
    if (!movie) return null;

    return (
        <HeroContainer backdrop={movie.backdrop_path}>
            <HeroContent>
                <RatingBadge>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    {movie.vote_average.toFixed(1)} Classificação
                </RatingBadge>
                <HeroTitle>{movie.title}</HeroTitle>
                <HeroOverview>{movie.overview}</HeroOverview>
                <HeroButton to={`/${movie.id}`}>
                    Ver detalhes
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </HeroButton>
            </HeroContent>
        </HeroContainer>
    );
}

export default Hero;
