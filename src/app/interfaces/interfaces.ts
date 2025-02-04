// export interface Post {
//   id: number;
//   title: string;
//   content: string;
// }

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// export interface Post {
//   id?: string;
//   code?: string;
//   name?: string;
//   description?: string;
//   price?: number;
//   quantity?: number;
//   inventoryStatus?: string;
//   category?: string;
//   image?: string;
//   rating?: number;
// }

export interface Product {
  id?: number;
  name?: string;
  country?: { name: string; code: string; };
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: { name: string; image: string; };
  verified?: boolean;
  balance?: number;
}
