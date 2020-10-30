import { IUser } from './IUser';

export class User implements IUser {

    constructor(
        public id: number,
        public forenames: string,
        public surname: string,
        public email: string,
        public password: string,
        public confirmPass: string,
        public token?: string
    ){

    }
}