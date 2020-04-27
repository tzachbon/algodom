import { AppProps } from 'next/app';
import { StoreProvider } from './../store/context';
import { observer } from 'mobx-react';
import Theme from '../utils/theme';
import './../assets/scss/styles.scss';
import Container from '../components/Container';
import 'mobx-react-lite/batchingForReactDom';

export interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <Theme>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Theme>
    </StoreProvider>
  );
};

export default observer(App);