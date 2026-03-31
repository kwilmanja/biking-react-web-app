import React, {useRef} from 'react';
import {useJsApiLoader} from '@react-google-maps/api';
import {useNavigate} from "react-router";
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Search() {
    const navigate = useNavigate();
    const destinationRef = useRef();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_KEY,
        libraries: ['places']
    });

    const newAddress = () => {
        const val = destinationRef.current.value.trim();
        if (!val) return;
        navigate(`/results/${encodeURIComponent(val)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') newAddress();
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 58px)',
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 1.5rem',
        }}>
            <div style={{ width: '100%', maxWidth: '560px', textAlign: 'center' }}>
                <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#c8860a',
                    display: 'block',
                    marginBottom: '0.75rem',
                }}>Find Your Next Ride</span>

                <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                    letterSpacing: '0.05em',
                    color: '#f0ebe0',
                    lineHeight: 0.95,
                    marginBottom: '2.5rem',
                }}>Search Trails</h1>

                <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                    <input
                        ref={destinationRef}
                        type="text"
                        placeholder="City, region, or area…"
                        onKeyDown={handleKeyDown}
                        style={{
                            flex: 1,
                            background: '#161612',
                            border: '1px solid #3a3a32',
                            borderRadius: '4px',
                            color: '#f0ebe0',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '1rem',
                            padding: '0.85rem 1.1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#c8860a';
                            e.target.style.boxShadow = '0 0 0 2px rgba(200,134,10,0.2)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#3a3a32';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <button onClick={newAddress} style={{
                        background: '#c8860a',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.78rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '0.85rem 1.5rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s, transform 0.1s',
                        flexShrink: 0,
                    }}
                        onMouseEnter={e => e.target.style.background='#e8a020'}
                        onMouseLeave={e => e.target.style.background='#c8860a'}
                        onMouseDown={e => e.target.style.transform='scale(0.97)'}
                        onMouseUp={e => e.target.style.transform='scale(1)'}
                    >Search</button>
                </div>

                <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.75rem',
                    color: '#5a5852',
                    marginTop: '1rem',
                    letterSpacing: '0.04em',
                }}>Try "Moab", "Whistler", or "Bend, Oregon"</p>
            </div>
        </div>
    );
}

export default Search;
