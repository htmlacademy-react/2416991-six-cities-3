import { type Offer, type OfferPreview } from '../types/offer';

export const offersPreview: OfferPreview[] = [
  {
    'id': 'b13fcd51-1658-4b75-a06c-554264221f44',
    'title': 'The Joshua Tree House',
    'type': 'apartment',
    'price': 485,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.85761,
      'longitude': 2.358499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2
  },
  {
    'id': '24ed639c-7e31-45c5-98d2-74cd17336d97',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'room',
    'price': 292,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.87561,
      'longitude': 2.375499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2
  },
  {
    'id': 'bb5b4ff5-54d6-4cab-a807-c19483f43b1c',
    'title': 'Beautiful & luxurious apartment at great location',
    'type': 'house',
    'price': 745,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/12.jpg',
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 50.938361,
        'longitude': 6.959974,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 50.960361,
      'longitude': 6.967974,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.7
  },
  {
    'id': 'dc205b3a-1c1b-4b44-83c9-7d4f3f8c95a8',
    'title': 'Wood and stone place',
    'type': 'apartment',
    'price': 481,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    'city': {
      'name': 'Dusseldorf',
      'location': {
        'latitude': 51.225402,
        'longitude': 6.776314,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 51.239402000000005,
      'longitude': 6.756314000000001,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 1.5
  },
];

export const offers: Offer[] = [
  {
    'id': 'b13fcd51-1658-4b75-a06c-554264221f44',
    'title': 'The Joshua Tree House',
    'description': 'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    'type': 'apartment',
    'price': 485,
    'images': [
      'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/8.jpg'
    ],
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.85761,
      'longitude': 2.358499,
      'zoom': 16
    },
    'goods': [
      'Cable TV',
      'Washer',
      'Laptop friendly workspace',
      'Kitchen',
      'Heating',
      'Wi-Fi',
      'Coffee machine',
      'Baby seat',
      'Air conditioning'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isPremium': false,
    'isFavorite': false,
    'rating': 2,
    'bedrooms': 2,
    'maxAdults': 10
  },
  {
    'id': '24ed639c-7e31-45c5-98d2-74cd17336d97',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'description': 'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
    'type': 'room',
    'price': 292,
    'images': [
      'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/5.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/3.jpg'
    ],
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.87561,
      'longitude': 2.375499,
      'zoom': 16
    },
    'goods': [
      'Coffee machine',
      'Breakfast',
      'Cable TV',
      'Heating',
      'Towels',
      'Baby seat',
      'Laptop friendly workspace',
      'Wi-Fi',
      'Air conditioning',
      'Kitchen',
      'Washer',
      'Fridge'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isPremium': false,
    'isFavorite': false,
    'rating': 2,
    'bedrooms': 1,
    'maxAdults': 3
  },
  {
    'id': 'bb5b4ff5-54d6-4cab-a807-c19483f43b1c',
    'title': 'Beautiful & luxurious apartment at great location',
    'description': 'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    'type': 'house',
    'price': 745,
    'images': [
      'https://15.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/12.jpg'
    ],
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 50.938361,
        'longitude': 6.959974,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 50.960361,
      'longitude': 6.967974,
      'zoom': 16
    },
    'goods': [
      'Baby seat',
      'Washing machine',
      'Breakfast',
      'Fridge',
      'Dishwasher',
      'Cable TV',
      'Washer',
      'Laptop friendly workspace',
      'Air conditioning',
      'Heating'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isPremium': false,
    'isFavorite': false,
    'rating': 2.7,
    'bedrooms': 4,
    'maxAdults': 6
  },
  {
    'id': 'dc205b3a-1c1b-4b44-83c9-7d4f3f8c95a8',
    'title': 'Wood and stone place',
    'description': 'Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.',
    'type': 'apartment',
    'price': 481,
    'images': [
      'https://15.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/20.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/15.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/6.jpg'
    ],
    'city': {
      'name': 'Dusseldorf',
      'location': {
        'latitude': 51.225402,
        'longitude': 6.776314,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 51.239402000000005,
      'longitude': 6.756314000000001,
      'zoom': 16
    },
    'goods': [
      'Washing machine',
      'Fridge',
      'Baby seat',
      'Air conditioning',
      'Wi-Fi',
      'Coffee machine',
      'Dishwasher',
      'Kitchen',
      'Cable TV',
      'Breakfast',
      'Laptop friendly workspace',
      'Heating',
      'Towels'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isPremium': false,
    'isFavorite': false,
    'rating': 1.5,
    'bedrooms': 4,
    'maxAdults': 6
  }
];
