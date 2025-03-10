import React from 'react'
import { Link } from 'react-router-dom'

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Inscrição Confirmada!</h2>
        <p className="text-gray-600 mb-6">
          Sua inscrição para o Reluzes 2025 foi confirmada com sucesso. Em breve você receberá um email com mais informações e seu comprovante de pagamento.
        </p>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Número da inscrição: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}