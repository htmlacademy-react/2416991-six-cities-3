import { type CityName } from './common';

type CityLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: CityName;
  location: CityLocation;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type User = Host;

type HousingType = 'apartment' | 'room' | 'house' | 'hotel';

type BaseOffer = {
  id: string;
  title: string;
  type: HousingType;
  price: number;
  city: City;
  location: CityLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferPreview = BaseOffer & {
  previewImage: string;
};

export type Offer = BaseOffer & {
  description: string;
  images: string[];
  goods: string[];
  host: Host;
  bedroomsQuantity: number;
  maxAdults: number;
};

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export type RatingInForm = '' | '5' | '4' | '3' | '2' | '1';
