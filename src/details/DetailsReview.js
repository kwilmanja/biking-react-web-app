import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteReviewThunk,
    findReviewsFromTrailIDThunk,
    updateReviewThunk
} from "../reviews/review-thunks";
import {Link} from "react-router-dom";
import {formatDate} from "../utility";

function DetailsReview({review}) {
    const {currentUser} = useSelector((state) => state.auth);
    const {currentFollowed} = useSelector((state) => state.follows);
    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const dispatch = useDispatch();

    const canView = review && (
        review.public
        || currentFollowed.includes(review.username)
        || (currentUser && currentUser.username === review.username)
    );

    const canEdit = currentUser && (
        currentUser.username === review.username || currentUser.role === "admin"
    );

    if (!canView) return null;

    return (
        <div style={{
            padding: '1.25rem 0',
            borderBottom: '1px solid #1e1e19',
        }}>
            {editing ? (
                <div>
                    <textarea
                        rows={3}
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        style={{ width: '100%', marginBottom: '0.6rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-success" onClick={async () => {
                            setEditing(false);
                            dispatch(updateReviewThunk({ ...review, content: editContent }));
                        }}>Save</button>
                        <button className="btn btn-dark" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: '#2a2a24', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem',
                            color: '#c8860a',
                        }}>
                            {review.username?.[0]?.toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                          marginBottom: '0.4rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                                    <Link to={'/profile/' + review.username} style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        color: '#f0ebe0',
                                        textDecoration: 'none',
                                        letterSpacing: '0.04em',
                                    }}>
                                        {review.username}
                                    </Link>
                                    {review.published && (
                                        <span style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: '0.68rem',
                                            color: '#5a5852',
                                        }}>{formatDate(review.published)}</span>
                                    )}
                                    {!review.public && (
                                        <span style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: '0.62rem',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            color: '#5a5852',
                                            border: '1px solid #2a2a24',
                                            padding: '0.1rem 0.4rem',
                                            borderRadius: '2px',
                                        }}>private</span>
                                    )}
                                </div>
                                {canEdit && (
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        <button onClick={() => { setEditing(true); setEditContent(review.content); }}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid #2a2a24',
                                                borderRadius: '3px',
                                                color: '#9e9b94',
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: '0.68rem',
                                                letterSpacing: '0.08em',
                                                textTransform: 'uppercase',
                                                padding: '0.2rem 0.6rem',
                                                cursor: 'pointer',
                                                transition: 'border-color 0.2s, color 0.2s',
                                            }}
                                            onMouseEnter={e => { e.target.style.borderColor='#c8860a'; e.target.style.color='#c8860a'; }}
                                            onMouseLeave={e => { e.target.style.borderColor='#2a2a24'; e.target.style.color='#9e9b94'; }}
                                        >Edit</button>
                                        <button onClick={async () => {
                                            await dispatch(deleteReviewThunk(review._id));
                                            dispatch(findReviewsFromTrailIDThunk(review.trailID));
                                        }}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid #2a2a24',
                                                borderRadius: '3px',
                                                color: '#9e9b94',
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: '0.68rem',
                                                letterSpacing: '0.08em',
                                                textTransform: 'uppercase',
                                                padding: '0.2rem 0.6rem',
                                                cursor: 'pointer',
                                                transition: 'border-color 0.2s, color 0.2s',
                                            }}
                                            onMouseEnter={e => { e.target.style.borderColor='#c0392b'; e.target.style.color='#c0392b'; }}
                                            onMouseLeave={e => { e.target.style.borderColor='#2a2a24'; e.target.style.color='#9e9b94'; }}
                                        >Delete</button>
                                    </div>
                                )}
                            </div>
                            <p style={{
                                fontFamily: "'Lora', serif",
                                fontStyle: 'italic',
                                fontSize: '0.92rem',
                                color: '#9e9b94',
                                lineHeight: 1.7,
                                margin: 0,
                            }}>{review.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailsReview;
