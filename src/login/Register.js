import React, {useState} from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {registerThunk} from "../users/auth-thunks";
import {Link} from "react-router-dom";

const pageStyle = {
    minHeight: 'calc(100vh - 58px)',
    background: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1.5rem',
};

const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    background: '#161612',
    border: '1px solid #2a2a24',
    borderRadius: '8px',
    padding: '2.5rem',
};

const inputStyle = {
    width: '100%',
    background: '#1e1e19',
    border: '1px solid #3a3a32',
    borderRadius: '4px',
    color: '#f0ebe0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    padding: '0.7rem 0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
};

function Register() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        role: 'user',
        isAdmin: false,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        try {
            await dispatch(registerThunk(credentials));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    };

    const focusStyle = (e) => {
        e.target.style.borderColor = '#c8860a';
        e.target.style.boxShadow = '0 0 0 2px rgba(200,134,10,0.2)';
    };
    const blurStyle = (e) => {
        e.target.style.borderColor = '#3a3a32';
        e.target.style.boxShadow = 'none';
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.68rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#c8860a',
                    display: 'block',
                    marginBottom: '0.5rem',
                }}>Join the community</span>
                <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2.8rem',
                    letterSpacing: '0.06em',
                    color: '#f0ebe0',
                    marginBottom: '2rem',
                    lineHeight: 1,
                }}>Create Account</h1>

                <div style={{ marginBottom: '1.1rem' }}>
                    <label>Username</label>
                    <input style={inputStyle} type="text" value={credentials.username}
                           onChange={e => setCredentials({...credentials, username: e.target.value})}
                           onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div style={{ marginBottom: '1.1rem' }}>
                    <label>Password</label>
                    <input style={inputStyle} type="password" value={credentials.password}
                           onChange={e => setCredentials({...credentials, password: e.target.value})}
                           onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div style={{ marginBottom: '1.75rem' }}>
                    <label>Role</label>
                    <select style={{...inputStyle, cursor: 'pointer'}}
                            defaultValue={credentials.role}
                            onChange={e => setCredentials({
                                ...credentials,
                                role: e.target.value,
                                isAdmin: e.target.value === 'admin'
                            })}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button onClick={handleRegister} style={{
                    width: '100%',
                    background: '#c8860a',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.85rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    marginBottom: '1.25rem',
                }}
                    onMouseEnter={e => e.target.style.background='#e8a020'}
                    onMouseLeave={e => e.target.style.background='#c8860a'}
                >Register</button>

                <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.78rem',
                    color: '#5a5852',
                    textAlign: 'center',
                    margin: 0,
                }}>
                    Already a member?{' '}
                    <Link to="/login" style={{ color: '#c8860a', textDecoration: 'none' }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
