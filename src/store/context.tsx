import { useLocalStore } from 'mobx-react';
import { createContext, useContext, FC } from 'react';
import store from './store';

const storeContext = createContext<null | { store: Record<string, any> & typeof store }>({ store });

const useStores = () => useContext(storeContext);

const StoreProvider: FC<{ initialValues: any }> = ({ initialValues = {}, children }) => {
  const state = useLocalStore(() => ({ store: { ...store, ...initialValues } }));

  return (
    <storeContext.Provider value={state}>{children}</storeContext.Provider>
  );
};

export { StoreProvider };

export default useStores;
