
type CardMarkProps = {
  title?: string;
}

function CardMark({ title = 'Premium' }: CardMarkProps): JSX.Element {
  return (
    <div className="place-card__mark">
      <span>{title}</span>
    </div>
  );
}

export default CardMark;
