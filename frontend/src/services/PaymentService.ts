import { SubscriptionForm } from '../types/subscription';

// Update API_URL to work with SAM local development server
const API_URL = 'http://localhost:3000';

export interface PaymentItem {
  title: string;
  quantity: number;
  unit_price: number;
}

export interface PaymentPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  verified: boolean;
  payment?: {
    id: string;
    status: string;
    status_detail: string;
    external_reference: string;
    date_approved: string;
    transaction_amount: number;
  };
  error?: string;
}

export class PaymentService {
  /**
   * Convert subscription data to payment items for MercadoPago
   */
  static subscriptionToPaymentItems(subscription: SubscriptionForm, valores: Record<string, number>): PaymentItem[] {
    const items: PaymentItem[] = [];
    
    subscription.participants.forEach((participant, index) => {
      // Add subscription fee
      let subscriptionPrice = 0;
      switch (participant.subscriptionValue) {
        case 'menor':
          subscriptionPrice = valores.menor;
          break;
        case 'medio':
          subscriptionPrice = valores.medio;
          break;
        case 'maior':
          subscriptionPrice = valores.maior;
          break;
      }
      
      // Apply age-based discount
      if (participant.age && participant.age <= valores.idadeIsento) {
        subscriptionPrice = 0;
      } else if (participant.age && participant.age <= valores.idadeMeia) {
        subscriptionPrice = subscriptionPrice / 2;
      }
      
      if (subscriptionPrice > 0) {
        items.push({
          title: `Inscrição Reluzes 2025 - ${participant.name || `Participante ${index + 1}`}`,
          quantity: 1,
          unit_price: subscriptionPrice
        });
      }
      
      // Add t-shirt if requested
      if (participant.wantsTshirt) {
        items.push({
          title: `Camiseta Reluzes 2025 - ${participant.tshirtSize || 'Tamanho não especificado'} - ${participant.name || `Participante ${index + 1}`}`,
          quantity: 1,
          unit_price: valores.camiseta
        });
      }
    });
    
    return items;
  }

  /**
   * Create payment preference in MercadoPago
   */
  static async createPreference(items: PaymentItem[]): Promise<PaymentPreference> {
    try {
      const response = await fetch(`${API_URL}/create-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
        mode: 'cors', // Explicitly request CORS mode
        credentials: 'same-origin'
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create payment preference: ${errorData}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating payment preference:', error);
      throw error;
    }
  }
  
  /**
   * Process payment for subscription
   */
  static async processPayment(subscription: SubscriptionForm, valores: Record<string, number>): Promise<string> {
    try {
      const items = this.subscriptionToPaymentItems(subscription, valores);
      const preference = await this.createPreference(items);
      
      // Store subscription data in localStorage for retrieval after payment
      localStorage.setItem('pendingSubscription', JSON.stringify(subscription));
      
      // Return the checkout URL
      return preference.sandbox_init_point;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }
  
  /**
   * Verify payment with MercadoPago
   */
  static async verifyPayment(paymentId: string): Promise<PaymentVerificationResult> {
    try {
      const response = await fetch(`${API_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId }),
        mode: 'cors',
        credentials: 'same-origin'
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to verify payment: ${errorData}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return {
        success: false,
        verified: false,
        error: error instanceof Error ? error.message : 'Unknown error verifying payment'
      };
    }
  }
  
  /**
   * Check payment status from URL parameters
   */
  static getPaymentStatus(): 'success' | 'failure' | 'pending' | null {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'approved') {
      return 'success';
    } else if (status === 'rejected') {
      return 'failure';
    } else if (status === 'pending' || status === 'in_process') {
      return 'pending';
    }
    
    return null;
  }
  
  /**
   * Clear pending subscription data
   */
  static clearPendingSubscription(): void {
    localStorage.removeItem('pendingSubscription');
  }
}
