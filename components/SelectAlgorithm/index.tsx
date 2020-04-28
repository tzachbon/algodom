import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import ClassNames, { WithClassName } from '../../utils/classnames';
import './style.scss';
import { Sorts } from '../../utils/sort/sort';
import { startCase } from 'lodash';

interface ISelectAlgorithmProps extends WithClassName {
  disabled?: boolean;
  algorithms: Sorts[];
  updateAlgo?: (algo: Sorts) => any;
  defaultValue?: Sorts;
}

const SelectAlgorithm: React.FunctionComponent<ISelectAlgorithmProps> = ({
  className,
  disabled,
  algorithms,
  updateAlgo,
  defaultValue = null,
}) => {
  className = ClassNames(className, 'SelectAlgorithm');
  const label = 'Select Algorithm';
  const [selected, setSelected] = useState<Sorts>(defaultValue);

  useEffect(() => {
    updateAlgo && updateAlgo(selected);
  }, [selected]);

  return (
    <FormControl disabled={disabled} variant='outlined' className={className}>
      <InputLabel>{label}</InputLabel>
      <Select
        color='primary'
        onChange={({ target: { value } }) => setSelected(value as Sorts)}
        value={selected}
        variant='outlined'
        label={label}
      >
        {algorithms.map((algoName, i) => (
          <MenuItem key={`${algoName}__${i}`} value={algoName}>
            {startCase(algoName)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default observer(SelectAlgorithm);
