import { observer, useLocalStore } from 'mobx-react';
import useStores from '../store/context';
import Card from '../components/Card';

const initialState = {
  cards: [
    {
      key: Math.random(),
      title: 'Sorting',
      image: '',
      link: 'sort',
    },
    {
      key: Math.random(),
      title: 'Searching',
      image: '',
      link: 'search',
    },
  ],
};

const Home: React.FC<{}> = () => {
  const { store } = useStores();
  const state = useLocalStore(() => initialState);

  return (
    <div className='Home'>
      <h1>Welcome to AlgoDOM</h1>
      <main>
        {state.cards.map((cardProps) => (
          <Card {...cardProps} />
        ))}
      </main>
    </div>
  );
};

export default observer(Home);
