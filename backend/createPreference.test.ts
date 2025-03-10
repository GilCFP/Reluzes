import { handler } from './createPreference';
import { APIGatewayProxyEvent, Context , APIGatewayProxyResult} from 'aws-lambda';
import * as MercadoPago from 'mercadopago';
import {describe, expect, test, it} from '@jest/globals';


describe('createPreference', () => {
  it('should create a preference successfully', async () => {
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({
        items: [
          { title: 'Test Item', quantity: 1, unit_price: 100 },
        ],
      }),
      // ...other properties
    } as any;

    const context: Context = {} as any;

    const result = await handler(event, context, () => {}) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('id', 'mock-preference-id');
  });
});
