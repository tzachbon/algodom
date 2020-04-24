import { AppProps } from 'next/app';
import { StoreProvider } from './../store/context';

export interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;
