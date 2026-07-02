import { Block } from '../const/common';

export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

// export type BlockName = 'cities' | 'favorites' | 'near-places' | 'offer' | 'place-card' | 'reviews';
export type BlockName = typeof Block[keyof typeof Block];
