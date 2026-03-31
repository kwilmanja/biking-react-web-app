import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    createReviewThunk,
    deleteReviewThunk,
    findReviewsFromTrailIDThunk
} from "../reviews/review-thunks";
import {trailSearchID} from "../trails/trail-service";
import DetailsReview from "./DetailsReview";
import DetailsTrail from "./DetailsTrail";

function Details() {
    const {currentUser} = useSelector((state) => state.auth);
    const {listedReviews} = useSelector((state) => state.reviews);
    const {trailID} = useParams();
    const [trail, setTrail] = useState();
    const [content, setContent] = useState('');
    const [privacy, setPrivacy] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        findTrailReviews();
        findTrailByID();
    }, []);

    const post = () => {
        if (!content.length) return;
        const review = {
            content,
            username: currentUser.username,
            trailID,
            trailName: trail.name,
            public: privacy
        };
        dispatch(createReviewThunk(review));
        findTrailReviews();
        setContent('');
    };

    const findTrailByID = async () => {
        if (!trail) {
            const response = await trailSearchID(trailID);
            setTrail(response.data[0]);
        }
    };

    const findTrailReviews = () => {
        dispatch(findReviewsFromTrailIDThunk(trailID));
    };

    return (
        <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 58px)', paddingBottom: '4rem' }}>
            {trail && (
                <>
                    <DetailsTrail trail={trail}/>

                    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 2rem' }}>

                        {/* Write review */}
                        {currentUser && (
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: '1.3rem',
                                    letterSpacing: '0.08em',
                                    color: '#f0ebe0',
                                    marginBottom: '0.75rem',
                                }}>Write a Review</h4>
                                <textarea
                                    rows={4}
                                    value={content}
                                    placeholder="Share your experience on this trail…"
                                    onChange={e => setContent(e.target.value)}
                                    style={{ marginBottom: '0.75rem' }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: '0.72rem',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: '#9e9b94',
                                    }}>
                                        <input type="checkbox" checked={privacy}
                                               onChange={() => setPrivacy(!privacy)}
                                               style={{ accentColor: '#c8860a', width: '14px', height: '14px' }} />
                                        Public
                                    </label>
                                    <button onClick={post} style={{
                                        background: '#c8860a',
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: '#fff',
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        padding: '0.6rem 1.4rem',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                    }}
                                        onMouseEnter={e => e.target.style.background='#e8a020'}
                                        onMouseLeave={e => e.target.style.background='#c8860a'}
                                    >Post Review</button>
                                </div>
                            </div>
                        )}

                        {/* Reviews list */}
                        <div>
                            <h4 style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: '1.3rem',
                                letterSpacing: '0.08em',
                                color: '#f0ebe0',
                                marginBottom: '0.25rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '1px solid #2a2a24',
                            }}>
                                Reviews
                                <span style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.08em',
                                    color: '#5a5852',
                                    marginLeft: '0.75rem',
                                }}>{listedReviews.length}</span>
                            </h4>
                            {listedReviews.map(review =>
                                <DetailsReview key={review._id} review={review}/>
                            )}
                            {listedReviews.length === 0 && (
                                <p style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.82rem',
                                    color: '#5a5852',
                                    padding: '1.5rem 0',
                                }}>No reviews yet. Be the first to share your experience.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Details;
