import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

function Payments() {
  const onToken = (token) => {
    console.log(token);
    // Add any further processing logic for the token here
  };

  return (
    <div>
      <StripeCheckout
        token={onToken}
        currency='INR'  // Use 'INR' for Indian Rupees
        amount={5000000} // Amount in cents (5000000 cents = 50000 INR)
        stripeKey="pk_test_51ODixTSJnykWVH54Il3XUQfDfYeAvLEG6kg4Ki9A9XQdsuWJW63ykilt8Ln0KhmEHsmI7g1e6brgGUkIfrKRUN8k00pxjSYchK"
      />
    </div>
  );
}

export default Payments;

