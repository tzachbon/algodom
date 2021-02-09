import { observer, useLocalStore } from 'mobx-react';
import Card from '../components/Card';
import SearchIcon from '../components/SearchIcon';
import SortIcon from '../components/SortIcon';

const initialState = {
  cards: [
    {
      key: Math.random(),
      title: 'Sorting',
      Icon: SortIcon,
      description: 'See popular sorting algorithms',
      link: 'sort',
    },
    {
      key: Math.random(),
      title: 'Searching',
      description: 'Soon...',
      Icon: SearchIcon,
      link: 'search',
      disabled: true
    },
  ],
};

const Home: React.FC<{}> = () => {
  const state = useLocalStore(() => initialState);

  return (
    <div className='Home'>
      <h1>
        Welcome to <span>AlgoDOM</span>
      </h1>
      <p>
        <span>AlgoDOM</span> is an application that visualizes familiar
        algothemic techniques
      </p>
      <main>
        {state.cards.map((cardProps) => (
          <Card {...cardProps} />
        ))}
      </main>
    </div>
  );
};

export default observer(Home);
