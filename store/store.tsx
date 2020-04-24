import { Reducer } from 'react';

const Store = {
  count: 0,
};

const reducer: Reducer<typeof Store, Actions> = (store, action) => {
  store = { ...store };
  switch (action) {
    case 'inc':
      store.count++;
      break;
    case 'dec':
      store.count--;
      break;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }

  return store;
};

type Actions = 'inc' | 'dec';

export { reducer };
export type { Actions };

export default Store;
