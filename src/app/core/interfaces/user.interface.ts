import { Role } from "../models/user-entity.model";

export interface IUserEntity{
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: Role;
  
}