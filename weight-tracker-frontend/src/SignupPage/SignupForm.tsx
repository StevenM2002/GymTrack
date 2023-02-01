import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseurl, navbase } from '../Constants';
import styles from './SignupPage.module.css'

export const SignupForm = () => {
    const [userDetails, setUserDetails] = useState({email: '', password: '', first_name: ''});
    const nav = useNavigate()

    const [secPass, setSecPass] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isFormOk()) {
            return;
        }
        fetch(baseurl + '/profile/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }).then(res => {
            if (!res.ok) {
                alert('Enter valid email');
                return Promise.reject('signup response not ok');
            } else {
                return res;
            }
        })
        .then(res => res.json())
        .then((res: {token: string}) => document.cookie = `Authorization=Token ${res.token};`)
        .then(() => nav(navbase + '/sessions/'))
        .catch(e => console.log('fetch error' + e));
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userDetails.email = e.target.value;
        setUserDetails(userDetails);
    };

    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userDetails.password = e.target.value;
        setUserDetails(userDetails);
    };

    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userDetails.first_name = e.target.value;
        setUserDetails(userDetails);
    };

    const onSecPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecPass(e.target.value);
    };

    const isFormOk = () => {
        return secPass === userDetails.password && 
        userDetails.first_name !== '' && 
        secPass !== '' && 
        userDetails.password !== '' &&
        userDetails.email !== '';
    };

    return (
        <div>
            <form className={styles['form-form']} onSubmit={(e) => handleSubmit(e)}>
                <label className={styles['form-label']}>
                    <p>*First Name:</p>
                    <input className={styles['form-input']} type={'text'} onChange={(e) => onFirstNameChange(e)} placeholder='First name'/>
                </label>
                <label className={styles['form-label']}>
                    <p>*Email:</p>
                    <input className={styles['form-input']} type={'text'} onChange={(e) => onEmailChange(e)} placeholder='Email'/>
                </label>
                <label className={styles['form-label']}>
                    <p>*Password:</p>
                    <input className={styles['form-input']} type={'password'} onChange={e => onPassChange(e)} placeholder='Password' />
                </label>
                <label className={styles['form-label']}>
                    {
                        secPass === userDetails.password ? null :
                        <p className={styles['not-same-pass']}>Passwords do not match</p>
                    }
                    <p>*Password again:</p>
                    <input className={styles['form-input']} type={'password'} onChange={e => onSecPassChange(e)} placeholder='Password' />
                </label>
                <div className={styles['submit-container']}>
                    <button type='submit' className={isFormOk() ? styles['form-button'] : styles['invalid-signup-button']}>Register</button>
                    <button className={styles['login-link']} onClick={() => nav(navbase + '/login')}>Login Instead!</button>
                </div>
            </form>
        </div>
    );
};