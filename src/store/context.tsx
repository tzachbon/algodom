import { useLocalStore } from 'mobx-react';
import { createContext, useContext, FC } from 'react';
import store from './store';

const storeContext = createContext<null | { store: typeof store }>({ store });

const useStores = () => useContext(storeContext);

const StoreProvider: FC<{}> = ({ children }) => {
  const state = useLocalStore(() => ({ store }));

  return (
    <storeContext.Provider value={state}>{children}</storeContext.Provider>
  );
};

export { StoreProvider };

export default useStores;
