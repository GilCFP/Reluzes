import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PaymentService } from '../services/PaymentService';

interface PaymentData {
  id: string;
  status: string;
  status_detail: string;
  external_reference: string;
  date_approved: string;
  transaction_amount: number;
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  
  useEffect(() => {
    async function verifyPayment() {
      try {
        // Get payment ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('payment_id')
        
        if (!paymentId) {
          setVerificationError('Parâmetro de pagamento não encontrado');
          setIsVerifying(false);
          return;
        }

        const preferenceId = urlParams.get('preference_id');
        if (!preferenceId) {
          setVerificationError('ID de preferência não encontrado');
          setIsVerifying(false);
          return;
        }
        
        // Verify payment with MercadoPago through our API
        const verificationResult = await PaymentService.verifyPayment(preferenceId);
        
        if (!verificationResult.verified) {
          setVerificationError('Não foi possível verificar este pagamento');
          setIsVerifying(false);
          return;
        }
        
        // Payment is verified, show success
        setPayment(verificationResult.payment || null);
        setIsVerifying(false);
        
        // Clear pending subscription data
        PaymentService.clearPendingSubscription();
      } catch (error) {
        console.error("Error verifying payment:", error);
        setVerificationError('Erro ao verificar o pagamento');
        setIsVerifying(false);
      }
    }
    
    verifyPayment();
  }, [navigate]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg">Verificando pagamento...</p>
        </div>
      </div>
    );
  }
  
  if (verificationError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verificação de Pagamento</h2>
          <p className="text-gray-600 mb-6">
            {verificationError}
          </p>
          
          <div className="space-y-4">
            <Link
              to="/inscricao"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voltar para inscrição
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          {payment && (
            <div className="bg-gray-50 p-4 rounded-md text-left text-sm">
              <p><strong>ID do pagamento:</strong> {payment.id}</p>
              {payment.external_reference && (
                <p><strong>Referência:</strong> {payment.external_reference}</p>
              )}
              <p><strong>Valor:</strong> R$ {payment.transaction_amount.toFixed(2)}</p>
              {payment.date_approved && (
                <p><strong>Data de aprovação:</strong> {new Date(payment.date_approved).toLocaleString()}</p>
              )}
            </div>
          )}
          
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}