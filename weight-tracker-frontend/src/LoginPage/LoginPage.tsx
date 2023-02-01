import styles from './LoginPage.module.css'
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
    return (
        <div className={styles['outer-page-background']}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-h1']}>Login</h1>
                <LoginForm />
            </div>
        </div>
    );
};