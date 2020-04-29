export function shuffle(array: { value: number }[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex].value;
    array[currentIndex].value = array[randomIndex].value;
    array[randomIndex].value = temporaryValue;
  }

  return array;
}
