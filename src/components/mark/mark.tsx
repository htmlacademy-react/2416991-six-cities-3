import { Block } from '../../const/common';
import { BlockName } from '../../types/common';

type CardMarkProps = {
  title?: string;
  blockClassName?: BlockName;
};

const Mark = ({
  title = 'Premium',
  blockClassName = Block.PLACE_CARD,
}: CardMarkProps): JSX.Element => (
  <div className={`${blockClassName}__mark`}>
    <span>{title}</span>
  </div>
);

export default Mark;
