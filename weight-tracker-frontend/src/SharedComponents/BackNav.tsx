import { useNavigate } from 'react-router-dom';
import styles from './BackNav.module.css';

interface propsType {
    displayText?: string;
    title: string;
}

export default (props: propsType) => {
    const nav = useNavigate();

    return(
        <div className={styles.container}>
            <h3 className={styles.title}>{props.title}</h3>
            <button className={styles.back_button} onClick={() => nav(-1)}>{props.displayText ? props.displayText : 'Go back'}</button>
        </div>
    );
}