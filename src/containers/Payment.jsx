import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button';

import AppContext from '../context/AppContext';

import '../styles/components/Payment.css';

const Payments = ({ history }) => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientId: '1231dasdd12e1ddasd13',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  // Procedimiento con API de Paypal:
  /*
  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };

      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
    
  }; */

  const handlePaymentSuccess = (data) => {
    const newOrder = {
      buyer,
      product: cart,
      payment: data,
    };

    addNewOrder(newOrder);
    history.push('/checkout/success');
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;

    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div key={item.title} className="Payment-item">
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button Information">
          {/* <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Payment started')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          /> */}
          <button type="button" onClick={handlePaymentSuccess}>
            Pagar ${handleSumTotal()}
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Payments;
