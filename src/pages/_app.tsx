import 'mobx-react-lite/batchingForReactDom';
import './../assets/scss/styles.scss';
import { AppProps } from 'next/app';
import { StoreProvider } from '../store/context';
import { observer } from 'mobx-react';
import Theme from '../utils/theme';
import Container from '../components/Container';
import Head from 'next/head';

export interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <Theme>
        <Container>
          <Head>
            <title>AlgoDOM</title>
          </Head>
          <Component {...pageProps} />
        </Container>
      </Theme>
    </StoreProvider>
  );
};

export default observer(App);
