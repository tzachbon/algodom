import * as React from 'react';
import { observer } from 'mobx-react';
import ClassNames, { WithClassName } from '../../utils/classnames';
import Slider from '@material-ui/core/Slider';
import { useIsMobile } from '../../utils/use-device-type';
import { useTotalSortElement } from '../../utils/use-total-sort-elements';


interface ISortSliderProps extends WithClassName {
  value: number;
  updateElements: (length: number) => void;
  disabled?: boolean;
}

const SortSlider: React.FunctionComponent<ISortSliderProps> = ({
  className,
  value,
  updateElements,
  disabled,
}) => {
  className = ClassNames(className, 'SortSlider');
  const { max } = useTotalSortElement();
  return (
    <Slider
      className={className}
      disabled={disabled}
      step={1}
      min={2}
      valueLabelDisplay='auto'
      getAriaValueText={(value) => value.toString()}
      max={max}
      value={value}
      onChange={(e, value) => updateElements(value as number)}
    />
  );
};

export default observer(SortSlider);
