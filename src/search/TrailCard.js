import React from "react";
import {Link} from "react-router-dom";

const TrailCard = ({trail}) => {
    const characterLimit = 160;

    const diffColor = {
        'black': '#111',
        'double black': '#0a0a0a',
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
            display: 'flex',
            flexDirection: 'column',
            transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#7a5106';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2a2a24';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Image */}
            <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img src={trail.thumbnail} alt={trail.name}
                     style={{ width: '100%', height: '100%', objectFit: 'cover',
                              transition: 'transform 0.4s' }}
                     onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                     onMouseLeave={e => e.target.style.transform='scale(1)'}
                />
                <span style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: diffColor,
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#9e9b94',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '2px',
                }}>{trail.difficulty}</span>
            </div>

            {/* Body */}
            <div style={{ padding: '1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <Link to={'/details/' + trail.id} style={{ textDecoration: 'none' }}>
                    <h3 style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '1.4rem',
                        letterSpacing: '0.05em',
                        color: '#f0ebe0',
                        lineHeight: 1.05,
                        transition: 'color 0.2s',
                    }}
                        onMouseEnter={e => e.target.style.color='#c8860a'}
                        onMouseLeave={e => e.target.style.color='#f0ebe0'}
                    >{trail.name}</h3>
                </Link>

                <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.75rem',
                    color: '#5a5852',
                    letterSpacing: '0.04em',
                    margin: 0,
                }}>{trail.city}, {trail.region}</p>

                <p style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '0.84rem',
                    color: '#9e9b94',
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                }}>
                    {trail.description?.length < characterLimit
                        ? trail.description
                        : trail.description?.substring(0, characterLimit) + '…'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              paddingTop: '0.75rem', borderTop: '1px solid #1e1e19' }}>
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.72rem',
                        color: '#5a5852',
                        letterSpacing: '0.04em',
                    }}>{trail.length} miles</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '50px', height: '3px', background: '#2a2a24', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: (trail.rating / 0.05) + '%', height: '100%', background: '#c8860a', borderRadius: '2px' }} />
                        </div>
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.7rem',
                            color: '#9e9b94',
                        }}>{trail.rating?.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailCard;
