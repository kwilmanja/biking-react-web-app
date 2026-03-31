import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findAllReviewsThunk} from "../reviews/review-thunks";
import HomeTrailCard from "./HomeTrailCard";
import {trailSearchID} from "../trails/trail-service";
import {collectTrailIDs, findTrails} from "../utility";

const heroStyle = {
    position: 'relative',
    backgroundImage: "url('images/bike2.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundRepeat: 'no-repeat',
    minHeight: '340px',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
};

const heroOverlayStyle = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(13,13,11,0.3) 0%, rgba(13,13,11,0.85) 100%)',
};

const heroContentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
};

const eyebrowStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.7rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#c8860a',
    marginBottom: '0.5rem',
    display: 'block',
};

const titleStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(2.8rem, 6vw, 5rem)',
    letterSpacing: '0.06em',
    color: '#f0ebe0',
    lineHeight: 0.95,
    marginBottom: '0.5rem',
};

const subtitleStyle = {
    fontFamily: "'Lora', serif",
    fontStyle: 'italic',
    fontSize: '1rem',
    color: '#9e9b94',
    margin: 0,
};

const feedHeaderStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2.5rem 1.5rem 1rem',
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
    borderBottom: '1px solid #2a2a24',
    marginBottom: '2rem',
};

const feedLabelStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1.5rem',
    letterSpacing: '0.08em',
    color: '#f0ebe0',
};

const feedCountStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem',
    color: '#5a5852',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
};

const feedStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
};

export default function Home() {
    const { currentUser } = useSelector((state) => state.auth);
    const [trails, setTrails] = useState([]);
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const reviewsAction = await dispatch(findAllReviewsThunk());
            const reversed = reviewsAction.payload.slice().reverse();
            setReviews(reversed);
            const trailIDs = collectTrailIDs(reversed);
            const newTrails = await findTrails(trailIDs);
            setTrails(newTrails);
        }
        fetchData();
    }, []);

    return (
        <div>
            <div style={heroStyle}>
                <div style={heroOverlayStyle} />
                <div style={heroContentStyle}>
                    <span style={eyebrowStyle}>
                        {currentUser ? `Welcome back, ${currentUser.username}` : 'Trail Community'}
                    </span>
                    <h1 style={titleStyle}>Mountain<br />Biker Blog</h1>
                    <p style={subtitleStyle}>Discover trails. Share rides. Connect with riders.</p>
                </div>
            </div>

            <div style={feedHeaderStyle}>
                <span style={feedLabelStyle}>Recent Trail Activity</span>
                {trails.length > 0 && (
                    <span style={feedCountStyle}>{trails.length} trails</span>
                )}
            </div>

            <div style={feedStyle}>
                {trails && reviews && trails.map((trail) =>
                    <HomeTrailCard key={trail.id} trail={trail} reviews={reviews}/>
                )}
                {trails.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#5a5852',
                                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
                                  letterSpacing: '0.06em' }}>
                        No trail activity yet — start exploring.
                    </div>
                )}
            </div>
        </div>
    );
}
