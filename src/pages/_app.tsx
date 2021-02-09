import 'mobx-react-lite/batchingForReactDom';
import './../assets/scss/styles.scss';
import { AppProps } from 'next/app';
import { StoreProvider } from '../store/context';
import { observer } from 'mobx-react';
import Theme from '../utils/theme';
import Container from '../components/Container';
import Head from 'next/head';

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

async function getInitialProps({ ctx }) {
  const UA = ctx.req?.headers['user-agent'];
  const isMobile = Boolean(UA?.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ))

  return {
    deviceType: isMobile ? 'mobile' : 'desktop'
  }
}

export interface Props extends AppProps, ThenArg<ReturnType<typeof getInitialProps>> { }

const App: React.FC<Props> = ({ Component, pageProps, deviceType }) => {
  return (
    <StoreProvider initialValues={{ deviceType }}>
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

(App as any).getInitialProps = getInitialProps;


export default observer(App);
