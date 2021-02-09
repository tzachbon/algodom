import { useIsMobile } from './use-device-type';

const MIN_ELEMENTS = 20;
const MAX_ELEMENTS_DESKTOP = 120;
const MAX_ELEMENTS_MOBILE = 50;


export function useTotalSortElement(): { min: number, max: number } {
  const isMobile = useIsMobile();

  const min = MIN_ELEMENTS;
  const max = isMobile ? MAX_ELEMENTS_MOBILE : MAX_ELEMENTS_DESKTOP;

  return {
    min, max
  }
}