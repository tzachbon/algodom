import useBubbleSort from './bubble-sort';
import { ValuesType } from 'utility-types';

const SORTS = {
  bubbleSort: 'bubble-sort',
  mergeSort: 'merge-sort',
};

export type Sorts = ValuesType<typeof SORTS>;

const sortsArray: Sorts[] = Object.values(SORTS);

const testArray = async (testFn: (array: any[]) => any): Promise<boolean> => {
  const length = 1000;
  const array = new Array(length)
    .fill(null)
    .map(() => ({ value: Math.floor(Math.random() * length) + 1 }));

  const sorted = array.slice().sort(({ value: a }, { value: b }) => a - b);
  const tested = await testFn(array);
  console.log('sorted', sorted.length);
  console.log('tested', tested.length);

  console.log(sorted, tested);

  return JSON.stringify(sorted) === JSON.stringify(tested);
};

export { useBubbleSort, sortsArray, testArray };
