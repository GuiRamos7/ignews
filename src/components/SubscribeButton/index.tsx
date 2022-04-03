import { signIn, useSession } from 'next-auth/react';
import { api } from 'services/api';
import { getStripeJs } from 'services/stripe-js';
import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubscribeButtonProps) => {
  const { data: session } = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({
        sessionId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className={styles.subscribeButton}
      onClick={handleSubscribe}
      type='button'
    >
      Subscribe Now
    </button>
  );
};

export default SubscribeButton;
