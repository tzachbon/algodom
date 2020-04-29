import { toJS } from 'mobx';
import { ISortElement } from '../../components/SortElement';

async function partition(
  arr: ISortElement[],
  swappedFn: (i: number, j: number) => Promise<any>,
  left: number,
  right: number
): Promise<number> {
  let middle = Math.floor((right + left) / 2),
    pivot = arr[middle].value,
    i = left, // Start pointer at the first item in the array
    j = right; // Start pointer at the last item in the array

  while (i <= j) {
    // Move left pointer to the right until the value at the
    // left is greater than the pivot value
    while (arr[i].value < pivot) {
      i++;
    }

    // Move right pointer to the left until the value at the
    // right is less than the pivot value
    while (arr[j].value > pivot) {
      j--;
    }

    // If the left pointer is less than or equal to the
    // right pointer, then swap values
    if (i <= j) {
      const temp = arr[i].value;
      arr[i].value = arr[j].value;
      arr[j].value = temp;
      await swappedFn(i, j);
      i++;
      j--;
    }
  }

  return i;
}

async function quickSort(
  arr: ISortElement[],
  swappedFn: (i: number, j: number) => Promise<any>,
  left = 0,
  right = arr.length - 1
) {
  let len = arr.length,
    index: number;

  if (len > 1) {
    index = await partition(arr, swappedFn, left, right);

    if (left < index - 1) {
      await quickSort(arr, swappedFn, left, index - 1);
    }

    if (index < right) {
      await quickSort(arr, swappedFn, index, right);
    }
  }

  return;
}

export default async function useQuickSort(
  array: ISortElement[],
  swappedFn: (i: number, j: number) => Promise<any>
) {
  array = toJS(array);
  await quickSort(array, swappedFn);

  return array;
}
