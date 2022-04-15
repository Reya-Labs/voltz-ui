import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
import { IconLabel, ToggleButtonGroup } from '@components/composite';

export type MarginControlsProps = {
  defaultAddMargin?: boolean;
  addMargin?: boolean;
  onAddOrRemoveMargin: (value: boolean) => void;
};

const MarginControls: React.FunctionComponent<MarginControlsProps> = ({
  defaultAddMargin,
  addMargin,
  onAddOrRemoveMargin,
}) => {
  useEffect(() => {
    if (isUndefined(addMarginValue)) {
      onAddOrRemoveMargin(false);
    }
  }, []);

  
  const addMarginValue = isUndefined(addMargin)
    ? defaultAddMargin
    : addMargin;

  const titles = {
    ADD: 'add',
    REMOVE: 'remove',
  };

  const handleChangeAddMargin = (option: string) => {
    onAddOrRemoveMargin(option === titles.ADD);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: (theme) => theme.spacing(4),
        '& > *:REMOVEt(:last-child)': { marginBottom: (theme) => theme.spacing(4) },
      }}
    >

            
      <ToggleButtonGroup
        label={
          <IconLabel label="Add or Remove Margin" icon="information-circle" info="" removeIcon />
        }
        options={Object.values(titles)}
        option={
          addMarginValue
            ? titles.ADD
            : titles.REMOVE
        }
        defaultOption={titles.ADD}
        onChangeOption={handleChangeAddMargin}
        // agent={agent}
      />

    </Box>
  );
};

export default MarginControls;