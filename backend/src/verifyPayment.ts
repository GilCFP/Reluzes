import { APIGatewayProxyHandler } from 'aws-lambda';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Load access token from environment variable
const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'APP_USR-589532436585879-030917-550054764c8d661214c74640ef09a648-2306200158';
const client = new MercadoPagoConfig({ accessToken });

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
  'Access-Control-Allow-Methods': 'OPTIONS,POST',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json'
};

interface RequestBody {
  paymentId: string;
}

interface PaymentData {
  id: number;
  status: string;
  status_detail: string;
  external_reference: string;
  date_approved: string | null;
  transaction_amount: number;
  verified: boolean;
}

interface PaymentResponse {
  success: boolean;
  verified: boolean;
  payment?: PaymentData;
  error?: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    const { paymentId } = JSON.parse(event.body) as RequestBody;
    
    if (!paymentId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment ID is required' }),
      };
    }

    console.log(`Verifying payment ID: ${paymentId}`);

    // Use MercadoPago SDK to verify the payment status
    const paymentClient = new Payment(client);
    const paymentResult = await paymentClient.get({ id: paymentId });
    
    console.log('Payment verification result:', JSON.stringify(paymentResult, null, 2));
    
    // Extract relevant payment data
    const paymentData: PaymentData = {
      id: paymentResult.id ?? 0,
      status: paymentResult.status ?? 'unknown',
      status_detail: paymentResult.status_detail ?? 'unknown',
      external_reference: paymentResult.external_reference ?? 'unknown',
      date_approved: paymentResult.date_approved ?? null,
      transaction_amount: paymentResult.transaction_amount ?? 0,
      verified: paymentResult.status === 'approved'
    };

    const response: PaymentResponse = {
      success: true,
      verified: paymentResult.status === 'approved',
      payment: paymentData
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    
    const errorResponse: PaymentResponse = {
      success: false,
      verified: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(errorResponse),
    };
  }
};
