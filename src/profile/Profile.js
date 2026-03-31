import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router";
import FollowerFollowed from "../follows/FollowerFollowed";
import * as authService from "../users/auth-service";
import {findFollowedThunk, followUserThunk, unfollowUserThunk} from "../follows/follows-thunks";

function Profile() {
    const {username} = useParams();
    const {currentUser} = useSelector((state) => state.auth);
    const {currentFollowed} = useSelector((state) => state.follows);
    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const user = username
                ? await authService.findUserByUsername(username)
                : currentUser;
            setProfile(user);
        }
        fetchData();
    }, [username, currentUser, currentFollowed]);

    const isOwnProfile = currentUser && profile && currentUser.username === profile.username;
    const isFollowing = currentFollowed.includes(username);

    const levelColors = {
        'beginner': '#2d5a27',
        'intermediate': '#1a3a5c',
        'advanced': '#7a5106',
        'expert': '#4a1a1a',
    };
    const levelColor = levelColors[profile.level?.toLowerCase()] || '#2a2a24';

    return (
        <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 58px)', paddingBottom: '4rem' }}>
            {profile && (
                <>
                    {/* Profile header */}
                    <div style={{
                        background: '#161612',
                        borderBottom: '1px solid #2a2a24',
                        padding: '3rem 2rem 2.5rem',
                    }}>
                        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'flex-end',
                                      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <div>
                                {/* Avatar */}
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%',
                                    background: '#2a2a24', border: '2px solid #3a3a32',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem',
                                    color: '#c8860a', marginBottom: '1rem',
                                }}>
                                    {profile.username?.[0]?.toUpperCase()}
                                </div>
                                <h1 style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                                    letterSpacing: '0.05em',
                                    color: '#f0ebe0',
                                    lineHeight: 1,
                                    marginBottom: '0.4rem',
                                }}>{profile.username}</h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                    {(profile.firstName || profile.lastName) && (
                                        <span style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: '0.85rem',
                                            color: '#9e9b94',
                                        }}>{profile.firstName} {profile.lastName}</span>
                                    )}
                                    {profile.level && (
                                        <span style={{
                                            background: levelColor,
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: '0.65rem',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            color: '#9e9b94',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '2px',
                                        }}>{profile.level}</span>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                {currentUser && profile && !isOwnProfile && (
                                    isFollowing ? (
                                        <button onClick={() => dispatch(unfollowUserThunk(username))} style={{
                                            background: 'transparent',
                                            border: '1px solid #7a5106',
                                            borderRadius: '4px',
                                            color: '#c8860a',
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontWeight: 500,
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            padding: '0.55rem 1.2rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background='rgba(200,134,10,0.08)'}
                                            onMouseLeave={e => e.currentTarget.style.background='transparent'}
                                        >Following</button>
                                    ) : (
                                        <button onClick={() => dispatch(followUserThunk(username))} style={{
                                            background: '#c8860a',
                                            border: 'none',
                                            borderRadius: '4px',
                                            color: '#fff',
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontWeight: 500,
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            padding: '0.55rem 1.2rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                            onMouseEnter={e => e.target.style.background='#e8a020'}
                                            onMouseLeave={e => e.target.style.background='#c8860a'}
                                        >Follow</button>
                                    )
                                )}
                                {isOwnProfile && (
                                    <button onClick={() => navigate('/profile/edit')} style={{
                                        background: '#1e1e19',
                                        border: '1px solid #3a3a32',
                                        borderRadius: '4px',
                                        color: '#f0ebe0',
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        padding: '0.55rem 1.2rem',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.2s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor='#c8860a'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor='#3a3a32'}
                                    >Edit Profile</button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Followers section */}
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
                        <FollowerFollowed username={profile.username}/>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
