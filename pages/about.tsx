import * as React from 'react';
import { observer } from 'mobx-react';

interface IAboutContainerProps {}

const AboutContainer: React.FunctionComponent<IAboutContainerProps> = (
  props
) => {
  return <div>hello from about</div>;
};

export default observer(AboutContainer);
