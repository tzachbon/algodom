import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { observer } from 'mobx-react';
import * as React from 'react';
import ClassNames, { WithClassName } from '../../utils/classnames';
import './style.scss';

interface ISelectAlgorithmProps extends WithClassName {
  disabled?: boolean;
}

const SelectAlgorithm: React.FunctionComponent<ISelectAlgorithmProps> = ({
  className,
  disabled,
}) => {
  className = ClassNames(className, 'SelectAlgorithm');
  const label = 'Select Algorithm';
  return (
    <FormControl disabled={disabled} variant='outlined' className={className}>
      <InputLabel>{label}</InputLabel>
      <Select color='primary' variant='outlined' label={label}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default observer(SelectAlgorithm);
