import { signIn, signOut, useSession } from 'next-auth/react';

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

const SignInButton = () => {
  const { data: session } = useSession();

  return (
    <button
      type='button'
      onClick={() => (session ? signIn('github') : signOut())}
      className={styles.signInButton}
    >
      <FaGithub className={session ? styles.isLogged : ''} />
      {session?.user?.name ?? 'Sign in with Github'}
      {session && <FiX className={styles.closeIcon} />}
    </button>
  );
};

export default SignInButton;
