import { toJS } from 'mobx';

export default async function useMergeSort(
  array: { value: number }[],
  swappedFn: (
    i: number,
    j: number,
    newArray: { value: number }[]
  ) => Promise<any>
) {
  array = toJS(array).map((element, originalIndex) => ({
    ...element,
    originalIndex,
  }));

  const newArray = await mergeHelper(array, swappedFn);

  return newArray;
}

const mergeHelper = async (
  array: { value: number }[],
  swappedFn: (
    i: number,
    j: number,
    newArray: { value: number }[]
  ) => Promise<any>
) => {
  if (array.length < 2) return array;

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return doMerge(
    await mergeHelper(left, swappedFn),
    await mergeHelper(right, swappedFn),
    swappedFn
  );
};

const doMerge = async (
  left: { value: number }[],
  right: { value: number }[],
  swappedFn: (
    i: number,
    j: number,
    newArray: { value: number }[]
  ) => Promise<any>
) => {
  let results = [];
  while (left.length && right.length) {
    results.push(left[0].value < right[0].value ? left.shift() : right.shift());
  }

  results = [...results, ...left, ...right];
  const onlyIndexes = results.map(({ originalIndex }) => originalIndex);

  await swappedFn(Math.min(...onlyIndexes), Math.max(...onlyIndexes), results);

  return results;
};
