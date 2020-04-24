import { useLocalStore } from 'mobx-react';
import { createContext, useContext } from 'react';
import store from './../store/store';

const storeContext = createContext<null | { store: typeof store }>({ store });

const useStores = () => useContext(storeContext);

const StoreProvider = ({ children }) => {
  const state = useLocalStore(() => ({ store }));

  return (
    <storeContext.Provider value={state}>{children}</storeContext.Provider>
  );
};

export { StoreProvider };

export default useStores;
