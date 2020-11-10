import { ILocation } from './ILocation';


export class Location implements ILocation {

  constructor(
    public province: string,
    public cities: []
  ) {}
}
