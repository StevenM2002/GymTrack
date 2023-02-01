import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logExerciseType } from './ExercisesPage';
import styles from './ExercisesPage.module.css';

interface exerciseCardProps extends logExerciseType {
    deleteExerciseCallback(): void;
    updateExerciseCallback(exercise: string | undefined | null, weight: string | undefined | null, key: number, e: React.SyntheticEvent): void;
}

export default (props: exerciseCardProps) => {
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const exerciseRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const nav = useNavigate();
    const displayInfo = () => {
        if (!isUpdateMode) {
            return(
                <>
                    <p>Exercise: {props.exercise}</p>
                    <p>Weight: {props.weight}kg</p>
                </>
            );
        } else {
            return(
                <>
                    <div className={styles.update_field_container}>
                        <p className={styles.update_field_text}>Exercise:</p>
                        <input placeholder='Exercise' defaultValue={props.exercise} ref={exerciseRef} />
                    </div>
                    <div className={styles.update_field_container}>
                        <p className={styles.update_field_text}>Weight:</p>
                        <input placeholder='Weight' defaultValue={props.weight} ref={weightRef} />
                    </div>
                </>
            );
        }
    };

    const onSave = (e: React.SyntheticEvent) => {
        if (exerciseRef.current === null || weightRef.current === null) {
            alert('Fields cannot be empty')
            return;
        }
        props.updateExerciseCallback(exerciseRef.current.value, weightRef.current.value, props.id, e);
        setIsUpdateMode(false);
    };

    const displayButtons = () => {
        if (isUpdateMode) {
            return(
                <>
                    <button className={styles.update_button} onClick={(e) => onSave(e)}>Save changes</button>
                    <button className={styles.update_button} onClick={() => setIsUpdateMode(false)}>Cancel</button>
                </>
            );
        } else {
            return(
                <>
                    <button className={styles.update_button} type='button' onClick={() => setIsUpdateMode(true)}>Update exercise</button>
                    <button className={styles.update_button} type='button' onClick={props.deleteExerciseCallback}>Delete exercise</button>
                </>
            );
        }
    };

    const goToSetRep = (e: React.SyntheticEvent) => {
        if (e.target === e.currentTarget) {
            nav(`/sets-and-reps/${props.id}/${props.exercise}/${props.weight}`);
        }
    };

    return (
        <div onClick={goToSetRep} className={styles.exercise_card_container}>
            {displayInfo()}
            <div className={styles.exercise_card_buttons_container}>
                {displayButtons()}
            </div>
        </div>
    );
};