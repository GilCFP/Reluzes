import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceCreateData } from 'mercadopago/dist/clients/preference/create/types';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-20b76a63-09f8-4aa0-a048-6288e893092a' });


export const handler: APIGatewayProxyHandler= async (event) => {
  try {
    const { items } = JSON.parse(event.body || '{}');
    const preferenceClient = new Preference(client);

    const preference : PreferenceCreateData = {
        body: {
      items: items.map((item: any) => ({
        title: item.title,
        quantity: item.quantity,
        currency_id: 'BRL',
        unit_price: item.unit_price,
      }))},
    };

    const response = await preferenceClient.create(preference)

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create preference',
      }),
    };
  }
};
