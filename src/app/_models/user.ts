export class User {
    // id: number;
    // username: string;
    // password: string;
    // firstName: string;
    // lastName: string;
    // token?: string;

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