import { Action } from '@ngrx/store';
import { User, EmailPasswordCredentials, UserCreateRequest } from './user.models';

export enum Types {
  // Init
  INIT = '[USER] Init: Start',
  INIT_AUTHORIZED = '[USER] Init: Authorized',
  INIT_UNAUTHORIZED = '[USER] Init: Unauthorized',
  INIT_ERROR = '[USER] Init: Error',

  // login
  SIGN_IN_EMAIL = '[User] Login con Email: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Login con Email: Success',
  SIGN_IN_EMAIL_ERROR = '[User] Login con Email: Error',

  // registro de usuario
  SIGN_UP_EMAIL = '[User] Sing Up con Email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Sing Up con Email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Sing Up con Email: Error',

  // logout
  SIGN_OUT_EMAIL = '[User] Sing Out con Email: Start',
  SIGN_OUT_EMAIL_SUCCESS = '[User] Sing Out con Email: Success',
  SIGN_OUT_EMAIL_ERROR = '[User] Sing Out con Email: Error',

  // creación de usuarios
  CREATE = '[User] Create: Start',
  CREATE_SUCCESS = '[User] Create: Success',
  CREATE_ERROR = '[User] Create: Error',

  // actualización de usuarios
  UPDATE = '[User] Update: Start',
  UPDATE_SUCCESS = '[User] Update: Success',
  UPDATE_ERROR = '[User] Update: Error',
}

// Init
export class Init implements Action {
  readonly type = Types.INIT;
  constructor() {}
}

export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public uid: string, public user: User | null) {}
}

export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor() {}
}

export class InitError implements Action {
  readonly type = Types.INIT_ERROR;
  constructor(public error: string) {}
}

// login
export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) {}
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
  constructor(public uid: string, public user: User | null) {}
}

export class SignInEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_ERROR;
  constructor(public error: string) {}
}

// registro de usuario
export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) {}
}

export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
  constructor(public uid: string) {}
}

export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_UP_EMAIL_ERROR;
  constructor(public error: string) {}
}

// logout
export class SignOut implements Action {
  readonly type = Types.SIGN_OUT_EMAIL;
  constructor() {}
}

export class SignOutSuccess implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_SUCCESS;
  constructor() {}
}

export class SignOutError implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_ERROR;
  constructor(public error: string) {}
}

// creación de usuario
export class Create implements Action {
  readonly type = Types.CREATE;
  constructor(public user: UserCreateRequest) {}
}

export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;
  constructor(public user: User) {}
}

export class CreateError implements Action {
  readonly type = Types.CREATE_ERROR;
  constructor(public error: string) {}
}

// actualización de usuario
export class Update implements Action {
  readonly type = Types.UPDATE;
  constructor(public user: User) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;
  constructor(public user: User) {}
}

export class UpdateError implements Action {
  readonly type = Types.UPDATE_ERROR;
  constructor(public error: string) {}
}

export type All = Init |
                  InitAuthorized |
                  InitUnauthorized |
                  InitError |
                  SignInEmail |
                  SignInEmailSuccess |
                  SignInEmailError |
                  SignUpEmail |
                  SignUpEmailSuccess |
                  SignUpEmailError |
                  SignOut |
                  SignOutSuccess |
                  SignOutError |
                  Create |
                  CreateSuccess |
                  CreateError |
                  Update |
                  UpdateSuccess |
                  UpdateError;
