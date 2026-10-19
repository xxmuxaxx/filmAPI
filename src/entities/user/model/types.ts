export interface AuthenticationRequest {
  username: string;
  password: string;
}

// Контракты сверены с filmapi: UserDTO, UserBaseForm, UseRegistrationForm
export interface User {
  avatarFilename: string | null;
  blocked: boolean;
  dateCreated: string;
  email: string | null;
  gender: GENDERS | null;
  id: number;
  lastName: string | null;
  middleName: string | null;
  name: string | null;
  roles: Role[];
  theme: string | null;
  username: string;
}

/** Текущий пользователь: роли и права разложены в списки строк */
export interface CurrentUser extends Omit<User, "roles"> {
  roles: string[];
  rolePermissions: string[];
}

export interface AuthenticationResponse {
  username: string;
  token: string;
}

export enum GENDERS {
  MAN = "MAN",
  WOMAN = "WOMAN",
}

export interface Role {
  description: string;
  id: number;
  name: string;
  rolePermissions: RolePermission[];
}

export interface RolePermission {
  authority: string;
  authorityDescription: string;
  id: number;
}

export interface UserRegistrationBody {
  email?: string;
  gender?: GENDERS;
  lastName?: string;
  middleName?: string;
  name?: string;
  password: string;
  theme?: string;
  username: string;
}

/** Тело PUT /users/{id}: бэкенд записывает только не-null поля */
export interface UserBaseBody {
  blocked: boolean;
  email: string | null;
  gender: GENDERS | null;
  lastName: string | null;
  middleName: string | null;
  name: string | null;
  roles: { id: number }[];
  theme: string | null;
  username: string;
}

export interface UserBaseBodyWithId extends UserBaseBody {
  id: number;
}
