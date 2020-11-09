import { IAdvert } from './IAdvert';


export class Advert implements IAdvert {

  constructor(
    public headline: string,
    public province: string,
    public city: string,
    public price: number,
    public advertDetails: string,
    public status?: string,
    public id?: number
  ) {}
}
