import Button from '@material-ui/core/Button';
import { observer, useLocalStore } from 'mobx-react';
import React, { useEffect, useRef, useCallback } from 'react';
import SelectAlgorithm from '../components/SelectAlgorithm';
import SortMenu from '../components/SortMenu';
import SortSlider from '../components/SortSlider';
import ClassNames, { WithClassName } from '../utils/classnames';
import useBubbleSort from '../utils/sort/bubble-sort';
import { Sorts } from '../utils/sort/sort';
import createKey from '../utils/uuid';
import SortElement from './../components/SortElement';
import useMergeSort from './../utils/sort/merge-sort';
import { sortsArray } from './../utils/sort/sort';
import randomInRange from '../utils/randomInRange';
import { shuffle } from '../utils/shuffle';

interface ISortProps extends WithClassName {}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const MAX_SORT_ELEMENTS = 85;

const Sort: React.FunctionComponent<ISortProps> = ({ className }) => {
  className = ClassNames(className, 'Sort');

  const state = useLocalStore(() => ({
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

  const onSort = useCallback(async () => {
    state.sorting = true;
    switch (state.currentAlgorithm as Sorts) {
      case 'merge-sort':
        await useMergeSort(state.elements, async (i, j, newArray) => {
          if (!state.sorting) return;
          const elements = state.elements.slice(i, j + 1);
          let k = 0;
          for (const element of elements) {
            element.current = true;
            await delayBySpeed();
            element.value = newArray[k++].value;
            await delayBySpeed(false);
            element.current = false;
          }
        });

        break;

      case 'bubble-sort':
        await useBubbleSort(state.elements, async (i: number, j: number) => {
          if (!state.sorting || i === j) return;
          const array = state.elements;
          const temp = array[i].value;
          array[i].current = true;
          array[j].current = true;
          await delayBySpeed();
          array[i].value = array[j].value;
          array[j].value = temp;
          array[i].current = false;
          array[j].current = false;
        });
        break;

      default:
        break;
    }

    state.sorting = false;
  }, [
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
