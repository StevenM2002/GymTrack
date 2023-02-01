import React from "react";
import { useNavigate } from "react-router-dom";
import { navbase } from "../Constants";

export default () => {
    const nav = useNavigate();

    const onSignout = (e: React.SyntheticEvent) => {
        e.preventDefault();
        document.cookie = 'Authorization= ; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        nav(navbase + '/login')
    };

    return(
        <div style={styles.container}>
            <button style={styles.button} onClick={onSignout}>Sign out</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '5% 5% -4% 0',
    },
    button: {
        padding: '0.5rem 1rem 0.5rem 1rem',
        backgroundColor: '#C24B4B',
        border: 'solid 0px',
        borderRadius: '.5rem'
    }
}