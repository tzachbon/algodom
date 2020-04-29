import { SortState } from '../../pages/sort';
import useBubbleSort from './bubble-sort';
import useMergeSort from './merge-sort';
import useQuickSort from './quick-sort';
import useHeapSort from './heap-sort';

const sortFunctions = {
  'bubble-sort': useBubbleSort,
  'merge-sort': useMergeSort,
  'quick-sort': useQuickSort,
  'heap-sort': useHeapSort,
};

export type Sorts = keyof typeof sortFunctions;

const sortsArray: Sorts[] = Object.keys(sortFunctions) as Sorts[];

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

export {
  useBubbleSort,
  useQuickSort,
  useMergeSort,
  useHeapSort,
  sortsArray,
  testArray,
  sortFunctions,
};

export default async function useSort(state: SortState, delayFn) {
  state.sorting = true;
  switch (state.currentAlgorithm as Sorts) {
    case 'merge-sort':
      await useMergeSort(state.elements, async (i, j, newArray) => {
        if (!state.sorting) return;
        const elements = state.elements.slice(i, j + 1);
        let k = 0;
        for (const element of elements) {
          element.current = true;
          await delayFn();
          element.value = newArray[k++].value;
          await delayFn(false);
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
        await delayFn();
        array[i].value = array[j].value;
        array[j].value = temp;
        array[i].current = false;
        array[j].current = false;
      });
      break;

    case 'quick-sort':
      await useQuickSort(state.elements, async (i: number, j: number) => {
        if (!state.sorting || i === j) return;
        const array = state.elements;
        const temp = array[i].value;
        array[i].current = true;
        array[j].current = true;
        await delayFn();
        array[i].value = array[j].value;
        array[j].value = temp;
        array[i].current = false;
        array[j].current = false;
      });

      break;

    case 'heap-sort':
      await useHeapSort(state.elements, async (i: number, j: number) => {
        if (!state.sorting || i === j) return;
        const array = state.elements;
        const temp = array[i].value;
        array[i].current = true;
        array[j].current = true;
        await delayFn();
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
}
