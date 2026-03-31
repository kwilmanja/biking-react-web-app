import React from "react";
import {Link} from "react-router-dom";
import {formatDate} from "../utility";

function HomeReview({review}) {
    return (
        <div style={{
            padding: '0.9rem 1.5rem',
            borderTop: '1px solid #1e1e19',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
        }}>
            <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#2a2a24', flexShrink: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.9rem',
                color: '#c8860a', letterSpacing: '0.05em',
            }}>
                {review.username?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
                    <Link to={'/profile/' + review.username} style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        color: '#f0ebe0',
                        textDecoration: 'none',
                    }}
                        onMouseEnter={e => e.target.style.color='#c8860a'}
                        onMouseLeave={e => e.target.style.color='#f0ebe0'}
                    >{review.username}</Link>
                    {review.published && (
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.68rem',
                            color: '#5a5852',
                            letterSpacing: '0.04em',
                        }}>{formatDate(review.published)}</span>
                    )}
                </div>
                <p style={{
                    fontFamily: "'Lora', serif",
                    fontStyle: 'italic',
                    fontSize: '0.875rem',
                    color: '#9e9b94',
                    lineHeight: 1.6,
                    margin: 0,
                }}>{review.content}</p>
            </div>
        </div>
    );
}

export default HomeReview;
