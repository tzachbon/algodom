import Button from '@material-ui/core/Button';
import { observer, useLocalStore } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';
import SelectAlgorithm from '../components/SelectAlgorithm';
import SortMenu from '../components/SortMenu';
import SortSlider from '../components/SortSlider';
import ClassNames, { WithClassName } from '../utils/classnames';
import randomInRange from '../utils/randomInRange';
import { shuffle } from '../utils/shuffle';
import useSort, { Sorts } from '../utils/sort/sort';
import createKey from '../utils/uuid';
import SortElement, { ISortElement } from './../components/SortElement';
import { sortsArray } from './../utils/sort/sort';

interface ISortProps extends WithClassName {}

export interface SortState {
  elements: ISortElement[];
  speed: 0 | 1 | 2;
  currentAlgorithm: Sorts;
  sorting: boolean;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const MAX_SORT_ELEMENTS = 85;

const Sort: React.FunctionComponent<ISortProps> = ({ className }) => {
  className = ClassNames(className, 'Sort');

  const state = useLocalStore<SortState>(() => ({
    elements: [],
    speed: 1,
    currentAlgorithm: 'merge-sort',
    sorting: false,
  }));

  const sortMenuRef = useRef<{ handleClick: (event: any) => any }>(null);

  useEffect(() => {
    onReset();
  }, []);

  const delayBySpeed = useCallback(
    async (first = true) => {
      switch (state.speed) {
        case 0:
          await delay(35);
          break;
        case 1:
          first && (await delay(20));
          break;
        default:
          first && (await delay(0));
          break;
      }
    },
    [state.speed]
  );

  const updateElements = useCallback(
    (length: number) => {
      if (state.elements.length > length) {
        state.elements = state.elements.slice(0, length);
      } else if (state.elements.length < length) {
        const diff = Math.abs(length - state.elements.length);
        const newArray = Array(diff)
          .fill(null)
          .map(() => ({
            value: Math.min(
              Math.floor(Math.random() * length) + 1,
              MAX_SORT_ELEMENTS
            ),
            key: createKey(),
          }));

        state.elements = [...state.elements, ...newArray];
      }
    },
    [state.elements]
  );

  const onSort = useCallback(async () => await useSort(state, delayBySpeed), [
    state,
    state.speed,
    state.currentAlgorithm,
    state.elements,
    state.sorting,
  ]);

  const cancelSort = useCallback(() => (state.sorting = false), [
    state.sorting,
  ]);

  const onReset = useCallback(() => {
    cancelSort();
    if (state.elements.length) {
      shuffle(state.elements);
    } else {
      updateElements(randomInRange(20, MAX_SORT_ELEMENTS));
    }
  }, [state.elements]);

  return (
    <div className={className}>
      <div className='titles'>
        <h1>Sorting Algorithm</h1>
        <p>Please select array size and choose algorithm</p>
      </div>
      <div className='controls'>
        <SortSlider
          disabled={state.sorting}
          value={state.elements.length}
          updateElements={updateElements}
        />
        <SelectAlgorithm
          defaultValue={state.currentAlgorithm}
          updateAlgo={(algo) => (state.currentAlgorithm = algo)}
          algorithms={sortsArray}
          disabled={state.sorting}
        />
        <Button
          onClick={state.sorting ? cancelSort : onSort}
          variant='contained'
          disabled={!state.currentAlgorithm}
          color={state.sorting ? 'default' : 'primary'}
        >
          {state.sorting ? 'Pause' : 'Start!'}
        </Button>
        <Button
          onClick={sortMenuRef?.current?.handleClick}
          variant='outlined'
          color='default'
        >
          Settings
        </Button>
        <SortMenu
          array={state.elements}
          onSpeedChanged={(speed) => (state.speed = speed)}
          speed={state.speed}
          onReset={onReset}
          ref={sortMenuRef}
        />
      </div>
      <div className='elements'>
        {state.elements.map((element) => (
          <SortElement {...element} />
        ))}
      </div>
    </div>
  );
};

export default observer(Sort);
