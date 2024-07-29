interface Customer {
  id: number;
  full_name: string;
  address: string;

  created_at: string;
  updated_at: string;
}

interface PayloadCreateCustomer {
  full_name: string;
  address: string;
}

interface PayloadUpdateCustomer {
  full_name: string;
  address: string;
}
