import React from "react";
import {useSelector} from "react-redux";

function DetailsTrail({trail}) {
    const {currentUser} = useSelector((state) => state.auth);

    if (!trail) return null;

    return (
        <div>
            {/* Hero image */}
            <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
                <img src={trail.thumbnail} alt={trail.name}
                     style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 30%, rgba(13,13,11,0.95) 100%)',
                }} />
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '2rem 2rem 1.75rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}>
                    <h1 style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        letterSpacing: '0.05em',
                        color: '#f0ebe0',
                        lineHeight: 0.95,
                        marginBottom: '0.4rem',
                    }}>{trail.name}</h1>
                    <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.85rem',
                        color: '#9e9b94',
                        letterSpacing: '0.06em',
                        margin: 0,
                    }}>{trail.city}, {trail.region}</p>
                </div>
            </div>

            {/* Trail stats */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                borderBottom: '1px solid #2a2a24',
            }}>
                {/* Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {[0,1,2,3,4].map((num) => {
                        const rating = trail.rating;
                        if (rating > num + 0.5) return <i key={num} className="bi bi-star-fill" />;
                        if (rating > num) return <i key={num} className="bi bi-star-half" />;
                        return <i key={num} className="bi bi-star" style={{ color: '#3a3a32' }} />;
                    })}
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.78rem',
                        color: '#9e9b94',
                        marginLeft: '0.4rem',
                    }}>{trail.rating?.toFixed(1)}</span>
                </div>

                <div style={{ width: '1px', height: '20px', background: '#2a2a24' }} />

                <div>
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#5a5852',
                        display: 'block',
                        marginBottom: '0.15rem',
                    }}>Difficulty</span>
                    <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '1.1rem',
                        letterSpacing: '0.06em',
                        color: '#f0ebe0',
                    }}>{trail.difficulty}</span>
                </div>

                <div style={{ width: '1px', height: '20px', background: '#2a2a24' }} />

                <div>
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#5a5852',
                        display: 'block',
                        marginBottom: '0.15rem',
                    }}>Length</span>
                    <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '1.1rem',
                        letterSpacing: '0.06em',
                        color: '#f0ebe0',
                    }}>{trail.length} mi</span>
                </div>
            </div>

            {/* Description */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '1.75rem 2rem' }}>
                <p style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: '#9e9b94',
                    margin: 0,
                }}>{trail.description}</p>
            </div>
        </div>
    );
}

export default DetailsTrail;
