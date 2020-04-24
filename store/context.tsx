import { createContext, Dispatch, useContext, useReducer } from 'react';
import Store, { reducer, Actions } from './store';

interface Context {
  store: typeof Store;
  dispatch: Dispatch<Actions>;
}

const storeContext = createContext<Context | null>(null);

const useStores = () => useContext(storeContext);

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, Store);
  return (
    <storeContext.Provider
      value={{
        store,
        dispatch,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export { StoreProvider };

export default useStores;
