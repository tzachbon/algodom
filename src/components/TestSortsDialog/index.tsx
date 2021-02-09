import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import ClassNames, { WithClassName } from '../../utils/classnames';
import { sortFunctions, Sorts } from '../../utils/sort/sort';
import { ISortElement } from '../SortElement';
import { startCase } from 'lodash';

interface ITestSortsDialogProps extends WithClassName {
  open: boolean;
  array: ISortElement[];
  updateOpen: (state: boolean) => any;
}

const TestSortsDialog: React.FunctionComponent<ITestSortsDialogProps> = ({
  className,
  open,
  array,
  updateOpen,
}) => {
  const [sortEntries, setSortEntries] = useState([]);
  const cloneArray = useMemo(() => toJS(array), [array]);
  const handleClose = () => updateOpen(false);

  useEffect(() => {
    open && calculateSpeed();
  }, [open]);

  const calculateSpeed = async () => {
    const entries = [];
    for (const [name, fn] of Object.entries(sortFunctions)) {
      const now = performance.now();
      await fn(cloneArray, () => Promise.resolve());
      entries.push([name, performance.now() - now]);
    }

    setSortEntries(entries);
  };

  return (
    <div className={ClassNames(className, 'TestSortsDialog')}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Test Sorting Speed</DialogTitle>
        <DialogContent className='TestSortsDialog__DialogContent'>
          {sortEntries.map(([name, value]: [Sorts, number], i) => (
            <div key={`${name}__${i}__test-sort-dialog`}>
              <span className='name'>{startCase(name)}</span>
              <span className='value'>{value.toFixed(3)}</span>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button
            onClick={calculateSpeed}
            color='primary'
            variant='outlined'
            autoFocus
          >
            Run test
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default observer(TestSortsDialog);
