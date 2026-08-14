import { MAX_IMAGES_COUNT_IN_OFFER_GALLERY } from '../../const/business';
import { Offer } from '../../types/offer';

type OfferGalleryProps = Pick<Offer, 'images'>;

const OfferGallery = ({ images }: OfferGalleryProps): JSX.Element => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery">
      {images.slice(0,MAX_IMAGES_COUNT_IN_OFFER_GALLERY).map((image) => (
        <div className="offer__image-wrapper" key={image}>
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  </div>
);

export default OfferGallery;
