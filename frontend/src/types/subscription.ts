/**
 * Represents a participant in the subscription
 */
export interface Participant {
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  wantsTshirt: boolean;
  tshirtSize?: 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG';
  imageRights: boolean;
  phone?: string;
  subscriptionValue: 'menor' | 'medio' | 'maior';
}

/**
 * Main contact information for the subscription
 */
export interface MainContact {
  email: string;
  phone: string;
}

/**
 * Complete subscription form data structure
 */
export interface SubscriptionForm {
  mainContact: MainContact;
  participants: Participant[];
}

/**
 * Subscription pricing values
 */
export interface SubscriptionValues {
  menor: number;
  medio: number;
  maior: number;
  meia: number;
  camiseta: number;
  idadeIsento: number;
  idadeMeia: number;
}
