import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceCreateData } from 'mercadopago/dist/clients/preference/create/types';

// Load access token from environment variable for better security
const accessToken = 'APP_USR-589532436585879-030917-550054764c8d661214c74640ef09a648-2306200158';

const client = new MercadoPagoConfig({ accessToken });

// Success and failure URLs
const successUrl = process.env.SUCCESS_URL || 'https://reluzes.com/payment/success';
const failureUrl = process.env.FAILURE_URL || 'https://reluzes.com/payment/error';
const pendingUrl = process.env.PENDING_URL || 'https://reluzes.com/payment/pending';

// Improved CORS handling
const headers = {
  'Access-Control-Allow-Origin': '*', // In production, restrict this to your domain
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
  'Access-Control-Allow-Methods': 'OPTIONS,POST',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json'
};

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

    const { items } = JSON.parse(event.body);
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid or empty items array' }),
      };
    }

    const preferenceClient = new Preference(client);

    const preference: PreferenceCreateData = {
      body: {
        items: items.map((item: any) => ({
          id: item.id || `item-${Math.random().toString(36).substring(2, 15)}`, // Generate a unique id if not provided
          title: item.title,
          quantity: item.quantity,
          currency_id: 'BRL',
          unit_price: item.unit_price,
        })),
        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        auto_return: 'approved'
      }
    };

    console.info("requesting preference", JSON.stringify(preference, null, 2));
    const response = await preferenceClient.create(preference);

    console.log('Created MercadoPago preference:', JSON.stringify(response, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create payment preference',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
