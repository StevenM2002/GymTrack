import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../App';
import BackNav from '../SharedComponents/BackNav';
import SetRepCard from './SetRepCard';
import styles from './SetReps.module.css';

export interface logSetrepType {
    owner_id: number;
    set_number: number;
    number_reps: number;
    did_fail: boolean;
    date_created: string;
    id: number;
}

export default () => {
    const [setReps, setSetReps] = useState<logSetrepType[]>([]);
    const repRef = useRef<HTMLInputElement>(null);
    const { exerciseId, exercise, weight } = useParams();

    const getAllSets = () => {
        if (exerciseId === undefined) {
            return;
        }
        fetch('/log/setrep/?' + new URLSearchParams({
            owner_id: exerciseId
        }), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            }
        }).then(res => res.text()).then(res => res.split('"key":').join('"id":')).then(res => JSON.parse(res))
        .then((res: logSetrepType[]) => setSetReps(res)).catch(e => console.log('fetch error') + e);
    }

    useEffect(() => {
        getAllSets()
    }, []);

    const addSet = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (repRef.current === null || repRef.current === undefined || repRef.current.value === '') {
            alert('Field cannot be empty');
            return;
        }
        if (repRef.current.value !== parseFloat(repRef.current.value).toString()) {
            alert('Reps must be a number');
            return;
        }
        const data = {number_reps: repRef.current.value, did_fail: false, owner_id: exerciseId};
        fetch('/log/setrep/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            },
            body: JSON.stringify(data)
        }).then(res => res.text()).then(res => res.split('"key":').join('"id":')).then(res => JSON.parse(res))
        .then((res: logSetrepType) => {
            setSetReps(prev => [...prev, res]);
        }).catch(e => console.log('fetch error' + e));
    };

    const updateSetRep = (body : {key: number, number_reps: number, did_fail: boolean}, e: React.SyntheticEvent) => {
        e.preventDefault()
        fetch('/log/setrep/', {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            },
            body: JSON.stringify(body),
        }).then(res => res.json()).then(res => {
            res.id = res.key;
            delete res.key;
            return res
        }).then((res: logSetrepType) => {
            setSetReps(item => {
                item = item.filter(val => val.id !== body.key);
                item.push(res);
                item = item.sort((a, b) => a.id - b.id);
                return item; 
            });
        }).catch(e => console.log('fetch error') + e);
    };

    const deleteSet = (id: number | string) => {
        if (id === undefined || parseFloat(id.toString()).toString() !== id.toString()) {
            return;
        }
        fetch('/log/setrep/?' + new URLSearchParams({key: id.toString()}), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`,
            }
        }).then(res => res.text()).then(res => res.split('"key":')).then(res => res.join('"id":')).then(res => JSON.parse(res))
        .then((res: logSetrepType[]) => setSetReps(res))
        .catch(e => console.log('fetch error ' + e));
    };

    return (
        <div className={styles.outer_page_background}>
            <div className={styles.page_container}>
                <BackNav title={`Sets for ${exercise} at ${weight}kg`} />
                <form className={styles.form_container} onSubmit={addSet}>
                    <input placeholder='Number of reps' ref={repRef} />
                    <button className={styles.submit_button} type='submit'>Add set</button>
                </form>
                {setReps.map(val => <SetRepCard deleteSetCallback={deleteSet} updateCallback={updateSetRep} {...val} key={val.id} />)}
            </div>
        </div>
    );
};