import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-20b76a63-09f8-4aa0-a048-6288e893092a');

export default function MPCheckout({ amount }: { amount: number }) {
  return (
    <Wallet
      initialization={{
        preferenceId: '2306200158-e30d8f37-fa1c-4c59-a740-e6b7717dc035',
      }}
      customization={{
        visual: {
          buttonBackground: 'blue'
        },
      }}
    />
  );
}
