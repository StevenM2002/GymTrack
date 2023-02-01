import styles from './ExercisesPage.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';
import { getCookie } from '../App';
import BackNav from '../SharedComponents/BackNav';

export interface logExerciseType {
    owner_key: number;
    weight: number;
    exercise: string;
    date_created: string;
    id: number;
}

interface postLogExerciseType {
    owner_key: number;
    weight: number;
    exercise: string;
}

const isNumber = (num: string) => parseFloat(num).toString() === num;

export default () => {
    const { sessionId, sessionNum, sessionDate } = useParams();
    const [exercises, setExercises] = useState<logExerciseType[]>([]);
    const exerciseWeight = useRef<HTMLInputElement>(null);
    const exerciseName = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('/log/exercise/?' + new URLSearchParams({owner_id: sessionId!}), 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            }
        }).then(res => res.text())
        .then(res => {
            res = res.split('"key":').join('"id":');
            return JSON.parse(res);
        }).then((res: logExerciseType[]) => {
            res = res.sort((a, b) => a.id - b.id);
            setExercises(res);
        }).catch((e) => {
            console.log("ExercisesPage" + e);
        })
    }, [])

    const addExercise = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (exerciseWeight.current?.value === undefined || exerciseName.current?.value === undefined) {
            alert('Fields cannot be empty')
            return;
        }
        if (exerciseWeight.current?.value === '' || exerciseName.current?.value === '') {
            alert('Fields cannot be empty')
            return;
        }
        if (!isNumber(exerciseWeight.current.value)) {
            alert('Weight must be a number');
            return;
        };
        fetch('/log/exercise/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            },
            body: JSON.stringify({
                'owner_id': sessionId,
                'weight': exerciseWeight.current.value,
                'exercise': exerciseName.current.value,
            })
        }).then(res => res.json())
        .then((res) => {
            res.id = res.key;
            delete res.key;
            return res;
        }).then((res: logExerciseType) => {
            setExercises(prev => [...prev, res])
        }).catch(e => {
            console.log('ExercisesPage' + e);
        })
    };

    const deleteExercise = (id: number) => {
        fetch('/log/exercise/?' + new URLSearchParams({
            key: id.toString(),
        }), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            }
        }).then(res => res.text()).then(res => res.split('"key":').join('"id":')).then(res => JSON.parse(res))
        .then((res: logExerciseType[]) => {
            setExercises(res);
        }).catch(e => console.log('FetchFailed ' + e));
    };

    const updateExercise = (exercise: string | undefined, weight: string | undefined, key: number, e: React.SyntheticEvent) => {
        e.preventDefault();
        if (exercise === '' || exercise === undefined || exercise === null || weight === '' || weight === undefined || weight === null) {
            alert('Fields cannot be empty');
            return;
        }
        if (!isNumber(weight)) {
            alert('Weight must be a number');
            return;
        }
        fetch('/log/exercise/', {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getCookie('Authorization')}`
            },
            body: JSON.stringify({
                weight: weight,
                exercise: exercise,
                key: key,
            })
        }).then(res => res.text()).then(res => res.split('"key":').join('"id":')).then(res => JSON.parse(res))
        .then((res: logExerciseType) => {
            setExercises(item => {
                item = item.filter(val => val.id !== key);
                item.push(res);
                item = item.sort((a, b) => a.id - b.id);
                return item;
            })
        }).catch(e => console.log('fetch error'+ e ));
    };

    

    return (
        <div className={styles.outer_page_background}>
            <div className={styles.page_container}>
                <BackNav title={`Exercise: Session ${sessionNum} on ${sessionDate?.split('T')[0]}`}/>
                <form onSubmit={addExercise} className={styles.form_container}>
                    <input type={'text'} ref={exerciseName} placeholder='Exercise name' className={styles.input_style} />
                    <input type={'text'} ref={exerciseWeight} placeholder='Weight' className={styles.input_style} />
                    <button className={styles.submit_button} type='submit'>Add exercise</button>
                </form>
                {exercises.map((val) => <ExerciseCard updateExerciseCallback={updateExercise} deleteExerciseCallback={() => deleteExercise(val.id)} key={val.id} {...val}/>)}
            </div>
        </div>
    );
};