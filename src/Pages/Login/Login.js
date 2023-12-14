import React, { useState } from 'react';
//import twitterImage from '../../assets/image/twitter.jpeg';
import TwitterImage from '../../assets/image/xtwitter.jpg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import LoginOtp from './LoginOtp';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if (user || googleUser) {
        navigate('/')
        console.log(user);
        console.log(googleUser)
    }
    if (error) {
        console.log(error);
    }
    if (loading) {
        console.log('loading.....');
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(email, password);
    };

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={TwitterImage} alt='' />
            </div>
            <div className='form-container'>
                <div className='form-box'>
                    {/* <TwitterIcon className='Twitter-img' style={{ color: "skyblue" }} /> */}
                    <h2 className='heading'>Happening now!</h2>
                    <form onSubmit={handleSubmit}>
                        <input type='email'
                            className='email'
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type='password'
                            className='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='btn-login'>
                            <button type='submit' className='btn'>Login</button>
                        </div>
                    </form>
                </div>
                <hr style={{marginRight:"80px"}}/>
                <LoginOtp/>
                <div className='google-button'>
                    {/* <GoogleButton className='g-btn' type='light' onClick={handleGoogleSignIn} /> */}
                    <button className='g-btn' onClick={handleGoogleSignIn}>Sign in with Google</button>
                </div>
                <div>
                    Don't have an account?
                    <Link to='/signup'
                        style={{
                            textDecoration: "none",
                            color: "skyblue",
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
