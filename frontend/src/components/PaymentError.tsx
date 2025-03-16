import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentService } from '../services/PaymentService';

export default function PaymentError() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  useEffect(() => {
    // Get error info from URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error') || '';
    const errorDescription = urlParams.get('error_description') || 'Ocorreu um erro ao processar seu pagamento';
    
    setErrorMessage(errorDescription);
    
    // Note: we don't clear the pendingSubscription here so the user can try again
  }, []);

  const handleRetry = () => {
    // Redirect back to subscription page to retry payment
    navigate('/subscription');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro no Pagamento</h2>
        <p className="text-gray-600 mb-6">
          {errorMessage || "Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente ou entre em contato com nosso suporte."}
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
          <p className="text-sm text-gray-500">
            Se o problema persistir, entre em contato: suporte@reluzes.com.br
          </p>
        </div>
      </div>
    </div>
  );
}