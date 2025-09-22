export interface UserPayments {
  q1: boolean;
  q2: boolean;
  q3: boolean;
  q4: boolean;
}

export interface User {
  id: number;
  name: string;
  payments: UserPayments;
}

export type Quarter = 'q1' | 'q2' | 'q3' | 'q4';
export type ViewType = 'home' | 'cuotas';