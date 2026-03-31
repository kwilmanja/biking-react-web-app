import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import {trailSearchLatLng} from "../trails/trail-service";
import TrailCard from "./TrailCard";
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Results() {
    const {address} = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (address && !results) {
                await handleGeocode();
            }
        }
        fetchData();
    }, [address]);

    const searchTrails = async (lat, lng) => {
        const result = await trailSearchLatLng(lat, lng);
        setResults(result.data);
    };

    const handleGeocode = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_KEY}`;
        axios.get(url)
            .then(async (response) => {
                if (response.data.status === "OK") {
                    const {lat, lng} = response.data.results[0].geometry.location;
                    await searchTrails(lat, lng);
                } else {
                    console.error(`Geocode error: ${response.data.status}`);
                    setResults([]);
                }
            })
            .catch((error) => {
                console.error(`Geocode error: ${error.message}`);
                setResults([]);
            });
    };

    const decoded = decodeURIComponent(address || '');

    return (
        <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 58px)' }}>
            {/* Header */}
            <div style={{
                borderBottom: '1px solid #2a2a24',
                padding: '2rem 2rem 1.5rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#c8860a',
                    display: 'block',
                    marginBottom: '0.4rem',
                }}>Search Results</span>
                <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    letterSpacing: '0.05em',
                    color: '#f0ebe0',
                    lineHeight: 1,
                    margin: 0,
                }}>{decoded}</h1>
                {results && (
                    <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.78rem',
                        color: '#5a5852',
                        margin: '0.5rem 0 0',
                        letterSpacing: '0.04em',
                    }}>{results.filter(t => t.thumbnail).length} trails found</p>
                )}
            </div>

            {/* Cards grid */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '1.25rem',
            }}>
                {results === null ? (
                    <div style={{
                        gridColumn: '1/-1',
                        textAlign: 'center',
                        padding: '5rem 0',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.85rem',
                        color: '#5a5852',
                        letterSpacing: '0.06em',
                    }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            border: '2px solid #c8860a', borderTopColor: 'transparent',
                            animation: 'spin 0.7s linear infinite',
                            margin: '0 auto 1rem',
                        }} />
                        Searching trails…
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : results.length === 0 ? (
                    <div style={{
                        gridColumn: '1/-1',
                        textAlign: 'center',
                        padding: '5rem 0',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.85rem',
                        color: '#5a5852',
                    }}>No trails found for this location.</div>
                ) : (
                    results.map(trail => trail.thumbnail
                        ? <TrailCard key={trail.id} trail={trail}/>
                        : null
                    )
                )}
            </div>
        </div>
    );
}

export default Results;
