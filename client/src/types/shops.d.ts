interface Shop {
  id: number;
  name: string;
  no_hp: string;
  address: string;
  expired_at: string;
  foot_note?: string;
  pole_note?: string;

  created_at: string;
  updated_at: string;
}

interface PayloadCreateShop {
  name: string;
  no_hp: string;
  address: string;
}

interface PayloadUpdateShop {
  name: string;
  no_hp: string;
  address: string;
  foot_note?: string;
  pole_note?: string;
}

interface PayloadUpdateLK {
  license_key: string;
}
