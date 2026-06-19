import styled from "styled-components";

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const DemoBanner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(225, 29, 72, 0.1) 100%);
    border: 1px solid rgba(245, 158, 11, 0.2);
    border-radius: 12px;
    padding: 0.75rem 1.25rem;
    margin-bottom: 2rem;
    font-size: 0.85rem;
    color: #f59e0b;

    p {
        margin: 0;
        line-height: 1.5;
        font-weight: 500;
    }

    button {
        background: rgba(245, 158, 11, 0.2);
        border: 1px solid rgba(245, 158, 11, 0.3);
        color: #f59e0b;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;

        &:hover {
            background: rgba(245, 158, 11, 0.3);
        }
    }

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        button {
            width: 100%;
            text-align: center;
        }
    }
`;

export const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 800;
    margin: 2rem 0 1.5rem 0;
    color: #f8fafc;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
    }
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
    padding: 0;
    margin: 0;
`;

export const MovieCard = styled.li`
    background: rgba(30, 41, 59, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 16px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-8px);
        background: rgba(30, 41, 59, 0.5);
        border-color: rgba(245, 158, 11, 0.25);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.05);

        img {
            transform: scale(1.04);
        }

        .rating-badge {
            transform: scale(1.05);
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
        }
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1rem;
    background: #020617;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }
`;

export const RatingBadgeCard = styled.div.attrs({ className: 'rating-badge' })`
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(11, 15, 25, 0.85);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(245, 158, 11, 0.4);
    color: #f59e0b;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 2px;
    z-index: 5;
    transition: all 0.3s ease;
`;

export const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    gap: 1rem;

    span.title {
        font-weight: 700;
        font-size: 1rem;
        color: #f8fafc;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 2.8rem;
    }
`;

export const DetailsBtn = styled.button`
    width: 100%;
    padding: 0.65rem 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.03);
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #f59e0b;
        color: #0f172a;
        border-color: #f59e0b;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
    }
`;

export const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 0;
    gap: 1rem;
    color: #94a3b8;

    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(245, 158, 11, 0.15);
        border-top-color: #f59e0b;
        border-radius: 50%;
        animation: spin 1s infinite linear;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    color: #94a3b8;

    svg {
        margin-bottom: 1rem;
        color: #475569;
    }

    h3 {
        color: #f8fafc;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.9rem;
    }
`;
