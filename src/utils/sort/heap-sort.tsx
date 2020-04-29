import { ISortElement } from '../../components/SortElement';
import { toJS } from 'mobx';

export default async function useHeapSort(
  array: ISortElement[],
  swappedFn: (i: number, j: number) => Promise<any>
) {
  array = toJS(array);

  await heapSort(array, swappedFn);

  return array;
}

async function maxHeap(array, i, arrLength, swappedFn) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let max = i;

  if (left < arrLength && array[left].value > array[max].value) {
    max = left;
  }

  if (right < arrLength && array[right].value > array[max].value) {
    max = right;
  }

  if (max != i) {
    await swap(array, i, max, swappedFn);
    await maxHeap(array, max, arrLength, swappedFn);
  }
}

async function swap(array, indexA, indexB, swappedFn) {
  await swappedFn(indexA, indexB);

  const temp = array[indexA].value;
  array[indexA].value = array[indexB].value;
  array[indexB].value = temp;
}

async function heapSort(array, swappedFn) {
  let arrLength = array.length;

  for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
    await maxHeap(array, i, arrLength, swappedFn);
  }

  for (let i = array.length - 1; i > 0; i--) {
    await swap(array, 0, i, swappedFn);
    arrLength--;

    await maxHeap(array, 0, arrLength, swappedFn);
  }
  return;
}
