import { Offer } from '../../types/offer';

type OfferDescriptionProps = Pick<Offer, 'description'>;

function OfferDescription({ description }: OfferDescriptionProps): JSX.Element {
  const sentences = description.split('. ').map((sentence) => `${sentence}. `);
  return (
    <div className="offer__description">
      {sentences.map((sentence) => (
        <p className="offer__text" key={sentence}>
          {sentence}
        </p>
      ))}
    </div>
  );
}

export default OfferDescription;
