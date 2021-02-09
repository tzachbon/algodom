import { observer } from 'mobx-react';
import React from 'react';
import ClassNames, { WithClassName } from '../../utils/classnames';
// import './style.scss';

interface ISortElementProps extends WithClassName {
  value: number;
  current?: boolean;
}

export interface ISortElement {
  current?: boolean;
  value: number;
  key?: string;
}

const SortElement: React.FunctionComponent<ISortElementProps> = ({
  className,
  value,
  current,
}) => {
  className = ClassNames(className, 'SortElement', { current });

  return (
    <div className={className} style={{ height: `${(value ?? 1) / 1.5}rem` }}>
      <span className='value'>{value}</span>
    </div>
  );
};

export default observer(SortElement);
