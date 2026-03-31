import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./users/auth-thunks";
import React from "react";

const navStyle = {
    background: '#0d0d0b',
    borderBottom: '1px solid #2a2a24',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '58px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
};

const brandStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1.6rem',
    letterSpacing: '0.1em',
    color: '#f0ebe0',
    textDecoration: 'none',
    lineHeight: 1,
};

const brandAccentStyle = {
    color: '#c8860a',
};

const linkListStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
};

const linkStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#9e9b94',
    textDecoration: 'none',
    padding: '0.4rem 0.85rem',
    borderRadius: '4px',
    transition: 'color 0.2s, background 0.2s',
};

const activeLinkStyle = {
    ...linkStyle,
    color: '#f0ebe0',
};

function NavLink({ to, children, onClick }) {
    return (
        <li>
            <Link to={to} style={linkStyle}
                onMouseEnter={e => { e.target.style.color='#f0ebe0'; e.target.style.background='#1e1e19'; }}
                onMouseLeave={e => { e.target.style.color='#9e9b94'; e.target.style.background='transparent'; }}
                onClick={onClick}
            >{children}</Link>
        </li>
    );
}

function Nav() {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav style={navStyle}>
            <Link to="/" style={brandStyle}>
                MTN<span style={brandAccentStyle}>BIKER</span>
            </Link>

            <ul style={linkListStyle}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/search">Search</NavLink>

                {!currentUser && <NavLink to="/login">Login</NavLink>}
                {!currentUser && <NavLink to="/register">Register</NavLink>}
                {currentUser && <NavLink to="/profile">Profile</NavLink>}
                {currentUser && currentUser["isAdmin"] && <NavLink to="/admin">Admin</NavLink>}
                {currentUser && (
                    <li>
                        <Link to="/login" style={linkStyle}
                            onMouseEnter={e => { e.target.style.color='#f0ebe0'; e.target.style.background='#1e1e19'; }}
                            onMouseLeave={e => { e.target.style.color='#9e9b94'; e.target.style.background='transparent'; }}
                            onClick={() => dispatch(logoutThunk())}
                        >Logout</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
