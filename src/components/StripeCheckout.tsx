import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'

// This would be your actual Stripe public key in production
//const stripePromise = loadStripe('pk_test_mock_key')

interface StripeCheckoutProps {
  amount: number
  participants: any[]
}

export default function StripeCheckout({ amount, participants }: StripeCheckoutProps) {
  const navigate = useNavigate()

  const handlePayment = async () => {
    try {
      // Mock successful payment 80% of the time
      if (Math.random() > 0.2) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        navigate('/payment-success')
      } else {
        throw new Error('Payment failed')
      }
    } catch (error) {
      navigate('/payment-error')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Número de participantes:</span>
          <span className="font-medium">{participants.length}</span>
        </div>
        <div className="flex justify-between border-t pt-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">R$ {amount.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Pagar com Cartão
      </button>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Pagamento processado de forma segura pela Stripe
      </p>
    </div>
  )
}