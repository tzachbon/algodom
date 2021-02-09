import React from 'react';
import { observer } from 'mobx-react';

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = ({ children }) => {
  return (
    <div className='Container'>
      <div className='bg' style={{ backgroundImage: `url('bg.jpg')` }}></div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default observer(Container);
