import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../Constants';
import styles from './LoginPage.module.css'

interface profileLogin {
    'token': string;
}

export const LoginForm = () => {
    const [userDetails, setUserDetails] = useState({username: '', password: ''});
    const nav = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userDetails.password === '' || userDetails.username === '') {
            return;
        }
        fetch(baseurl + '/profile/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        .then(res => {
            if (!res.ok) {
                alert('Incorrect login details');
                return Promise.reject('login response not ok');
            } else {
                return res;
            }
        })
        .then(res => res.json())
        .then((res: profileLogin) => {
            document.cookie = `Authorization=Token ${res.token};`;
        }).then(() => nav('/sessions')).catch((e) => console.log('Fetch error', e));
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userDetails.username = e.target.value;
        setUserDetails(userDetails);
    };

    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userDetails.password = e.target.value;
        setUserDetails(userDetails);
    };

    return (
        <div>
            <form className={styles['form-form']} onSubmit={(e) => handleSubmit(e)}>
                <label className={styles['form-label']}>
                    <p>Email:</p>
                    <input className={styles['form-input']} type={'text'} onChange={(e) => onEmailChange(e)} placeholder='Email'/>
                </label>
                <label className={styles['form-label']}>
                    <p>Password:</p>
                    <input className={styles['form-input']} type={'password'} onChange={e => onPassChange(e)} placeholder='Password' />
                </label>
                <div className={styles['submit-container']}>
                    <button type='submit' className={styles['form-button']}>Login</button>
                    <a className={styles['register-link']} href='/signup'>Register Here!</a>
                </div>
            </form>
        </div>
    );
};