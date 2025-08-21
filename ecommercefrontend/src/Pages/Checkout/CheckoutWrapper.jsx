import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51RoCVCGar6ByhFT1cb72cOGB5F1gaafxKqK6MNgqOBu7i22L3VwtIsJxiYV1ULzML2bWvR9JawFkB26lU5rZ4rXF00OwPah8cG');

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutWrapper;
