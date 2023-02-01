import styles from './SessionsPage.module.css';
import { logSessionType } from './SessionsPage';
import { useNavigate } from 'react-router-dom';


interface PerSessionInfoProps extends logSessionType {
    sessionNum: number;
    removeSessionCallback(): void;
}

export default (props: PerSessionInfoProps) => {
    const nav = useNavigate();
    const goToExercises = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            nav(`/exercises/${props.id}/${props.sessionNum}/${props.date_created}`);
        }
    };

    return (
        <div onClick={goToExercises} className={styles.per_session_info_container}>
            <p>Session {props.sessionNum}</p>
            <p>Date created {props.date_created.split('T')[0]} at {props.date_created.split('T')[1].split('Z')[0].split('.')[0]}</p>
            <div className={styles.delete_container}>
                <button className={styles.delete_button} onClick={props.removeSessionCallback}>Delete session</button>
            </div>
        </div>
    );
};