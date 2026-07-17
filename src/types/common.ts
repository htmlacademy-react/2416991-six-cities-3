import { Block } from '../const/common';

export type CityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type BlockName = typeof Block[keyof typeof Block];
