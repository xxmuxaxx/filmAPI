export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface User {
  avatarFilename: string;
  blocked: boolean;
  dateCreated: string;
  email: string;
  gender: GENDERS;
  id: number;
  lastName: string;
  middleName: string;
  name: string;
  roles: Role[];
  theme: string;
  username: string;
}

export enum GENDERS {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
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

export interface UserBaseBody {
  blocked: boolean;
  email: string;
  gender: GENDERS;
  lastName: string;
  middleName: string;
  name: string;
  roles: { id: number }[];
  theme: string;
  username: string;
}

export interface UserBaseBodyWithId extends UserBaseBody {
  id: number;
}
