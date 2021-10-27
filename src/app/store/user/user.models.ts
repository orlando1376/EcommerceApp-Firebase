import { User } from '@app/models/backend/user';
export { User, Recruiter, Employee } from '@app/models/backend/user';
export { Roles } from '@app/models/backend/role';

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

// omitir los campos uid, email y created
export type UserCreateRequest = Omit<User, 'uid' | 'email' | 'created'>
