interface Employe {
  id: number;
  full_name: string;
  email: string;
  role: 'ADMIN' | 'CASHIER';
  status: boolean;

  created_at: string;
  updated_at: string;
}

interface PayloadCreateEmploye {
  full_name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CASHIER';
}

interface PayloadUpdateEmploye {
  role: 'ADMIN' | 'CASHIER';
  status: boolean;
}
