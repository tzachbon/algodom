import * as React from 'react';
import ClassNames, { WithClassName } from '../../utils/classnames';

interface ICardProps extends WithClassName {
  title: string;
  image: string;
  link: string;
}

const Card: React.FunctionComponent<ICardProps> = ({
  className,
  title,
  image,
  link,
}) => {
  className = ClassNames(className, 'Card');
  return (
    <div className={className}>
      <h2>{title}</h2>
      <img src={image} alt={title} />
    </div>
  );
};

export default Card;
