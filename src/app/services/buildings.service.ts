import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Building {
  name: string;
  area: number;
  location: string;
  image: string;
  id:number;
}

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  private buildings: Building[] = [
    {
      id:0,
      area: 1500,
      image: 'https://via.placeholder.com/50/09f/fff.png',
      location: 'Lorem ispum 1',
      name: 'Winsdor'
    }
  ];
  constructor() { }

  getAll() {
    return of(this.buildings);
  }

  add(building: Building) {
    this.buildings.push(building);
  }

  update(building: Building) {
    this.buildings.splice(building.id,1,building);
  }

  deleteById(id: number) {
    this.buildings.splice(id, 1);
  }
}
