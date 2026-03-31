import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import HomeReview from "./HomeReview";

const HomeTrailCard = ({trail, reviews}) => {
    const { currentUser } = useSelector((state) => state.auth);
    const {currentFollowed} = useSelector((state) => state.follows);

    const characterLimit = 280;

    const filterReviews = () =>
        reviews.filter((review) =>
            trail.id.toString() === review.trailID &&
            (review.public
                || currentFollowed.includes(review.username)
                || (currentUser && (currentUser.username === review.username || currentUser.role === "admin")))
        );

    const filtered = filterReviews();
    if (!filtered.length) return null;

    const diffColor = {
        'black': '#3a3a3a',
        'double black': '#111',
        'blue': '#1a3a5c',
        'green': '#1c3a1c',
        'easy': '#1c3a1c',
    }[trail.difficulty?.toLowerCase()] || '#2a2a24';

    return (
        <div style={{
            background: '#161612',
            border: '1px solid #2a2a24',
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'border-color 0.25s, box-shadow 0.25s',
        }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#7a5106';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2a2a24';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Image + header row */}
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {trail.thumbnail && (
                    <div style={{ width: '220px', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={trail.thumbnail} alt={trail.name}
                             style={{ width: '100%', height: '100%', objectFit: 'cover',
                                      minHeight: '160px', display: 'block' }} />
                    </div>
                )}
                <div style={{ flex: 1, padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <Link to={'/details/' + trail.id} style={{ textDecoration: 'none' }}>
                            <h3 style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: '1.8rem',
                                letterSpacing: '0.06em',
                                color: '#f0ebe0',
                                lineHeight: 1,
                                marginBottom: '0.3rem',
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.target.style.color = '#c8860a'}
                                onMouseLeave={e => e.target.style.color = '#f0ebe0'}
                            >{trail.name}</h3>
                        </Link>
                        <p style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.78rem',
                            color: '#9e9b94',
                            letterSpacing: '0.06em',
                            margin: '0 0 1rem',
                        }}>{trail.city}, {trail.region}</p>
                        <p style={{
                            fontFamily: "'Lora', serif",
                            fontSize: '0.88rem',
                            color: '#9e9b94',
                            lineHeight: 1.65,
                            margin: 0,
                        }}>
                            {trail.description?.length < characterLimit
                                ? trail.description
                                : trail.description?.substring(0, characterLimit) + '…'}
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: diffColor,
                            color: '#9e9b94',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '2px',
                        }}>{trail.difficulty}</span>
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.75rem',
                            color: '#5a5852',
                        }}>{trail.length} mi</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ width: '60px', height: '3px', background: '#2a2a24', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: (trail.rating / 0.05) + '%', height: '100%', background: '#c8860a', borderRadius: '2px' }} />
                            </div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#5a5852' }}>
                                {trail.rating?.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            {filtered.length > 0 && (
                <div style={{ borderTop: '1px solid #2a2a24' }}>
                    <div style={{
                        padding: '0.5rem 1.5rem',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#5a5852',
                        background: '#0d0d0b',
                    }}>
                        {filtered.length} {filtered.length === 1 ? 'Review' : 'Reviews'}
                    </div>
                    {filtered.map((review) => (
                        <HomeReview key={review._id} review={review}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeTrailCard;
