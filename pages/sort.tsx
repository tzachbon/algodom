import Button from '@material-ui/core/Button';
import { observer, useLocalStore } from 'mobx-react';
import React, { useEffect } from 'react';
import SelectAlgorithm from '../components/SelectAlgorithm';
import SortSlider from '../components/SortSlider';
import ClassNames, { WithClassName } from '../utils/classnames';
import useBubbleSort from '../utils/sort/bubble-sort';
import { Sorts, testArray } from '../utils/sort/sort';
import createKey from '../utils/uuid';
import SortElement from './../components/SortElement';
import { sortsArray } from './../utils/sort/sort';
import useMergeSort from './../utils/sort/merge-sort';

interface ISortProps extends WithClassName {}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Sort: React.FunctionComponent<ISortProps> = ({ className }) => {
  className = ClassNames(className, 'Sort');
  const state = useLocalStore(() => ({
    elements: [],
    currentAlgorithm: 'bubble-sort',
    sorting: false,
  }));

  useEffect(() => {
    updateElements(Math.floor(Math.random() * 70));
  }, []);

  useEffect(() => {}, [state.currentAlgorithm]);

  const updateElements = (length: number) => {
    if (state.elements.length > length) {
      state.elements = state.elements.slice(0, length);
    } else if (state.elements.length < length) {
      const diff = Math.abs(length - state.elements.length);
      const newArray = Array(diff)
        .fill(null)
        .map(() => ({
          value: Math.floor(Math.random() * length) + 1,
          key: createKey(),
        }));

      state.elements = [...state.elements, ...newArray];
    }
  };

  const onSort = async () => {
    state.sorting = true;
    switch (state.currentAlgorithm as Sorts) {
      case 'merge-sort':
        await useMergeSort(state.elements, async (i, j, newArray) => {
          if (!state.sorting) return;
          const elements = state.elements.slice(i, j + 1);
          let k = 0;
          for (const element of elements) {
            element.current = true;
            await delay(0);
            element.value = newArray[k++].value;
            await delay(0);
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
          await delay(0);
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
  };

  const cancelSort = () => (state.sorting = false);

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
          variant='outlined'
          disabled={!state.currentAlgorithm}
          color={state.sorting ? 'secondary' : 'primary'}
        >
          {state.sorting ? 'Pause' : 'Start!'}
        </Button>
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
