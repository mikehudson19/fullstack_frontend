export interface IUser {
  id?: number,
  forenames: string,
  surname: string,
  email: string,
  password?: string,
  confirmPass?: string,
  token?: string
}