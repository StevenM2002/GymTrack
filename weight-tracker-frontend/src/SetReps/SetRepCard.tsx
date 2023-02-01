import React, { SyntheticEvent, useRef, useState } from 'react';
import { logSetrepType } from './SetReps';
import styles from './SetReps.module.css';

interface propType extends logSetrepType {
    updateCallback(body: {key: number, number_reps: number, did_fail: boolean}, e: React.SyntheticEvent): void;
    deleteSetCallback(key: number): void;
}

export default (props: propType) => {
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const updateRepRef = useRef<HTMLInputElement>(null);
    const updateCompletedRef = useRef<HTMLInputElement>(null);

    const onSaveChanges = (e: React.SyntheticEvent) => {
        if (updateRepRef.current === undefined || updateRepRef.current === null || updateCompletedRef.current === undefined || updateCompletedRef.current === null || updateRepRef.current.value === '') {
            alert('Fields cannot be empty');
            return;
        }
        if (parseInt(updateRepRef.current.value).toString() !== updateRepRef.current.value) {
            alert('Reps must be a whole number');
            return;
        }
        props.updateCallback({
            key: props.id,
            number_reps: parseInt(updateRepRef.current.value),
            did_fail: !updateCompletedRef.current.checked,
        }, e);
        setIsUpdateMode(false);
    };

    const displayInfo = () => {
        if (!isUpdateMode) {
            return(
                <>
                    <div className={styles.setrep_inner_info}>
                        <p>Set: {props.set_number}</p>
                        <p>Reps: {props.number_reps}</p>
                    </div>
                    <p style={{marginTop: 0}}>{props.did_fail ? 'Failed' : 'Finished'}</p>
                </>
            );
        } else {
            return(
                <>
                    <div className={styles.setrep_inner_info}>
                        <p>Set: {props.set_number}</p> 
                        <p>Reps: <input type={'text'} ref={updateRepRef} defaultValue={props.number_reps}/></p>
                    </div>
                    <p style={{marginTop: 0}}> Completed: <input ref={updateCompletedRef} type={'checkbox'} defaultChecked={!props.did_fail}/> </p>
                </>
            );
        }
    }

    const displayButtons = () => {
        if (isUpdateMode) {
            return(
                <>
                    <button className={styles.update_button} onClick={onSaveChanges} >Save changes</button>
                    <button className={styles.update_button} onClick={() => setIsUpdateMode(false)}>Cancel</button>
                </>
            );
        } else {
            return(
                <>
                    <button className={styles.update_button} onClick={() => setIsUpdateMode(true)}>Update set</button>
                    <button className={styles.update_button} onClick={() => props.deleteSetCallback(props.id)}>Delete</button>
                </>
            );
        }
    }

    return(
        <div className={styles.setrep_card_container}>
            {displayInfo()}
            <div className={styles.card_buttons_container}>
                {displayButtons()}
            </div>
        </div>
    );
};