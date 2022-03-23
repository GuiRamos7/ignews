import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

const SignInButton = () => {
  const isUserLoggedIn = true;

  return (
    <button type='button' className={styles.signInButton}>
      <FaGithub className={isUserLoggedIn ? styles.isLogged : ''} />
      {isUserLoggedIn ? 'Guilherme Ramos' : 'Sign in with Github'}
      {isUserLoggedIn && <FiX className={styles.closeIcon} />}
    </button>
  );
};

export default SignInButton;
