import { toJS } from 'mobx';

export default async function useBubbleSort(
  array: { value: number }[],
  swappedFn: (i: number, j: number) => any
) {
  array = toJS(array);

  let length = array.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j]?.value > array[j + 1]?.value) {
        let tmp = array[j].value;
        array[j].value = array[j + 1].value;
        array[j + 1].value = tmp;

        await swappedFn(j, j + 1);
      }
    }
  }

  return array;
}
