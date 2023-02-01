import { SignupForm } from './SignupForm';
import styles from './SignupPage.module.css'

export const SignupPage = () => {
    return (
        <div>
            <div className={styles['outer-page-background']}>
            <div className={styles["page-container"]}>
                <h1 className={styles['page-h1']}>Sign up</h1>
                <SignupForm />
            </div>
        </div>
        </div>
    );
};