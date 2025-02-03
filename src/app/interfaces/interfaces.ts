export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
