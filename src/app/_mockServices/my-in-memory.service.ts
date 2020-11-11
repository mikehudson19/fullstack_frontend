import { InMemoryDbService } from "angular-in-memory-web-api";
import { RequestInfo } from "angular-in-memory-web-api/interfaces";

export class MyInMemoryService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, username: "fred92", password: "1234" },
      { id: 2, username: "john69", password: "abcd" },
    ];

    const adverts = [
      {
        id: 1,
        userId: 1,
        headline: "3 Bedroom House",
        province: "Gauteng",
        city: "Sandton",
        advertDetails:
          "Enjoy the warm and inviting family lifestyle of this popular complex where mothers meet and enjoy a glass of wine, whilst the children play and ride their bikes in the street. 3/4 sunlit bedrooms with wood laminated floors (main bedroom with air-conditioner), 2 full modern bathrooms with blinds (main with double vanities). Functional modern, open plan kitchen with granite tops, scullery and lots of storage.",
        price: 2400000,
        status: "Live",
      },
      {
        id: 2,
        userId: 1,
        headline: "2 Bedroom House",
        province: "Gauteng",
        city: "Fourways",
        advertDetails:
          "The property has a generous floor space of 91m2, your open plan kitchen with plenty of granite counter top and cupboard space will cater for the aspiring cook. The kitchen is open plan, leading into the generous living area, which flows seamlessly onto the private covered patio. The well sized bedrooms have been lovingly maintained, the main bedroom is en-suite with a shower, and the second bedroom is serviced by the second bathroom with bath and overhead shower. This unit provides 2 carports, one covered and one open, and the added benefits of what the lifestyle estate offers, swimming pool, clubhouse, tennis courts, 24 hour security, manicured communal gardens, ample visitors parking, and so much more. It really is a must view.",
        price: 1300000,
        status: "Hidden",
      },
      {
        id: 3,
        userId: 2,
        headline: "2 Bedroom Apartment",
        province: "Gauteng",
        city: "Douglasdale",
        advertDetails:
          "2 bedrooms with the main leading out to garden with french doors, unit has a beautiful full bathroom. Generous sized living area open plan lounge/ dining and kitchen with sliding doors leading out on to the private  garden and covered patio area. Complex offers tennis court 3 pools active club house fiber and 24 hour security, access control, Douglasdale village shopping center a walk away.",
        price: 940000,
        status: "Live",
      },
    ];


    const locations = [
      { province: "Gauteng", cities: [ { cityName: 'Fourways'}, { cityName: 'Pretoria'} ] },
      { province: "Eastern Cape", cities: [ { cityName: 'Port Elizabeth' }, { cityName: 'East London' } ] },
      { province: "Western Cape", cities: [ { cityName: 'Cape Town' }, { cityName: 'Jeffries Bay' } ] },
      { province: "Northern Cape", cities: [ { cityName: 'Kimberley' }, { cityName: 'Upington' } ] },
      { province: "Free State", cities: [ { cityName: 'Bloemfontein' }, { cityName: 'Welkom' } ] },
    ];

    return { users, adverts, locations };
  }
}
