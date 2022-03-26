import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubscribeButtonProps) => {
  return (
    <button className={styles.subscribeButton} type='button'>
      Subscribe Now
    </button>
  );
};

export default SubscribeButton;
