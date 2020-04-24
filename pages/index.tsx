import Head from 'next/head';
import { useEffect } from 'react';
import useStores from '../store/context';

const Home: React.FC<{}> = () => {
  const { store, dispatch } = useStores();

  useEffect(() => {
    console.log(store.count);
  }, [store.count]);

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>{store.count}</main>
      <button onClick={() => dispatch('inc')}>update</button>
    </div>
  );
};

export default Home;
