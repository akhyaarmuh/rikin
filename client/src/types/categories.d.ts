interface Category {
  id: number;
  name: string;

  created_at: string;
  updated_at: string;
}

interface PayloadCreateCategory {
  name: string;
}

interface PayloadUpdateCategory {
  name: string;
}
