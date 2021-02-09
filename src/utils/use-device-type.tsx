import useStores from '../store/context';

export function useDeviceType() {
  const { store: { deviceType } } = useStores();

  return deviceType;
}

export function useIsMobile() {
  const deviceType = useDeviceType();

  return deviceType === 'mobile';
}