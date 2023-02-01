import { useEffect, useState } from 'react';
import { getCookie } from '../App';
import Signout from '../SharedComponents/Signout';
import PerSessionInfo from './PerSessionInfo';
import styles from './SessionsPage.module.css';

export interface logSessionType {
    id: number;
    date_created: string;
}

export const SessionsPage = () => {
    const [sessions, setSessions] = useState<logSessionType[]>([]);
    const receiveSessions = () => {
        fetch('/log/session/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            },
        }).then((res) => {
            return res.text();
        }).then((res) => {
            res = res.split('"key":').join('"id":');
            return JSON.parse(res);
        }).then((res: logSessionType[]) => {
            res.sort((a, b) => b.id - a.id);
            setSessions(res);
        }).catch(e => console.log('fetch error '+e));
    }
    useEffect(receiveSessions, []);
    const createSession = () => {
        fetch('/log/session/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            },
        }).then(res => res.text())
        .then(res => {
            res = res.split('"key":').join('"id":')
            return JSON.parse(res);
        }).then((res: logSessionType) => {
            setSessions(prev => [res, ...prev])
        }).catch(e => console.log('fetch error '+e));
    }
    const removeSession = (sessionKey: number) => {
        fetch('/log/session/?' + new URLSearchParams({
            key: sessionKey.toString()
        }), 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            }
        }).then(res => res.text())
        .then(res => {
            res = res.split('"key":').join('"id":')
            return JSON.parse(res);
        }).then((res: logSessionType[]) => {
            res = res.sort((a, b) => b.id - a.id);
            setSessions(res);
        }).catch(e => console.log('fetch error '+e));
    }
    return (
        <div className={styles.outer_page_background}>
            <div className={styles.page_container}>
                <Signout />
                <h2 className={styles.header}>Sessions</h2>
                <div className={styles.create_session_container}>
                    <button className={styles.create_session_button} onClick={createSession}>Create Session</button>
                </div>
                <div>
                    {
                        sessions.map((val, idx) => <PerSessionInfo sessionNum={sessions.length - idx} {...val} key={val.id} removeSessionCallback={() => removeSession(val.id)}/>)
                    }
                </div>
            </div>
        </div>
    );
};