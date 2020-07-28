import { Document } from 'mongoose';
import { IRole } from './role.interface';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: IRole | string;
}
