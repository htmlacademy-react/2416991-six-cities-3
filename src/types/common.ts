import { SortOption } from '../const/business';
import { Block } from '../const/common';

export type CityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type CityLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: CityName;
  location: CityLocation;
};

export type SortType = typeof SortOption[keyof typeof SortOption];

export type BlockName = typeof Block[keyof typeof Block];
