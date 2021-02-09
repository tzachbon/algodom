import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import ClassNames, { WithClassName } from '../../utils/classnames';
import Link from 'next/link';

interface ICardProps extends WithClassName {
  title: string;
  Icon: React.FC<any>;
  description: string;
  link: string;
  disabled?: boolean
}

const Card: React.FunctionComponent<ICardProps> = ({
  className,
  title,
  Icon,
  description,
  link,
  disabled
}) => {
  className = ClassNames(className, 'Card');

  const element = (
    <div className={className}>
      <div className='title'>
        <h2>{title}</h2>
        <LaunchIcon className='title__icon' />
      </div>
      <span className='Card__description'>{description}</span>
      <Icon className='Card__icon' />
    </div>
  )
  return (
    disabled ? element : <Link href={link}>{element}</Link>
  );
};

export default Card;
