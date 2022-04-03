import { query as q } from 'faunadb';
import { fauna } from 'services/fauna';
import { stripe } from 'services/stripe';

export const saveSubscription = async (
  subscriptionId: string,
  customerId: string,
  createdAction = false
) => {
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
    )
  );

  const { id, status, items } = await stripe.subscriptions.retrieve(
    subscriptionId
  );

  const subscriptionData = {
    id,
    status,
    userId: userRef,
    price_id: items.data[0].price.id,
  };

  if (createdAction) {
    await fauna.query(
      q.Create(q.Collection('subscription'), { data: subscriptionData })
    );
  } else {
    fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionData.id))
        ),
        { data: subscriptionData }
      )
    );
  }
};
