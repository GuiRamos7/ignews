import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: number;
}

const SubscribeButton = ({ priceId }: ISubscribeButtonProps) => {
  return (
    <button className={styles.subscribeButton} type='button'>
      Subscribe Now
    </button>
  );
};

export default SubscribeButton;
