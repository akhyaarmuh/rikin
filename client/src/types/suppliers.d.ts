interface Supplier {
  id: number;
  name: string;
  address: string;

  created_at: string;
  updated_at: string;
}

interface PayloadCreateSupplier {
  name: string;
  address: string;
}

interface PayloadUpdateSupplier {
  name: string;
  address: string;
}
