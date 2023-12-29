export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export class UserEntity {
  ID?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;

  
}
