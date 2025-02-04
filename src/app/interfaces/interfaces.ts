// export interface Post {
//   id: number;
//   title: string;
//   content: string;
// }

export interface User {
  name: string;
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserTable {
  id?: number;
  name?: string;
  role?: string;
  email?: string;
  createdAt?: string;
}

export interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}


export interface UserLogin {
  email: string;
  password: string;
}

export interface Post {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
}


