import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react';
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useCallback,
} from 'react';
import ClassNames, { WithClassName } from '../../utils/classnames';
import Slider from '@material-ui/core/Slider';
// import './style.scss';
import TestSortsDialog from '../TestSortsDialog';
import { ISortElement } from '../SortElement';

interface ISortMenuProps extends WithClassName {
  array: ISortElement[];
  onReset: () => void;
  speed: 0 | 1 | 2;
  onSpeedChanged: (speed: 0 | 1 | 2) => void;
}

const marks = [
  { value: 0, label: 'x0' },
  { value: 1, label: 'x1' },
  { value: 2, label: 'x2' },
];

const SortMenu = forwardRef(
  (
    { onReset, speed, onSpeedChanged, array, className }: ISortMenuProps,
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [testSortingOpen, setTestSortingOpen] = useState(false);
    className = ClassNames(className, 'SortMenu');
    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }, []);

    useImperativeHandle(ref, () => ({
      handleClick,
    }));

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    return (
      <>
        <Menu
          className={className}
          id='fade-menu'
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={onReset}>Reset</MenuItem>
          <MenuItem>
            <span>Speed</span>
            <Slider
              step={1}
              value={speed}
              valueLabelFormat={(value) => value.toString()}
              onChange={(e, value) => onSpeedChanged(value as 0 | 1 | 2)}
              marks={marks}
              min={0}
              max={2}
            />
          </MenuItem>
          <MenuItem onClick={() => setTestSortingOpen(true)}>
            Test Sorting Algorithm
          </MenuItem>
        </Menu>
        <TestSortsDialog
          array={array}
          open={testSortingOpen}
          updateOpen={(state) => setTestSortingOpen(state)}
        />
      </>
    );
  }
);

export default observer(SortMenu);
